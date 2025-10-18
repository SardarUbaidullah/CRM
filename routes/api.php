<?php
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TeamController;
use App\Http\Controllers\ProjectController;

Route::apiResource('projects', ProjectController::class);

Route::apiResource('teams', TeamController::class);
