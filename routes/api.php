<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\SubTaskController;
use App\Http\Controllers\MilestoneController;
use App\Http\Controllers\TimeLogController;
use App\Http\Controllers\FileController;
// Route::middleware('auth')->group(function () {

Route::apiResource('projects', ProjectController::class);
Route::apiResource('teams', TeamController::class);
Route::apiResource('tasks', TaskController::class);
Route::apiResource('subtasks', SubTaskController::class);


Route::apiResource('milestones', MilestoneController::class);

Route::apiResource('time-logs', TimeLogController::class);

Route::apiResource('files', FileController::class);
// });
