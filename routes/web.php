<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

// Route::get('/', function () {
//     return Inertia::render('Welcome', [
//         'canLogin' => Route::has('login'),
//         'canRegister' => Route::has('register'),
//         'laravelVersion' => Application::VERSION,
//         'phpVersion' => PHP_VERSION,
//     ]);
// }); 

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });



Route::get('/', function () {
    return Inertia::render('login/page');
});

Route::prefix('administrator')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });
    Route::get('/agent', function () {
        return Inertia::render('admin/agent/page');
    });
    Route::get('/time', function () {
        return Inertia::render('admin/time/page');
    });
    Route::get('/logs', function () {
        return Inertia::render('admin/logs/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('admin/profile/page');
    });
});



// agent

Route::prefix('agent')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('agent/dashboard/page');
    });
    Route::get('/time', function () {
        return Inertia::render('agent/time/page');
    });

    Route::get('/profile', function () {
        return Inertia::render('agent/profile/page');
    });
});


// Om&Am
Route::prefix('Operations-Manager')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Operations-Manager/dashboard/page');
    });
    Route::get('/agent', function () {
        return Inertia::render('Operations-Manager/agent/page');
    });
    Route::get('/time', function () {
        return Inertia::render('Operations-Manager/time/page');
    });
    Route::get('/logs', function () {
        return Inertia::render('Operations-Manager/logs/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('Operations-Manager/profile/page');
    });
    Route::get('/Team', function () {
        return Inertia::render('Operations-Manager/Team/page');
    });
    Route::get('/history', function () {
        return Inertia::render('Operations-Manager/history/page');
    });
});



require __DIR__ . '/auth.php';
// Route::get('/register', function () {
//     return Inertia::render('register/page'); // Match this with your actual file path
// });
