<?php

namespace App\Http\Controllers;
use App\Models\task_subtasks;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class SubTaskController extends Controller
{
    public function index()
    {
        return response()->json(task_subtasks::all(), 200);
    }

    // POST /api/subtask
    public function store(Request $request)
    {
        $request->validate([
            'task_id' => 'required|exists:users,id',
            'title'   => 'required|string|max:255',
            'status'  => ['nullable', Rule::in(['todo','in_progress','done'])],
        ]);

        $subtaks = task_subtasks::create($request->all());

        return response()->json([
            'message' => 'SubTaks created successfully',
            'data' => $subtaks
        ], 201);
    }

    // GET /api/subtask/{id}
    public function show($id)
    {
        $subtaks = task_subtasks::find($id);

        if (!$subtaks) {
            return response()->json(['message' => 'subtaks not found'], 404);
        }

        return response()->json($subtaks, 200);
    }

    // PUT /api/subtask/{id}
    public function update(Request $request, $id)
    {
        $subtaks = task_subtasks::find($id);

        if (!$subtaks) {
            return response()->json(['message' => 'subtaks not found'], 404);
        }

        $subtaks->update($request->all());

        return response()->json([
            'message' => 'subtaks updated successfully',
            'data' => $subtaks
        ], 200);
    }

    // DELETE /api/subtask/{id}
    public function destroy($id)
    {
        $subtaks = task_subtasks::find($id);

        if (!$subtaks) {
            return response()->json(['message' => 'subtaks not found'], 404);
        }

        $subtaks->delete();

        return response()->json(['message' => 'subtaks deleted successfully'], 200);
    }
}
