/*
 *
 * LoginPage actions
 *
 */

import {
  USERNAME,
  PASSWORD,
  LOGIN,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  USER_PARAM,
} from './constants';

export function username(data) {
  return {
    type: USERNAME,
    data,
  };
}

export function password(data) {
  return {
    type: PASSWORD,
    data,
  };
}

export function login() {
  return {
    type: LOGIN,
  };
}

export function loginSuccess() {
  return {
    type: LOGIN_SUCCESS,
  };
}

export function loginError() {
  return {
    type: LOGIN_ERROR,
  };
}

export function fetchUserParams() {
  return {
    type: USER_PARAM,
  };
}
