<?php

namespace App\Http\Controllers;

use App\Models\teams;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    // GET /api/teams
    public function index()
    {
        return response()->json(teams::all(), 200);
    }

    // POST /api/teams
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'owner_id' => 'required|exists:users,id'
        ]);

        $team = teams::create($request->all());

        return response()->json([
            'message' => 'Team created successfully',
            'data' => $team
        ], 201);
    }

    // GET /api/teams/{id}
    public function show($id)
    {
        $team = teams::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        return response()->json($team, 200);
    }

    // PUT /api/teams/{id}
    public function update(Request $request, $id)
    {
        $team = teams::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $team->update($request->all());

        return response()->json([
            'message' => 'Team updated successfully',
            'data' => $team
        ], 200);
    }

    // DELETE /api/teams/{id}
    public function destroy($id)
    {
        $team = teams::find($id);

        if (!$team) {
            return response()->json(['message' => 'Team not found'], 404);
        }

        $team->delete();

        return response()->json(['message' => 'Team deleted successfully'], 200);
    }
}
