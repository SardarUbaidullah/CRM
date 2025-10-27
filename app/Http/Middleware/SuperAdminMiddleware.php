<?php

namespace App\Http\Middleware;
use Illuminate\Support\Facades\Auth;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SuperAdminMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
          if ($request->routeIs('login')) {
            return $next($request);
        }

        // Redirect guest to login
        if (!Auth::check()) {
            return redirect()->route('login');
        }

        // Only allow project managers
        if (Auth::user()->user_role != 3) {
            return redirect()->route('dashboard'); // safe page
        }

        return $next($request);
    }

}
