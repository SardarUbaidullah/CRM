<?php

namespace App\Http\Controllers;

use App\Models\tasks;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TaskController extends Controller
{
    // GET /api/tasks
    public function index()
    {
        $tasks = tasks::with(['project','assignee','creator'])->get();

        return response()->json([
            'status' => 'success',
            'data' => $tasks
        ], 200);
    }

    // POST /api/tasks
    public function store(Request $request)
    {
        $data = $request->validate([
            'project_id'  => ['required','exists:projects,id'],
            'assigned_to' => ['nullable','exists:users,id'],
            'created_by'  => ['nullable','exists:users,id'],
            'title'       => ['required','string','max:255'],
            'description' => ['nullable','string'],
            'priority'    => ['nullable', Rule::in(['low','medium','high'])],
            'status'      => ['nullable', Rule::in(['todo','in_progress','done'])],
            'start_date'  => ['nullable','date'],
            'due_date'    => ['nullable','date'],
        ]);

        $task = tasks::create($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Task created',
            'data' => $task
        ], 201);
    }

    // GET /api/tasks/{id}
    public function show($id)
    {
        $task = tasks::with(['project','assignee','creator'])->find($id);

        if (! $task) {
            return response()->json(['status'=>'error','message'=>'Task not found'], 404);
        }

        return response()->json(['status'=>'success','data'=>$task], 200);
    }

    // PUT /api/tasks/{id}
    public function update(Request $request, $id)
    {
        $task = tasks::find($id);

        if (! $task) {
            return response()->json(['status'=>'error','message'=>'Task not found'], 404);
        }

        $data = $request->validate([
            'project_id'  => ['sometimes','required','exists:projects,id'],
            'assigned_to' => ['sometimes','nullable','exists:users,id'],
            'created_by'  => ['sometimes','nullable','exists:users,id'],
            'title'       => ['sometimes','required','string','max:255'],
            'description' => ['sometimes','nullable','string'],
            'priority'    => ['sometimes','nullable', Rule::in(['low','medium','high'])],
            'status'      => ['sometimes','nullable', Rule::in(['todo','in_progress','done'])],
            'start_date'  => ['sometimes','nullable','date'],
            'due_date'    => ['sometimes','nullable','date'],
        ]);

        $task->update($data);

        return response()->json([
            'status' => 'success',
            'message' => 'Task updated',
            'data' => $task
        ], 200);
    }

    // DELETE /api/tasks/{id}
    public function destroy($id)
    {
        $task = tasks::find($id);

        if (! $task) {
            return response()->json(['status'=>'error','message'=>'Task not found'], 404);
        }

        $task->delete(); // soft delete
        return response()->json(['status'=>'success','message'=>'Task deleted'], 200);
    }
}
