import {
  OPEN_BOTTOM_DRAWER,
  CLOSE_BOTTOM_DRAWER
} from '../actions/bottomdrawer';

const initialState = {
  bottomDrawerOpen: false,
}

const jokester = (state=initialState, action) => {
  switch(action.type) {
    case 'OPEN_BOTTOM_DRAWER':
    return Object.assign({}, state, {
      bottomDrawerOpen: true
    });
    case 'CLOSE_BOTTOM_DRAWER':
    return Object.assign({}, state, {
      bottomDrawerOpen: false
    });
    default:
    return state;
  }
}

export default jokester;
