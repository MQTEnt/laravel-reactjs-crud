import React, { Component } from 'react';

import MovieList from './MovieList';
import AddMovieBox from './AddMovieBox';
import './App.css';
class App extends Component{
	constructor(props)
	{
		super(props);

		this.state = {
			'movies': []
		}

		//Bind this for methods...
		this.addingNewMovie = this.addingNewMovie.bind(this);
		this.updatingMovie = this.updatingMovie.bind(this);
		this.deletingMovie = this.deletingMovie.bind(this);
	}
	addingNewMovie(newMovie){
		let newMovieList = this.state.movies;
		newMovieList.push(newMovie);
		this.setState({
			'movies': newMovieList
		});
	}
	updatingMovie(updatedMovie){
		let movies = this.state.movies;
		let objIndex = movies.findIndex((obj => obj.id == updatedMovie.id));
		
		//console.log("Before update: ", movies[objIndex])

		//Update object's property.
		movies[objIndex] = updatedMovie;

		this.setState({
			'movies': movies
		});
	}
	deletingMovie(movieId){
		let movies = this.state.movies;
		let objIndex = movies.findIndex((obj => obj.id == movieId));
		
		//console.log("Before update: ", movies[objIndex])

		//Update object's property.
		movies.splice(objIndex, 1);

		this.setState({
			'movies': movies
		});
	}
	componentDidMount(){
		//Get data
		fetch('/movie')
		.then(function(response) {
			return response.json() //Return a promise, so using a new promise (bellow) to get responsive json
		}).then(function(obj) {
			//Data Response
			//console.log('Data Response: ', obj);
			this.setState({
			  		'movies': obj
			});
		}.bind(this)) //Bind this, so you can use 'this' in this callback
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	render(){
		return (
			<div className="app">
				<AddMovieBox addNewMovie={this.addingNewMovie}/>
				<MovieList 
					movies={this.state.movies} 
					updateMovie={this.updatingMovie}
					deleteMovie={this.deletingMovie}
				/>
			</div>
		);
	}
}

export default App;