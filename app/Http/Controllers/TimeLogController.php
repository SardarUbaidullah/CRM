<?php

namespace App\Http\Controllers;

use App\Models\time_logs;
use Illuminate\Http\Request;

class TimeLogController extends Controller
{
    public function index()
    {
        return response()->json(time_logs::with(['task', 'user'])->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'task_id' => 'required|exists:tasks,id',
            'user_id' => 'required|exists:users,id',
            'hours' => 'required|numeric',
            'log_date' => 'required|date',
        ]);

        $timeLog = time_logs::create($request->all());

        return response()->json([
            'message' => 'Time log created successfully',
            'data' => $timeLog
        ], 201);
    }

    public function show($id)
    {
        $timeLog = time_logs::with(['task', 'user'])->findOrFail($id);
        return response()->json($timeLog);
    }

    public function update(Request $request, $id)
    {
        $timeLog = time_logs::findOrFail($id);

        $request->validate([
            'task_id' => 'exists:tasks,id',
            'user_id' => 'exists:users,id',
            'hours' => 'numeric',
            'log_date' => 'date',
        ]);

        $timeLog->update($request->all());

        return response()->json([
            'message' => 'Time log updated successfully',
            'data' => $timeLog
        ]);
    }

    public function destroy($id)
    {
        $timeLog = time_logs::findOrFail($id);
        $timeLog->delete();

        return response()->json(['message' => 'Time log deleted successfully']);
    }
}
