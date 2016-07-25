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
Route::post('/users', 'UserController@addNewUser');
Route::post('/users/{id}', 'UserController@updateUser');
// Route::delete('/users/{id}', 'UserController@removeUser');
Route::post('/login', 'UserController@login');