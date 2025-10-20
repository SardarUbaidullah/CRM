<?php

namespace App\Http\Controllers;
use App\Models\milestones;
use App\Models\projects;
use Illuminate\Http\Request;

class MilestoneController extends Controller
{
      public function index(Request $request)
    {
        if ($request->has('project_id')) {
            $milestones = milestones::where('project_id', $request->project_id)->get();
        } else {
            $milestones = milestones::all();
        }
        return response()->json($milestones);
    }
    public function store(Request $request)
    {
        $request->validate([
            'project_id' => 'required|exists:projects,id',
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
            'status' => 'in:pending,in-progress,completed'
        ]);

        $milestone = milestones::create($request->all());

        return response()->json([
            'message' => 'Milestone created successfully!',
            'data' => $milestone
        ], 201);
    }

    public function show($id)
    {
        $milestone = milestones::findOrFail($id);
        return response()->json($milestone);
    }

    public function update(Request $request, $id)
    {
        $milestone = milestones::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:255',
            'due_date' => 'nullable|date',
            'status' => 'in:pending,in-progress,completed'
        ]);

        $milestone->update($request->all());

        return response()->json([
            'message' => 'Milestone updated successfully!',
            'data' => $milestone
        ]);
    }

    public function destroy($id)
    {
        $milestone = milestones::findOrFail($id);
        $milestone->delete();

        return response()->json(['message' => 'Milestone deleted successfully!']);
    }
}
