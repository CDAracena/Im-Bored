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
import Search from '@material-ui/icons/Search';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import posed from 'react-pose';

import {fetchNewDadJoke, fetchNewLifeAdvice, fetchNewCorporateBS, fetchNewGeekJoke} from '../actions/bottomdrawer';

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
  state = {
    expanded: false,
    joke: '',
    cardTitle: '',
    searchTerm: ''
  };

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

  setSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

renderInput = (title) => {
  if (title === 'Dad Joke' || title === 'Advice') {
    return (
      <FormControl>
      <InputLabel htmlFor="searchTerm"> Search </InputLabel>
      <Input
      data-cy="card-search-input"
      name="searchTerm"
      margin="dense"
      onChange={this.setSearchTerm}
      startAdornment={
        <InputAdornment position="start" variant="outlined"> <Search/> </InputAdornment>
      }
      />
      </FormControl>
    )
  }
}



componentDidMount() {
const {cardTitle} = this.props;
 this.setState({cardTitle: cardTitle})

cardTitle === 'Geek Joke' ? this.props.getGeekJoke() : undefined
cardTitle === 'Dad Joke' ? this.props.getDadJoke() : undefined
cardTitle === 'Corporate BS' ? this.props.getCorporateBS() : undefined
cardTitle === 'Advice' ? this.props.getLifeAdvice() : undefined
}

renderActiveJoke = () => {
  const {jokester, cardTitle} = this.props
  const {geekJoke, dadJoke, lifeAdvice, corporateBS} = jokester
  switch(cardTitle) {
    case 'Geek Joke':
    return geekJoke.currentJoke
    case 'Dad Joke':
    return dadJoke.currentJoke ? dadJoke.currentJoke.joke : 'Fetching...'
    case 'Advice':
    return lifeAdvice.currentJoke ? lifeAdvice.currentJoke.slip.advice : 'Fetching...'
    case 'Corporate BS':
    return corporateBS.currentJoke ? corporateBS.currentJoke.phrase : 'Fetching...'
    default:
    return ;
  }
}


  render() {
    const { classes, cardTitle, cardSubheader, apiChoice, searchable, jokester} = this.props;

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
        <CardContent>
          <Typography component="p" data-cy="joke-text">
          {this.renderActiveJoke()}
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

const mapStateToProps = ({jokester}) => {
  return {
    jokester
  }
}


const mapDispatchToProps = (dispatch) => {
  return {
    getDadJoke: (searchTerm) => dispatch(fetchNewDadJoke(searchTerm)),
    getLifeAdvice: (searchTerm) => dispatch(fetchNewLifeAdvice(searchTerm)),
    getCorporateBS: () => dispatch(fetchNewCorporateBS()),
    getGeekJoke: () => dispatch(fetchNewGeekJoke())
  }
}



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(JokesterCard))
