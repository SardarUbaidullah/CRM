<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ProjectManager
{
    public function handle(Request $request, Closure $next): Response
    {
        // Allow guest to access login page
        if ($request->routeIs('login')) {
            return $next($request);
        }

        // Redirect guest to login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Only allow project managers
        if (Auth::user()->user_role != 1) {
            return redirect()->route('dashboard'); // safe page
        }

        return $next($request);
    }
}
