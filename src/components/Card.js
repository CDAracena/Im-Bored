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
import SkipNext from '@material-ui/icons/SkipNext';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import {
  fetchNewDadJoke,
  fetchNewLifeAdvice,
  fetchNewCorporateBS,
  fetchNewGeekJoke,
  fetchNewKanyeQuote,
  addToDadFavorites,
  addToAdviceFavorites,
  addToCorporateFavorites,
  addToGeekFavorites,
  addToKanyeFavorites
} from '../actions/bottomdrawer';


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
  searchButton: {
    backgroundColor: theme.palette.primary.main
  },
  searchForm: {
    display: 'flex',
    alignItems: 'center',
    paddingTop: '15px'
  },
  heartButton: {
    color: '#C3423F'
  },
  favCount: {
    color: '#C3423F',
    textShadow: '1px 1px 5px'
  },
  disabledFavCount: {
    color: theme.palette.secondary.main
  }
});

class JokesterCard extends Component {
  state = {
    expanded: false,
    joke: '',
    cardTitle: '',
    searchTerm: '',
    favoriteCount: 0
  };

  handleExpandClick = () => this.setState({expanded: !this.state.expanded})


  getCardAvatar = () => {
    switch(this.props.cardType){
      case 'geekJoke':
      return <Face/>;
      case 'dadJoke':
      return <AccessibilityNew/>;
      case 'corporateBS':
      return <LocationCity/>
      case 'lifeAdvice':
      return <WbSunny/>
      default:
      return;
    }
  }

  setSearchTerm = (e) => {
    this.setState({searchTerm: e.target.value})
  }

renderInput = (type) => {
  const {classes} = this.props
  if (type === 'dadJoke' || type === 'lifeAdvice') {
    return (
      <form onSubmit={this.fetchSearchTerm} className={classes.searchForm}>
      <FormControl>
      <InputLabel htmlFor="searchTerm"> Search </InputLabel>
      <Input
      data-cy="card-search-input"
      name="searchTerm"
      margin="dense"
      onChange={this.setSearchTerm}
      value={this.state.searchTerm}
      startAdornment={
        <InputAdornment position="start" variant="outlined"> <Search/> </InputAdornment>
      }
      />
      </FormControl>
      <Button classes={{root: classes.searchButton}}
      disabled={!this.state.searchTerm}
      onClick={this.fetchSearchTerm}>
      Search<Send/>
      </Button>
      </form>
    )
  }
}



componentDidMount() {
const {cardTitle, cardType} = this.props;
 this.setState({cardTitle: cardTitle})

this.fetchNewJoke()

if (this.props.jokester[cardType].collection) {
  this.setState({favoriteCount: this.props.jokester[cardType].collection.length})
  }
}

renderActiveJoke = () => {
  const {jokester, cardType} = this.props
  const {geekJoke, dadJoke, lifeAdvice, corporateBS, kanyeQuote} = jokester
  switch(cardType) {
    case 'geekJoke':
    return geekJoke.currentJoke ? geekJoke.currentJoke : 'Fetching...'
    case 'dadJoke':
    return dadJoke.currentJoke ? dadJoke.currentJoke.joke : 'Fetching...'
    case 'lifeAdvice':
    return lifeAdvice.currentJoke ? lifeAdvice.currentJoke.slip.advice : 'Fetching...'
    case 'corporateBS':
    return corporateBS.currentJoke ? corporateBS.currentJoke.phrase : 'Fetching...'
    case 'kanyeQuote':
    return kanyeQuote.currentJoke ? kanyeQuote.currentJoke.quote : 'Fetching...'
    default:
    return ;
  }
}

fetchNewJoke = () => {
  const {cardType} = this.props
  cardType === 'geekJoke' ? this.props.getGeekJoke() : undefined
  cardType === 'dadJoke' ? this.props.getDadJoke() : undefined
  cardType === 'corporateBS' ? this.props.getCorporateBS() : undefined
  cardType === 'lifeAdvice' ? this.props.getLifeAdvice() : undefined
  cardType === 'kanyeQuote' ? this.props.getKanyeQuote() : undefined
}

fetchSearchTerm = (e) => {
  // NEED TO EDIT THIS
  e.preventDefault()
  if (this.state.searchTerm && this.state.cardTitle === 'Dad Joke') {
      this.props.getDadJoke(this.state.searchTerm)
  } else if (this.state.searchTerm && this.state.cardTitle === 'Life Advice') {
    this.props.getLifeAdvice(this.state.searchTerm)
  }
  this.setState({searchTerm: ''})
}

addToJokeList = () => {
  const {geekJoke, dadJoke, lifeAdvice, corporateBS, kanyeQuote} = this.props.jokester
  switch(this.props.cardType) {
    case 'geekJoke':
    this.props.addToGeek(geekJoke.currentJoke)
    this.props.getGeekJoke()
    return;
    case 'dadJoke':
    this.props.addToDad(dadJoke.currentJoke.joke)
    this.props.getDadJoke()
    return;
    case 'lifeAdvice':
    this.props.addToAdvice(lifeAdvice.currentJoke.slip.advice)
    this.props.getLifeAdvice()
    return;
    case 'corporateBS':
    this.props.addToCorporate(corporateBS.currentJoke.phrase)
    this.props.getCorporateBS()
    return;
    case 'kanyeQuote':
    this.props.addToKanyeFavorites(kanyeQuote.currentJoke.quote)
    this.props.getKanyeQuote()
    default:
    return ;
 }
}

componentDidUpdate(prevProps, prevState) {
  const {cardType} = this.props
  if (prevProps.jokester[cardType].collection !== this.props.jokester[cardType].collection) {
    this.setState({favoriteCount: this.props.jokester[cardType].collection.length})
  }
}



  render() {
    const { classes, cardTitle, cardSubheader, apiChoice, searchable, jokester, cardType} = this.props;
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
          {this.renderInput(cardType)}
        </CardContent>

        <CardActions className={classes.actions} disableActionSpacing>
          <IconButton aria-label="Add to favorites" onClick={this.addToJokeList} className={classes.heartButton} data-cy="favorite-jokester-btn">
            <FavoriteIcon />
          </IconButton>
          <Typography component="span" className={this.state.favoriteCount ? classes.favCount : classes.disabledFavCount} data-cy="favorite-count">
          {this.state.favoriteCount}
          </Typography>
          <IconButton aria-label="SkipNext" onClick={this.fetchNewJoke} color="primary" data-cy="next-joke-btn">
            <SkipNext />
          </IconButton>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: this.state.expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={this.state.expanded}
            aria-label="Show more"
            disabled={!this.state.favoriteCount}
            color="primary"
            data-cy="expand-collapse-list"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
          <CardContent>
          <List>
          {jokester[cardType].collection && jokester[cardType].collection.map((item, idx) => <ListItem key={idx} data-cy="collapse-list-item"> {item} </ListItem>)}
          </List>
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
    getGeekJoke: () => dispatch(fetchNewGeekJoke()),
    addToGeek: (joke) => dispatch(addToGeekFavorites(joke)),
    addToDad: (joke) => dispatch(addToDadFavorites(joke)),
    addToAdvice: (advice) => dispatch(addToAdviceFavorites(advice)),
    addToCorporate: (joke) => dispatch(addToCorporateFavorites(joke)),
    addToKanyeFavorites: (quote) => dispatch(addToKanyeFavorites(quote)),
    getKanyeQuote: () => dispatch(fetchNewKanyeQuote())
  }
}



export default withStyles(styles)(connect(mapStateToProps, mapDispatchToProps)(JokesterCard))
