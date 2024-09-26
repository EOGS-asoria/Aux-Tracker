<?php

use App\Http\Controllers\SubTimeInController;
use App\Http\Controllers\TimeInController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AgentController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\PositionController;
use App\Http\Controllers\AccountController;
use App\Http\Controllers\TeamLeaderController;
use App\Http\Controllers\AccountManagerController;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/* 
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::resource('time_in', TimeInController::class);
Route::resource('sub_time_in', SubTimeInController::class);


// adding back end codes in the users, site, positions, account, Team Leader, Accounts Manager

Route::apiResource('agents', AgentController::class);
Route::apiResource('sites', SiteController::class);
Route::apiResource('positions', PositionController::class);
Route::apiResource('accounts', AccountController::class);
Route::apiResource('team-leaders', TeamLeaderController::class);
Route::apiResource('account-managers', AccountManagerController::class);
