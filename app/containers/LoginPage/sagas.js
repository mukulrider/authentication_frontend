import { selectLoginPageDomain } from 'containers/LoginPage/selectors';
import { take, call, select, cancel, takeLatest, put } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import {
  LOGIN,
  USER_PARAM,
} from './constants';
import {
  fetchUserParams,
} from "./actions";

const frontendHostName = 'dvcmpweb00001uk.dev.global.tesco.org';
const frontendHostPort = '';
const backendHostName = 'dvcmpapp00003uk.dev.global.tesco.org';
const backendHostPort = '83';

/* GENERATE LOGIN TOKEN */
export function* generateLogin() {
  const login = yield select(selectLoginPageDomain());
  const usernameCaseInsensitive = login.get('username');
  const username = usernameCaseInsensitive.toLowerCase();
  const password = login.get('password');

  try {
    const data = yield call(request,
      `http://${backendHostName}:${backendHostPort}/api/obtain-auth-token/`,

      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

    document.cookie = `token=${data.token};domain=${frontendHostName};path=/`;
    yield put(fetchUserParams())
  } catch (err) {
    alert('Unsuccessful login! Please try again!');
  }
}

export function* doLogin() {
  const watcher = yield takeLatest(LOGIN, generateLogin);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

/* GENERATE LOGIN TOKEN */
export function* generateUserParams() {
  const login = yield select(selectLoginPageDomain());
  const usernameCaseInsensitive = login.get('username');
  const username = usernameCaseInsensitive.toLowerCase();
  try {
    const data = yield call(request,
      `http://${backendHostName}:${backendHostPort}/api/obtain-user-params/`);
    const findInObject = (myObject, myCriteria) => myObject.filter((obj) => Object.keys(myCriteria).every((c) => obj[c] === myCriteria[c]));
    const dataStr = JSON.stringify(data);
    const userFilteredData = findInObject(JSON.parse(dataStr),
      {
        user: username,
      });
    document.cookie = `user=${userFilteredData[0].user};domain=${frontendHostName};path=/`;
    document.cookie = `designation=${userFilteredData[0].designation};domain=${frontendHostName};path=/`;
    document.cookie = `buying_controller=${userFilteredData[0].buying_controller};domain=${frontendHostName};path=/`;
    document.cookie = `buyer=${userFilteredData[0].buyer};domain=${frontendHostName};path=/`;
    document.cookie = `login_timestamp=${userFilteredData[0].login_timestamp};domain=${frontendHostName};path=/`;
    window.location = `http://${frontendHostName}:${frontendHostPort}/`;
  } catch (err) {
    console.log('Some error happened, check LoginPage sagas');
    window.location = `http://${frontendHostName}:${frontendHostPort}/login/`;
  }
}

export function* dofetchUserParams() {
  const watcher = yield takeLatest(USER_PARAM, generateUserParams);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  doLogin,
  dofetchUserParams,
];
