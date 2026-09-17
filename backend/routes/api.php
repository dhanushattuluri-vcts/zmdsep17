<?php

use App\Http\Controllers\ContactRequestController;
use Illuminate\Support\Facades\Route;

Route::post('/delibot/contact', ContactRequestController::class)
    ->name('contact.delibot')
    ->middleware('throttle:5,1');

Route::post('/camera/contact', ContactRequestController::class)
    ->name('contact.camera')
    ->middleware('throttle:5,1');
