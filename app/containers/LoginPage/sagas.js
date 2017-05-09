import { selectLoginPageDomain } from 'containers/LoginPage/selectors';
import { take, call, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import {
  LOGIN,
  USER_PARAM,
} from './constants';

/* GENERATE LOGIN TOKEN */
export function* generateLogin() {
  const login = yield select(selectLoginPageDomain());
  const username = login.get('username');
  const password = login.get('password');

  try {
    const data = yield call(request, 'http://10.1.244.200:8000/api/obtain-auth-token/',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
    document.cookie = `token=${data.token};domain=10.1.244.200;path=/`;
    window.location = '/';
  } catch (err) {
    window.location = '/login/';
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
  const username = login.get('username');
  try {
    const data = yield call(request, 'http://10.1.244.200:8000/api/obtain-user-params/');
    const findInObject = (myObject, myCriteria) => myObject.filter((obj) => Object.keys(myCriteria).every((c) => obj[c] === myCriteria[c]));
    const dataStr = JSON.stringify(data);
    const userFilteredData = findInObject(JSON.parse(dataStr),
      {
        user: username,
      });
    document.cookie = `category_director=${userFilteredData[0].category_director};domain=10.1.244.200;path=/`;
    document.cookie = `commercial_director=${userFilteredData[0].commercial_director};domain=10.1.244.200;path=/`;
    document.cookie = `buying_controller=${userFilteredData[0].buying_controller};domain=10.1.244.200;path=/`;
    document.cookie = `buyer=${userFilteredData[0].buyer};domain=10.1.244.200;path=/`;
    document.cookie = `junior_buyer=${userFilteredData[0].junior_buyer};domain=10.1.244.200;path=/`;
    document.cookie = `designation=${userFilteredData[0].designation};domain=10.1.244.200;path=/`;
    document.cookie = `login_timestamp=${userFilteredData[0].login_timestamp};domain=10.1.244.200;path=/`;
  } catch (err) {
    console.log('Some error happened, check LoginPage sagas');
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
