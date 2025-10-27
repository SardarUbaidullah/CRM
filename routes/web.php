<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\FrontController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});



Route::get('/dashboard', function () {
    if (Auth::user()->user_role==3) {
         return Inertia::render('Dashboard');
    }
    else {
        return redirect()->back();
    }

})->middleware(['auth', 'verified'])->name('dashboard');




Route::middleware(['project_manager'])->group(function () {
   Route::get('/team-members', [FrontController::class, 'team'])->name('team.show');
});


Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
