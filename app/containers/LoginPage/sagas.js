import { loginSuccess, loginError } from 'containers/LoginPage/actions';
import { selectLoginPageDomain } from 'containers/LoginPage/selectors';
import { take, call, put, select, cancel, takeLatest } from 'redux-saga/effects';
import { LOCATION_CHANGE } from 'react-router-redux';
import request from 'utils/request';
import { LOGIN } from './constants';

/* GENERATE SIDE FILTER*/
export function* generateLogin() {
  const login = yield select(selectLoginPageDomain());
  console.log(login.get('username'));
  console.log(login.get('password'));
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
    // yield put(fetchScenarioDataSuccess(data));
  } catch (err) {
    window.location = '/login/';
  }
}

export function* doLogin() {
  const watcher = yield takeLatest(LOGIN, generateLogin);
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}


// All sagas to be loaded
export default [
  doLogin,
];
