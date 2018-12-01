import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridList: {
    width: 500,
    height: 450,
  },
})

class RecreationGrid extends Component {
  render(){
  const { classes } = this.props
    return (
      <div className={classes.root}>
        <GridList cellheight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div"> Recreation Types </ListSubheader>
          </GridListTile>
          <GridListTile>
            <GridListTileBar title='Education' subtitle="Because we are all students"></GridListTileBar>
          </GridListTile>
          <GridListTile>
            <GridListTileBar title='Recreational' subtitle="Who doesn't like having fun?"></GridListTileBar>
          </GridListTile>
          <GridListTile>
            <GridListTileBar title='Social' subtitle="Need some friends?"></GridListTileBar>
          </GridListTile>
        </GridList>
      </div>
    )
  }
}

export default withStyles(styles)(RecreationGrid)
