<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;
use App\Movie;
class MovieController extends Controller
{
	public function store(Request $request){
		$movie = new Movie();
		$movie->title = $request->title;
		$movie->description = $request->description;
		$movie->image = $request->image;
		$movie->save();
		return $movie;
	}
	public function index(){
		$movies = Movie::all();
		return $movies;
	}
	public function update(Request $request, $id){
		$movie = Movie::findOrFail($id);
		$movie->title = $request->title;
		$movie->description = $request->description;
		$movie->image = $request->image;
		$movie->save();
		return $movie;
	}
	public function destroy($id){
		$movie = Movie::findOrFail($id);
		if($movie->delete())
			return ['stat' => 'success'];
		else
			return ['stat' => 'failse'];
	}
}
