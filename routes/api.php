<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;

Route::apiResource('projects', ProjectController::class);

Route::apiResource('teams', TeamController::class);

Route::apiResource('tasks', TaskController::class);
