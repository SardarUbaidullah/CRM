<?php

namespace App\Http\Controllers;

use App\Models\Projects;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    // GET /api/Projects
    public function index()
    {
        $Projects = Projects::all();
        return response()->json([
            'status' => 'success',
            'data' => $Projects
        ], 200);
    }

    // POST /api/Projects
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
        ]);

        $project = Projects::create([
            'team_id' => $request->team_id,
            'name' => $request->name,
            'description' => $request->description,
            'start_date' => $request->start_date,
            'due_date' => $request->due_date,
            'status' => $request->status ?? 'pending',
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Project created successfully',
            'data' => $project
        ], 201);
    }

    // GET /api/Projects/{id}
    public function show($id)
    {
        $project = Projects::find($id);

        if (!$project) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found'
            ], 404);
        }

        return response()->json([
            'status' => 'success',
            'data' => $project
        ], 200);
    }

    // PUT /api/Projects/{id}
    public function update(Request $request, $id)
    {
        $project = Projects::find($id);

        if (!$project) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found'
            ], 404);
        }

        $project->update([
            'team_id' => $request->team_id,
            'name' => $request->name ?? $project->name,
            'description' => $request->description ?? $project->description,
            'start_date' => $request->start_date ?? $project->start_date,
            'due_date' => $request->due_date ?? $project->due_date,
            'status' => $request->status ?? $project->status,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Project updated successfully',
            'data' => $project
        ], 200);
    }

    // DELETE /api/Projects/{id}
    public function destroy($id)
    {
        $project = Projects::find($id);

        if (!$project) {
            return response()->json([
                'status' => 'error',
                'message' => 'Project not found'
            ], 404);
        }

        $project->delete();

        return response()->json([
            'status' => 'success',
            'message' => 'Project deleted successfully'
        ], 200);
    }
}
