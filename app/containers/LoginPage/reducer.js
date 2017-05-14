/*
 *
 * LoginPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  USERNAME,
  PASSWORD,
} from './constants';

const initialState = fromJS({
  username: 'a-gtu3@dev.global.tesco.org',
  password: 'Tesco@2017*',
});


function loginPageReducer(state = initialState, action) {
  switch (action.type) {
    case USERNAME:
      return state.set('username', action.data);
    case PASSWORD:
      return state.set('password', action.data);
    default:
      return state;
  }
}

export default loginPageReducer;
