import {
  OPEN_SUGGESTION_BOX,
  CLOSE_SUGGESTION_BOX
} from '../actions/actions'

const initialState = {
  openSuggestBox: false,
  activity: {},
  typing: false,
  submitted: false,
  suggestions: []
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
      openSuggestBox: false
    })

    default:
    return state;
  }
}

export default suggestion
