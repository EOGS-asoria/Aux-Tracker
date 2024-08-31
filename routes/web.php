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

// require __DIR__.'/auth.php';


Route::get('/', function () {
    return Inertia::render('login/page');
});

Route::prefix('administrator')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('admin/dashboard/page');
    });
    Route::get('/users', function () {
        return Inertia::render('admin/users/page');
    });
    Route::get('/time', function () {
        return Inertia::render('admin/time/page');
    });
    Route::get('/logs', function () {
        return Inertia::render('admin/logs/page');
    });
});

// Route::get('/register', function () {
//     return Inertia::render('register/page'); // Match this with your actual file path
// });


