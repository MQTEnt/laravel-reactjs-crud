import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/**
 * Alerts are urgent interruptions, requiring acknowledgement, that inform the user about a situation.
 */
export default class Alert extends React.Component {
  constructor(props)
  {
    super(props);

    this.state = {close: false}
    //
    this.handleClose = this.handleClose.bind(this);
  }

  handleClose(){
    this.setState({close: true});
  };

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={this.props.alertCancel}
      />,
      <FlatButton
        label="Accept"
        primary={true}
        onTouchTap={this.props.alertAccept}
      />,
    ];

    return (
      <div>
        <Dialog
          actions={actions}
          modal={false}
          open={this.props.open}
          onRequestClose={this.props.alertCancel}
        >
          Do you wanna delete this movie?
        </Dialog>
      </div>
    );
  }
}