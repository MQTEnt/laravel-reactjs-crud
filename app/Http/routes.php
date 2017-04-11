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

Route::get('/', function(){
	return view('example');
});

//Movie
Route::post('/movie',['as' => 'movie.store', 'uses' => 'MovieController@store']);
Route::get('/movie', ['as' => 'movie.index', 'uses' => 'MovieController@index']);
Route::put('/movie/{movie_id}', ['as' => 'movie.update', 'uses' => 'MovieController@update']);
Route::delete('/movie/{movie_id}', ['as' => 'movie.destroy', 'uses' => 'MovieController@destroy']);