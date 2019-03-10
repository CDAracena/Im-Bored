import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import Slide from '@material-ui/core/Slide';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import JokesterCard from './Card'
import Grid from '@material-ui/core/Grid'
import Input from '@material-ui/core/Input'
import {openBottomDrawer, closeBottomDrawer} from '../actions/bottomdrawer';

//Going to serve as a container for displaying the favorited jokes.

  const styles = {
    appBar: {
      position: 'relative',
    },
    flex: {
      flex: 1,
      paddingTop: '25px'
    },
    card: {
      width: '400px'
    }
  };

  function Transition(props) {
    return <Slide direction="up" {...props} />;
  }

  class BottomDrawer extends Component {

    render() {
      const { classes, openBottom, closeBottom, jokester } = this.props;
      const {bottomDrawerOpen} = jokester
      return (
        <div>
          <Dialog
            fullScreen
            open={bottomDrawerOpen}
            onClose={closeBottom}
            TransitionComponent={Transition}
             data-cy="bottom-drawer"
          >
            <AppBar className={classes.appBar}>
              <Toolbar>
                <IconButton color="inherit" onClick={closeBottom} aria-label="Close" data-cy="bottom-drawer-closer">
                  <CloseIcon />
                </IconButton>
                <Typography variant="title" color="inherit">
                  Jokester!
                </Typography>
              </Toolbar>
            </AppBar>
            <Grid container justify="space-evenly" className={classes.flex}>
            <Grid item className={classes.card}>
            <JokesterCard cardType="geekJoke" cardSubheader="Fetch a Geek Joke!" cardTitle="Geek Joke"/>
            </Grid>
            <Grid item className={classes.card}>
            <JokesterCard cardType="dadJoke" cardSubheader="Fetch a Dad Joke"  cardTitle="Dad Joke"/>
            </Grid>
            <Grid item className={classes.card}>
            <JokesterCard cardType="corporateBS" cardSubheader="Fetch a corporate bs" cardTitle="Corporate BS"/>
            </Grid>
            <Grid item className={classes.card}>
            <JokesterCard cardType="lifeAdvice" cardSubheader="Fetch life advice" cardTitle="Life Advice"/>
            </Grid>
            </Grid>
          </Dialog>
        </div>
      );
    }
  }

  const mapStateToProps = ({jokester}) => {
    return {
      jokester
    }
  }

  const mapDispatchToProps = dispatch => {
    return {
      openBottom: () => dispatch(openBottomDrawer()),
      closeBottom: () => dispatch(closeBottomDrawer())
    }
  }

export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(BottomDrawer))
