<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\files;
use App\Models\Projects;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\Rule;

class FileController extends Controller
{
    // GET /api/files
    public function index(Request $request)
    {
        $query = files::with(['project','task','user'])->latest();

        if ($request->filled('project_id')) {
            $query->where('project_id', $request->project_id);
        }
        if ($request->filled('task_id')) {
            $query->where('task_id', $request->task_id);
        }
        if ($request->filled('user_id')) {
            $query->where('user_id', $request->user_id);
        }

        $files = $query->get();

        return response()->json([
            'status' => 'success',
            'data' => $files
        ], 200);
    }

    // POST /api/files
    public function store(Request $request)
    {
        $validated = $request->validate([
            'project_id' => ['nullable','exists:projects,id'],
            'task_id'    => ['nullable','exists:tasks,id'],
            'user_id'    => ['required','exists:users,id'],
            'file_path'       => ['required','file','max:10240'],
            'file_name'  => ['nullable','string','max:255'],
            'version'    => ['nullable','integer','min:1'],
        ]);

        $uploaded = $request->file('file_path');
        $path = $uploaded->store('file_path', 'public');
        $fileName = $validated['file_name'] ?? $uploaded->getClientOriginalName();
        $version  = $validated['version'] ?? 1;

        $file = files::create([
            'project_id' => $validated['project_id'] ?? null,
            'task_id'    => $validated['task_id'] ?? null,
            'user_id'    => $validated['user_id'],
            'file_name'  => $fileName,
            'file_path'  => $path,
            'version'    => $version,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'File uploaded',
            'data' => $file->load(['project','task','user'])
        ], 201);
    }

    // GET /api/files/{id}
    public function show($id)
    {
        $file = files::with(['project','task','user'])->find($id);

        if (! $file) {
            return response()->json(['status'=>'error','message'=>'File not found'], 404);
        }

        return response()->json(['status'=>'success','data'=>$file], 200);
    }

    // PUT/PATCH /api/files/{id}
    public function update(Request $request, $id)
    {
        $file = files::find($id);
        if (! $file) {
            return response()->json(['status'=>'error','message'=>'File not found'], 404);
        }

        $validated = $request->validate([
            'project_id' => ['nullable','exists:projects,id'],
            'task_id'    => ['nullable','exists:tasks,id'],
            'user_id'    => ['nullable','exists:users,id'],
            'file'       => ['sometimes','file','max:10240'],
            'file_name'  => ['nullable','string','max:255'],
            'version'    => ['nullable','integer','min:1'],
        ]);

        if ($request->hasFile('file')) {
            if ($file->file_path && Storage::disk('public')->exists($file->file_path)) {
                Storage::disk('public')->delete($file->file_path);
            }
            $uploaded = $request->file('file');
            $path = $uploaded->store('files', 'public');
            $file->file_path = $path;

            if (! isset($validated['file_name'])) {
                $file->file_name = $uploaded->getClientOriginalName();
            }
        }

        if (isset($validated['project_id'])) $file->project_id = $validated['project_id'];
        if (isset($validated['task_id']))    $file->task_id = $validated['task_id'];
        if (isset($validated['user_id']))    $file->user_id = $validated['user_id'];
        if (isset($validated['file_name']))  $file->file_name = $validated['file_name'];
        if (isset($validated['version']))    $file->version = $validated['version'];

        $file->save();

        return response()->json([
            'status' => 'success',
            'message' => 'File updated',
            'data' => $file->load(['project','task','user'])
        ], 200);
    }

    // DELETE /api/files/{id}
    public function destroy($id)
    {
        $file = files::find($id);
        if (! $file) {
            return response()->json(['status'=>'error','message'=>'File not found'], 404);
        }

        if ($file->file_path && Storage::disk('public')->exists($file->file_path)) {
            Storage::disk('public')->delete($file->file_path);
        }

        $file->delete();

        return response()->json(['status'=>'success','message'=>'File deleted'], 200);
    }
}
