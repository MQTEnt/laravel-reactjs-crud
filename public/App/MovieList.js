import React, { Component } from 'react';

import MovieItem from './MovieItem';
import './MovieList.css';
class MovieList extends Component{
	constructor(props)
	{
		super(props);
		//
	}
	render(){
		return (
			<div className="movie-list">
				{this.props.movies.map( (movie) => (
						<MovieItem 
							updateMovie={this.props.updateMovie} 
							deleteMovie={this.props.deleteMovie}
							key={movie.id} 
							id={movie.id} 
							title={movie.title} 
							description={movie.description} 
							image={movie.image} />
					)
				)}
			</div>
		);
	}
}

export default MovieList;