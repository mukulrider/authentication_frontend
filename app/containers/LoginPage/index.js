/*
 *
 * LoginPage
 *
 */

import Button from 'components/button';
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectLoginPage from './selectors';
import { username, password, login, fetchUserParams } from './actions';

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="LoginPage"
          meta={[
            { name: 'description', content: 'Description of LoginPage' },
          ]}
        />
        <div style={{ fontSize: '14px' }}>
          <div className="row">
            <div className="col-xs-3"></div>
            <div className="col-xs-6">
              <h1>Login</h1>
              <h3>Username</h3>
              <input
                type="text" value={this.props.LoginPage.username}
                name="username" placeholder="Username"
                onChange={(e) => {
                  this.props.onUsername(e.target.value);
                }}
              />
              <br />
              <h3>Password</h3>
              <input
                type="password"
                value={this.props.LoginPage.password}
                name="password" placeholder="Password"
                onChange={(e) => {
                  this.props.onPassword(e.target.value);
                }}
              />
              <br />
              <Button
                buttonType={'primary'} onClick={() => {
                  this.props.onLogin();
                  this.props.onLoginSuccessUserParam();
                }}
              >Sign In</Button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

LoginPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  LoginPage: makeSelectLoginPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    onUsername: (e) => dispatch(username(e)),
    onPassword: (e) => dispatch(password(e)),
    onLogin: (e) => dispatch(login(e)),
    onLoginSuccessUserParam: (e) => dispatch(fetchUserParams(e)),
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
