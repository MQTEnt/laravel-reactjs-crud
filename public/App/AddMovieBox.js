import React, {Component} from 'react';

import './AddMovieBox.css';

class AddMovieBox extends Component{
	constructor(props){
		super(props);

		//Set state default
		//...

		//Bind this for methods...
		this.handleSubmit = this.handleSubmit.bind(this);
	}
	handleSubmit(e){
		e.preventDefault();

		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");

		var formData = new FormData();
		formData.append('title', this.inputTitle.value);
		formData.append('description', this.inputDescription.value);
		formData.append('image', this.inputImage.value);
		formData.append('_token', _token);

		//POST (AJAX)
		fetch('/movie', {
			method: 'POST',
			credentials: 'same-origin',
			body: formData
		})
		.then(function(response) {
			return response.json() //Return a promise, so using a new promise (bellow) to get responsive json
		}).then(function(obj) {
			//Data Response
			console.log('Data Response: ', obj)
			let newMovie = {
				'id': obj.id,
				'title': obj.title,
				'description': obj.description,
				'image': obj.image
			}
			this.props.addNewMovie(newMovie);
			
			//Clear input
			this.inputTitle.value = '';
			this.inputDescription.value = '';
			this.inputImage.value = '';
		}.bind(this)) //Bind this, so you can use 'this' in this callback
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	render(){
		return (
			<div className="add-movie-box">
				<form onSubmit={this.handleSubmit}>
					<input className="add-movie" type="text" ref={(input) => { this.inputTitle = input; }} placeholder="Type Title Movie..." />
					<input className="add-movie" type="text" ref={(input) => { this.inputDescription = input; }} placeholder="Type Description Movie..." />
					<input className="add-movie" type="text" ref={(input) => { this.inputImage = input; }} placeholder="Copy Image Movie URL..." />
					<button>Add</button>
				</form>
			</div>
		);
	}
}

export default AddMovieBox;