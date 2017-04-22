import React from 'react';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
/**
 * Dialog with action buttons. The actions are passed in as an array of React objects,
 * in this example [FlatButtons](/#/components/flat-button).
 *
 * You can also close this dialog by clicking outside the dialog, or with the 'Esc' key.
 */
const style = {
  button: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  }
};

export default class AddMovieBox extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      open: false
    }
    //
    this.handleOpen = this.handleOpen.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleOpen(){
    this.setState({open: true});
  };

  handleClose(){
    this.setState({open: false});
  };

  handleSubmit(){
    //7hq4rrieDljX4cFKfxYrOMEeA0SmE7tNXlqxw9FX

    var formData = new FormData();
    formData.append('title', this.inputTitle.getValue());
    formData.append('description', this.inputDescription.getValue());
    formData.append('image', this.inputImage.getValue());
    formData.append('_token', '7hq4rrieDljX4cFKfxYrOMEeA0SmE7tNXlqxw9FX');

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
      
      //Clear input (default)

      //Close modal
      this.setState({open: false});
    }.bind(this))
    .catch(function(ex) {
      //Log Error
      console.log('parsing failed', ex)
    });
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onTouchTap={this.handleSubmit}
      />
    ];

    return (
      <div>
        <div>
          <FloatingActionButton onTouchTap={this.handleOpen} secondary={true} style={style.button}>
            <ContentAdd />
          </FloatingActionButton>
        </div>
        <Dialog
          title="Add new movie"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <TextField
            hintText="Type title of movie"
            fullWidth={true}
            ref={(input) => { this.inputTitle = input; }}
          />
          <br />
          <TextField
            hintText="Type description of movie"
            fullWidth={true}
            ref={(input) => { this.inputDescription = input; }}
          />
          <br />
          <TextField
            hintText="Copy URL image"
            fullWidth={true}
            ref={(input) => { this.inputImage = input; }}
          />
          <br />
        </Dialog>
      </div>
    );
  }
}