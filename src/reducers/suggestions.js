import {
  OPEN_SUGGESTION_BOX,
  CLOSE_SUGGESTION_BOX,
  USER_CREATING_NEW_ACTIVITY,
  RECEIVED_NEW_DATA,
  OPEN_SNACKBAR,
  CLOSE_SNACKBAR
} from '../actions/actions'

const initialState = {
  openSuggestBox: false,
  activity: {},
  typing: false,
  submitted: false,
  suggestions: [],
  success: false,
  receivedData: {},
  openSnackbar: false

}


const suggestion = (state = initialState, action) => {
  switch(action.type) {
    case 'OPEN_SUGGESTION_BOX':
    return Object.assign({}, state, {
      openSuggestBox: true
    });
    case 'CLOSE_SUGGESTION_BOX':
    return Object.assign({}, state, {
      openSuggestBox: false,
      activity: {},
      typing: false,
      submitted: false,
      success: false,
    })
    case 'USER_CREATING_NEW_ACTIVITY':
    return Object.assign({}, state, {
      typing: true
    })
    case 'FORM_SUBMITTED':
    return Object.assign({}, state, {
      submitted: true
    })
    case 'RECEIVED_NEW_DATA':
    return Object.assign({}, state, {
      receivedData: action.newActivity,
      success:true

    })
    case 'NEW_PROTOTYPE':
    return Object.assign({}, state, {
      activity: action.prototype,
      suggestions: [...state.suggestions, action.prototype]
    })
    case 'OPEN_SNACKBAR':
    return Object.assign({}, state, {
      openSnackbar: true
    })
    case 'CLOSE_SNACKBAR':
    return Object.assign({}, state, {
      openSnackbar: false
    })
    default:
    return state;
  }
}

export default suggestion
