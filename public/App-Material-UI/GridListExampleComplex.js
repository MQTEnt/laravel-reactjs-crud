import React from 'react';
import {GridList, GridTile} from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import StarBorder from 'material-ui/svg-icons/toggle/star-border';

const style = {
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    height: '100%',
    width: '100%',
    overflow: 'hidden',
  },
  gridList: {
    width: "auto",
    height: "auto"
  },
};

/**
 * This example demonstrates "featured" tiles, using the `rows` and `cols` props to adjust the size of the tile.
 * The tiles have a customised title, positioned at the top and with a custom gradient `titleBackground`.
 */
class GridListExampleComplex extends React.Component{
  render(){
    return (
        <div style={this.props.slideIndex === 1 ? style.root : {display: 'none'}}>
          <GridList
            cols={2}
            cellHeight={200}
            padding={1}
            style={style.gridList}
          >
            {this.props.movies.map((movie) => (
              <GridTile
                key={movie.id}
                title={movie.title}
                actionIcon={<IconButton><StarBorder color="white" /></IconButton>}
                actionPosition="left"
                titlePosition="top"
                titleBackground="linear-gradient(to bottom, rgba(0,0,0,0.7) 0%,rgba(0,0,0,0.3) 70%,rgba(0,0,0,0) 100%)"
              >
                <img src={'http://localhost:8000'+movie.image} alt="example"/>
              </GridTile>
            ))}
          </GridList>
        </div>
    );
  }
}

export default GridListExampleComplex;