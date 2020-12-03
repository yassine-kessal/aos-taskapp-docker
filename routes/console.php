<?php

use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;

/*
|--------------------------------------------------------------------------
| Console Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of your Closure based console
| commands. Each Closure is bound to a command instance allowing a
| simple approach to interacting with each command's IO methods.
|
*/

Artisan::command('clear:all', function() {
    $this->call('cache:clear');
    $this->call('config:clear');
    $this->call('event:clear');
    $this->call('optimize:clear');
    $this->call('queue:clear');
    $this->call('route:clear');
    $this->call('view:clear');
    $this->call('clear-compiled');
})->describe('clear all caches');