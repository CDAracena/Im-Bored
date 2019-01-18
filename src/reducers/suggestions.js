import {
  OPEN_SUGGESTION_BOX,
  CLOSE_SUGGESTION_BOX,
  USER_CREATING_NEW_ACTIVITY,
  RECEIVED_NEW_DATA
} from '../actions/actions'

const initialState = {
  openSuggestBox: false,
  activity: {},
  typing: false,
  submitted: false,
  suggestions: [],
  success: false,
  receivedData: {}

}

// openSuggestBox = is modal open or not
// activity = once submitted, set to the new activity object and spread to suggestions
// typing = check if user is actively typing in modal input fields
// submitted = if submitted confirm true
// suggestions = array that stores the current session's suggestions

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
      success: false
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
    default:
    return state;
  }
}

export default suggestion
