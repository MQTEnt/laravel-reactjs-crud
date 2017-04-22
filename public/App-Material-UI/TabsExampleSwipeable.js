import React from 'react';
import {Tabs, Tab} from 'material-ui/Tabs';
import SwipeableViews from 'react-swipeable-views';

import AvMovie from 'material-ui/svg-icons/av/movie';
import ActionDashboard from 'material-ui/svg-icons/action/dashboard';

import AddMovieBox from './AddMovieBox';
import TableExampleSimple from './TableExampleSimple';
import GridListExampleComplex from './GridListExampleComplex';


export default class TabsExampleSwipeable extends React.Component {
constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value){
    this.setState({
      slideIndex: value
    });
  };

  renderFloatingActionButton(){
    if(this.state.slideIndex === 0)
      return <AddMovieBox addNewMovie={this.props.addNewMovie}/>;
  }
  render() {
    return (
        <div>
          <Tabs
            onChange={this.handleChange}
            value={this.state.slideIndex}
          >
            <Tab icon={<AvMovie/>} label="Movie Management" value={0} />
            <Tab icon={<ActionDashboard/>} label="Movie List" value={1} />
          </Tabs>
          <SwipeableViews
            index={this.state.slideIndex}
            onChangeIndex={this.handleChange}
          >
            <div>

              <TableExampleSimple 
                slideIndex={this.state.slideIndex} 
                movies={this.props.movies}
                updateMovie={this.props.updateMovie}
                deleteMovie={this.props.deleteMovie}
              />

            </div>
            <div>

              <GridListExampleComplex 
                slideIndex={this.state.slideIndex} 
                movies={this.props.movies}
              />

            </div>
          </SwipeableViews>
          { this.renderFloatingActionButton() }
        </div>
    );
  }
}