import React, {Component} from 'react';
import {connect} from 'react-redux';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import red from '@material-ui/core/colors/red';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import WbSunny from '@material-ui/icons/WbSunny';
import AccessibilityNew from '@material-ui/icons/AccessibilityNew';
import LocationCity from '@material-ui/icons/LocationCity';
import Face from '@material-ui/icons/Face';
import Input from '@material-ui/core/Input';
import {fetchGeekJoke, fetchDadJoke, postDadJoke, fetchCorporateBS, fetchAdvice} from '../../src/utils/api'

// Maybe add favorites to the bottom / collapse area of the card.
//Reset favorite icon upon every fetch request

const styles = theme => ({
  card: {
    maxWidth: 400,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  actions: {
    display: 'flex',
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: theme.palette.primary.main,
  },
});

class JokesterCard extends Component {
  state = { expanded: false, joke: '' };

  handleExpandClick = () => {
    this.setState(state => ({ expanded: !state.expanded }));
  };


  getCardAvatar = () => {
    switch(this.props.cardTitle){
      case 'Geek Joke':
      return <Face/>;
      case 'Dad Joke':
      return <AccessibilityNew/>;
      case 'Corporate BS':
      return <LocationCity/>
      case 'Advice':
      return <WbSunny/>
      default:
      return;
    }
  }

renderInput = (title) => {
  if (title === 'Dad Joke' || title === 'Advice') {
    return (
      <Input data-cy="card-search-input"/>
    )
  }
}

  render() {
    const { classes, cardTitle, cardSubheader, apiChoice, searchable} = this.props;

    return (
      <Card className={classes.card} data-cy="jokester-card">
        <CardHeader
          avatar={
            <Avatar aria-label="Recipe" className={classes.avatar}>
              {this.getCardAvatar()}
            </Avatar>
          }
          action={
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          }
          title={cardTitle}
          subheader={cardSubheader}
          className={classes.cardHeader}
        />
        <CardMedia
          className={classes.media}
          image="/static/images/cards/paella.jpg"
          title="Paella dish"
        />
        <CardContent>
          <Typography component="p">
            {this.state.joke}
          </Typography>
          {this.renderInput(cardTitle)}
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="Share">
            <ShareIcon />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>

          </CardContent>
        </Collapse>
      </Card>
    );
  }
}

const mapStateToProps = () => {
  return {

  }
}

const mapDispatchToProps = () => {
  return {

  }
}



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(JokesterCard))
