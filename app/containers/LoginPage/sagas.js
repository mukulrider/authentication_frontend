import { selectLoginPageDomain } from 'containers/LoginPage/selectors';
import { take, call, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import {
  LOGIN,
  USER_PARAM,
} from './constants';

const frontendHostName = '172.20.246.60';
const frontendHostPort = '3000';
const backendHostName = '172.20.246.60';
const backendHostPort = '8000';

/* GENERATE LOGIN TOKEN */
export function* generateLogin() {
  const login = yield select(selectLoginPageDomain());
  const username = login.get('username');
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
    window.location = `http://${frontendHostName}:${frontendHostPort}/`;
  } catch (err) {
    window.location = `http://${backendHostName}:${backendHostPort}/login/`;
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
    const data = yield call(request,
      `http://${backendHostName}:${backendHostPort}/api/obtain-user-params/`);
    const findInObject = (myObject, myCriteria) => myObject.filter((obj) => Object.keys(myCriteria).every((c) => obj[c] === myCriteria[c]));
    const dataStr = JSON.stringify(data);
    const userFilteredData = findInObject(JSON.parse(dataStr),
      {
        user: username,
      });
    document.cookie = `user=${userFilteredData[0].user};domain=${frontendHostName};path=/`;
    document.cookie = `key=${userFilteredData[0].key};domain=${frontendHostName};path=/`;
    document.cookie = `first_name=${userFilteredData[0].first_name};domain=${frontendHostName};path=/`;
    document.cookie = `middle_name=${userFilteredData[0].middle_name};domain=${frontendHostName};path=/`;
    document.cookie = `last_name=${userFilteredData[0].last_name};domain=${frontendHostName};path=/`;
    document.cookie = `email_id=${userFilteredData[0].email_id};domain=${frontendHostName};path=/`;
    document.cookie = `tpx_id=${userFilteredData[0].tpx_id};domain=${frontendHostName};path=/`;
    document.cookie = `designation=${userFilteredData[0].designation};domain=${frontendHostName};path=/`;
    document.cookie = `category_director=${userFilteredData[0].category_director};domain=${frontendHostName};path=/`;
    document.cookie = `commercial_director=${userFilteredData[0].commercial_director};domain=${frontendHostName};path=/`;
    document.cookie = `buying_controller=${userFilteredData[0].buying_controller};domain=${frontendHostName};path=/`;
    document.cookie = `buyer=${userFilteredData[0].buyer};domain=${frontendHostName};path=/`;
    document.cookie = `junior_buyer=${userFilteredData[0].junior_buyer};domain=${frontendHostName};path=/`;
    document.cookie = `product_sub_group_description=${userFilteredData[0].product_sub_group_description};domain=${frontendHostName};path=/`;
    document.cookie = `login_timestamp=${userFilteredData[0].login_timestamp};domain=${frontendHostName};path=/`;
  } catch (err) {
    alert('Some error happened, check LoginPage sagas');
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
