import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';
import Dialog from 'material-ui/Dialog';
import Alert from './Alert';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import ActionDelete from 'material-ui/svg-icons/action/delete';
import ContentSend from 'material-ui/svg-icons/content/send';
import {fullWhite} from 'material-ui/styles/colors';

const style = {
  button: {
    color: 'white',
    margin: '0 5px'
  }
}
class TableExampleSimple extends React.Component{
  constructor(props)
  {
    super(props);
    this.state = {
      openDialog: false,
      openAlert: false,
    };

    //
    this.onCellClickHandle = this.onCellClickHandle.bind(this);
    this.handleClose =this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAlert = this.handleAlert.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleAlertAccept = this.handleAlertAccept.bind(this);
    this.handleAlertCancel = this.handleAlertCancel.bind(this);
  }
  onCellClickHandle(rowNumber, columnNumber, evt){
    this.setState({'openDialog': true});
    let selectedMovieId = parseInt(evt.target.dataset.id, 10); //get property data-id
    //console.log("activityId", selectedMovieId);

    let movies = this.props.movies;
    let indexObj = movies.findIndex((obj => obj.id === selectedMovieId));
    let selectedMovie = movies[indexObj];
    //console.log(selectedMovie);
    this.setState({'selectedMovie': selectedMovie});
  }

  handleClose(){
    this.setState({openDialog: false});
  };
  handleSubmit(){
    var formData = new FormData();
    formData.append('title', this.inputTitle.getValue());
    formData.append('description', this.inputDescription.getValue());
    formData.append('image', this.inputImage.getValue());
    //Change method request
    formData.append('_method', 'PUT');

    //PUT (AJAX)
    fetch('/movie/'+this.state.selectedMovie.id, {
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
      //Close Dialog
      this.setState({openDialog: false});
      
    }.bind(this)) //Bind this, so you can use 'this' in this callback
    .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  handleAlert(){
    this.setState({openAlert: true});
  }
  handleAlertAccept(){
    this.handleDelete();
  }
  handleAlertCancel(){
    this.setState({
      openAlert: false
    });
  }
  handleDelete(){
    //var _token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    var formData = new FormData();
    //formData.append('_token', _token);
    //Change method request
    formData.append('_method', 'DELETE');

    fetch('/movie/'+this.state.selectedMovie.id, {
      method: 'POST',
      credentials: 'same-origin',
      body: formData
    })
    .then(function(response) {
      return response.json() //Return a promise, so using a new promise (bellow) to get responsive json
    }).then(function(obj) {
      //Data Response
      console.log('Data Response: ', obj);
      
      this.props.deleteMovie(this.state.selectedMovie.id);
      
      //Close Dialog
      this.setState({
        alertAccept: true,
        openDialog: false,
        openAlert: false
      });
    }.bind(this)) //Bind this, so you can use 'this' in this callback
    .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  }
  displayRows(){
    return (
      <TableBody displayRowCheckbox={false}>
        {
          this.props.movies.map( (movie) => (
              <TableRow key={movie.id}>
                  <TableRowColumn  data-id={movie.id}>{movie.id}</TableRowColumn>
                  <TableRowColumn  data-id={movie.id}>{movie.title}</TableRowColumn>
              </TableRow>
            )
          )
        }
      </TableBody>
    )
  }
  render(){
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        style={style.button}
        label="Delete"
        backgroundColor="#fc1414"
        hoverColor="#f94545"
        icon={<ActionDelete color={fullWhite} />}
        onTouchTap={this.handleAlert}
      />,
      <FlatButton
        style={style.button}
        label="Save"
        backgroundColor="#34a00c"
        hoverColor="#9cf47c"
        onTouchTap={this.handleSubmit}
        icon={<ContentSend color={fullWhite} />}
      />
    ];

    return (
      <div>
        <Table 
          style={this.props.slideIndex === 0 ? {}:{display: 'none'}} 
          onCellClick={this.onCellClickHandle}>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>ID</TableHeaderColumn>
              <TableHeaderColumn>Title</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          {this.displayRows()}
        </Table>

        <Dialog
          title="Detail of movie"
          actions={actions}
          modal={false}
          open={this.state.openDialog}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Type title of movie"
            fullWidth={true}
            ref={(input) => { this.inputTitle = input; }}
            defaultValue={(this.state.openDialog)?this.state.selectedMovie.title:''}
          />
          <br />
          <TextField
            hintText="Type description of movie"
            fullWidth={true}
            ref={(input) => { this.inputDescription = input; }}
            defaultValue={(this.state.openDialog)?this.state.selectedMovie.description:''}
          />
          <br />
          <TextField
            hintText="Copy URL image"
            fullWidth={true}
            ref={(input) => { this.inputImage = input; }}
            defaultValue={(this.state.openDialog)?this.state.selectedMovie.image:''}
          />
          <br />
        </Dialog>

        <Alert 
          open={this.state.openAlert} 
          alertAccept={this.handleAlertAccept} 
          alertCancel={this.handleAlertCancel} />
      </div>
    );
  }
}

export default TableExampleSimple;