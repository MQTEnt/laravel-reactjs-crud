import React from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TabsExampleSwipeable from './TabsExampleSwipeable';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

class App extends React.Component{
	constructor(props)
	{
		super(props);

		this.state = {
			'movies': []
		}
		//Auto binding (Update later)
		this.addNewMovie = this.addNewMovie.bind(this);
		this.updateMovie = this.updateMovie.bind(this);
		this.deleteMovie = this.deleteMovie.bind(this);
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
	addNewMovie(newMovie){
		let newMovieList = this.state.movies;
		newMovieList.push(newMovie);
		this.setState({
			'movies': newMovieList
		});
	}
	updateMovie(updatedMovie){
		let movies = this.state.movies;
		let objIndex = movies.findIndex((obj => obj.id === updatedMovie.id));
		
		//console.log("Before update: ", movies[objIndex])

		//Update object's property.
		movies[objIndex] = updatedMovie;

		this.setState({
			'movies': movies
		});
	}
	deleteMovie(movieId){
		let movies = this.state.movies;
		let objIndex = movies.findIndex((obj => obj.id === movieId));
		
		//console.log("Before update: ", movies[objIndex])

		//Update object's property.
		movies.splice(objIndex, 1);

		this.setState({
			'movies': movies
		});
	}
	render(){
		return (
			<div>
				<MuiThemeProvider>
					<TabsExampleSwipeable 
						movies={this.state.movies} 
						addNewMovie={this.addNewMovie}
						updateMovie={this.updateMovie}
						deleteMovie={this.deleteMovie}
					/>
				</MuiThemeProvider>
		  	</div>
		);
	}
}

export default App;