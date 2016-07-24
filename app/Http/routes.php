<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::get('/', function () {
    return view('index');
});
Route::get('/users/{id?}', 'UserController@getUserbyId');
Route::post('/users', 'UserController@add');
Route::post('/users/{id}', 'UserController@update');
Route::delete('/users/{id}', 'UserController@destroy');
Route::post('/login', 'UserController@login');