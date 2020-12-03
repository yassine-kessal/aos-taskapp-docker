<?php

use App\Http\Controllers\SecurityController;
use App\Http\Controllers\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('/login', [SecurityController::class, "login"]);
Route::post('/register', [SecurityController::class, "register"]);
Route::middleware('auth:sanctum')->post('/logout', [SecurityController::class, "logout"]);

Route::middleware('auth:sanctum')->apiResource('/task', TaskController::class)->except([
    "show"
])->scoped([
    "task" => "_id"
]);

Route::middleware('auth:sanctum')->patch('/task/{task}/completed', [TaskController::class, "toggleCompleted"]);