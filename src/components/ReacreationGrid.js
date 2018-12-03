import React, {Component} from 'react';
import { connect } from 'react-redux';
import Grid from '@material-ui/core/Grid';
import {withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList'
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import {Education, BikeRide, Social, Diy, Charity, Cook, Spa, Music, Work} from '../utils/svg_icons'
import { selectCategory } from '../actions/actions';


const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  gridList: {
    margin: 'auto !important',
  },
})

class RecreationGrid extends Component {

  onSetCategory = (e) => {
    this.props.setCategory(e.target.dataset.category)
  }
  render(){
  const { classes, setCategory, currentCategory } = this.props
    return (
      <div className={classes.root}>
        <GridList cellheight={180} className={classes.gridList}>
          <GridListTile key="Subheader" cols={2} style={{height: 'auto'}}>
            <ListSubheader component="div"> {currentCategory ? currentCategory : 'Recreation Types'} </ListSubheader>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="https://images.pexels.com/photos/265076/pexels-photo-265076.jpeg?auto=compress&cs=tinysrgb&h=350" alt="education"/>
            <GridListTileBar title='Education' subtitle="Because we are all students" actionIcon={
              <IconButton color="primary" data-category="education" onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Education}/> </SvgIcon> </IconButton>
            }>
            </GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="http://www.circ.biz/wp-content/uploads/2014/12/1406-sands-jacksonhole-whitewater-1972-circ.jpg" alt="recreation"/>
            <GridListTileBar title='Recreational' subtitle="Who doesn't like having fun?" actionIcon={
              <IconButton color="primary" data-category="recreation"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={BikeRide}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="https://img3.stockfresh.com/files/p/pressmaster/m/66/525512_stock-photo-joyful-party.jpg" alt="social"/>
            <GridListTileBar title='Social' subtitle="Need some friends?" actionIcon={
              <IconButton color="primary" data-category="social"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon fontSize="large"> <path d={Social}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="https://as2.ftcdn.net/jpg/01/67/42/53/500_F_167425391_gMIWP09RF61mh8c43wgZcKP6qKsSqHLM.jpg" alt="do it yourself"/>
            <GridListTileBar title='DIY' subtitle="Do It Yourself!" actionIcon={
              <IconButton color="primary" data-category="do it yourself"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Diy}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="https://cdn.images.express.co.uk/img/dynamic/17/590x/Charity-864473.jpg" alt="charity"/>
            <GridListTileBar title='Charity' subtitle="There's always more to give" actionIcon={
              <IconButton color="primary" data-category="charity"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Charity}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="http://footage.framepool.com/shotimg/qf/822857170-countertop-slicing-thin-minority.jpg" alt="cooking"/>
            <GridListTileBar title='Cooking' subtitle="Spend less time on Seamless and more in your kitchen" actionIcon={
                <IconButton color="primary" data-category="cooking"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Cook}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile>
            <img src="https://media.istockphoto.com/photos/meditation-by-the-lake-picture-id487173784?k=6&m=487173784&s=612x612&w=0&h=VCUU9ZERTnr3P2g6XrHrzqFN7aTk4RM4Tfh321R_2u8=" alt="relaxation"/>
            <GridListTileBar title='Relaxation' subtitle="Stressed? Just chill out" actionIcon={
                <IconButton color="primary" data-category="relaxation"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Spa}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="http://photoartinc.com/wp-content/uploads/2018/02/music-stock-photos-8.jpg" alt="music"/>
            <GridListTileBar title='Music' subtitle="Get them vibes" actionIcon={
              <IconButton color="primary" data-category="music"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Music}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
          <GridListTile className={classes.gridListTile}>
            <img src="https://freedesignfile.com/upload/2018/07/busy-work-Stock-Photo-03.jpg" alt="busywork"/>
            <GridListTileBar title='Busywork' subtitle="Get up off that coach NOW" actionIcon={
              <IconButton color="primary" data-category="busywork"  onClick={(e) => this.onSetCategory(e)}> <SvgIcon> <path d={Work}/> </SvgIcon> </IconButton>
            }></GridListTileBar>
          </GridListTile>
        </GridList>
      </div>
    )
  }
}

const mapStateToProps = ({currentCategory}) => {
  return {
  currentCategory
  }
}

const mapDispatchToProps = dispatch => {
  return {
    setCategory: (category) => dispatch(selectCategory(category))
  }
}

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(RecreationGrid))
