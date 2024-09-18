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
    Route::get('/user', function () {
        return Inertia::render('admin/user/page');
    });

    Route::get('/site', function () {
        return Inertia::render('admin/site/page');
    });

    Route::get('/position', function () {
        return Inertia::render('admin/position/page');
    });

    Route::get('/account', function () {
        return Inertia::render('admin/account/page');
    });

    Route::get('/logs', function () {
        return Inertia::render('admin/logs/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('admin/profile/page');
    });



    // Route::get('/time', function () {
    //     return Inertia::render('admin/time/page');
    // });
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


// Om
Route::prefix('om')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('om/dashboard/page');
    });
    Route::get('/agent', function () {
        return Inertia::render('om/agent/page');
    });
    Route::get('/time', function () {
        return Inertia::render('om/time/page');
    });
    Route::get('/logs', function () {
        return Inertia::render('om/logs/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('om/profile/page');
    });
    Route::get('/team', function () {
        return Inertia::render('om/team/page');
    });
    Route::get('/history', function () {
        return Inertia::render('om/history/page');
    });
    Route::get('/account-manager', function () {
        return Inertia::render('om/account-manager/page');
    });
    Route::get('/add-agent', function () {
        return Inertia::render('om/add-agent/page');
    });
});

// Am
Route::prefix('am')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('am/dashboard/page');
    });
    Route::get('/agent', function () {
        return Inertia::render('am/agent/page');
    });
    Route::get('/time', function () {
        return Inertia::render('am/time/page');
    });
    Route::get('/logs', function () {
        return Inertia::render('am/logs/page');
    });
    Route::get('/profile', function () {
        return Inertia::render('am/profile/page');
    });
    Route::get('/team', function () {
        return Inertia::render('am/team/page');
    });
    Route::get('/history', function () {
        return Inertia::render('am/history/page');
    });
    Route::get('/add-agent', function () {
        return Inertia::render('am/add-agent/page');
    });
});



require __DIR__ . '/auth.php';
// Route::get('/register', function () {
//     return Inertia::render('register/page'); // Match this with your actual file path
// });
