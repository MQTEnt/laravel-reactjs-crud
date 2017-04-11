import React, { Component } from 'react';

import './MovieItem.css'
class MovieItem extends Component{
	constructor(props){
		super(props)
		this.state = {
			'editMovie': false
		}
		//
		this.handleClickEdit = this.handleClickEdit.bind(this);
		this.handleClickDelete = this.handleClickDelete.bind(this);
		this.handleClickUpdate = this.handleClickUpdate.bind(this);
		this.handleClickCancel = this.handleClickCancel.bind(this);
	}
	handleClickEdit(){
		this.setState({
			'editMovie': true
		});
	}
	handleClickUpdate(){
		var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");

		var formData = new FormData();
		formData.append('title', this.props.id);
		formData.append('title', this.inputTitle.value);
		formData.append('description', this.inputDescription.value);
		formData.append('image', this.inputImage.value);
		formData.append('_token', _token);
		//Change method request
		formData.append('_method', 'PUT');

		//POST (AJAX)
		fetch('/movie/'+this.props.id, {
			method: 'POST',
			credentials: 'same-origin',
			body: formData
		})
		.then(function(response) {
			return response.json() //Return a promise, so using a new promise (bellow) to get responsive json
		}).then(function(obj) {
			//Data Response
			console.log('Data Response: ', obj)

			this.props.updateMovie(obj);

			/*** Chú ý setState sau khi update ***/
			this.setState({
				'editMovie': false
			});
			
		}.bind(this)) //Bind this, so you can use 'this' in this callback
		.catch(function(ex) {
			//Log Error
			console.log('parsing failed', ex)
		});
	}
	handleClickDelete(){
		if(confirm('Do you wanna delete this movie?'))
		{
			var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
			var formData = new FormData();
			formData.append('_token', _token);
			//Change method request
			formData.append('_method', 'DELETE');

			fetch('/movie/'+this.props.id, {
				method: 'POST',
				credentials: 'same-origin',
				body: formData
			})
			.then(function(response) {
				return response.json() //Return a promise, so using a new promise (bellow) to get responsive json
			}).then(function(obj) {
				//Data Response
				console.log('Data Response: ', obj);
				
				this.props.deleteMovie(this.props.id);
			}.bind(this)) //Bind this, so you can use 'this' in this callback
			.catch(function(ex) {
				//Log Error
				console.log('parsing failed', ex)
			});
		}
		else
			return false;
	}
	handleClickCancel(){
		this.setState({
			'editMovie': false
		});
	}
	render(){
		if(!this.state.editMovie){
			return (
				<div className="movie-item">
					<h2>{this.props.title}</h2>
					<img src={this.props.image} />
					<p>{this.props.description}</p>
					<button className="edit-movie" onClick={this.handleClickEdit}>Edit</button>
					<button className="delete-movie" onClick={this.handleClickDelete}>Delete</button>
				</div>
			);
		}
		else{
			return (
				<div className="movie-item">
					<input className="edit-input" type="text" defaultValue={this.props.title} ref={(input) => { this.inputTitle = input; }} placeholder="Type Title Movie..." />
					<input className="edit-input" type="text" defaultValue={this.props.description} ref={(input) => { this.inputDescription = input; }} placeholder="Type Description Movie..." />
					<input className="edit-input" type="text" defaultValue={this.props.image} ref={(input) => { this.inputImage = input; }} placeholder="Copy Image Movie URL..." />
					<button onClick={this.handleClickUpdate}>Save</button>
					<button onClick={this.handleClickCancel}>Cancel</button>
				</div>
			);
		}
	}
}

export default MovieItem;