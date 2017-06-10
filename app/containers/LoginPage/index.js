/*
 *
 * LoginPage
 *
 */

import Button from 'components/button';
import Panel from 'components/panel';
import FormHeader from 'components/form_header';
import React, {PropTypes} from 'react';
import {Col} from 'react-bootstrap';
import {connect} from 'react-redux';
import Helmet from 'react-helmet';
import {createStructuredSelector} from 'reselect';
import makeSelectLoginPage from './selectors';
import {username, password, login, fetchUserParams} from './actions';
import Header from "../../components/header/index";

export class LoginPage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="LoginPage"
          meta={[
            {
              name: 'description',
              content: 'Necessary Login Page for using the tool',
            },
          ]}
        />
        <div style={{fontFamily: 'Tesco', }}>
          <div className="row">
            <div className="col-xs-12 col-md-4 col-md-offset-6 col-sm-8 col-sm-offset-2">
              <FormHeader
                title="Sign in to your account"
              />
              <p style={{ fontFamily: 'Tesco'}} >Please use your Tesco GLOBAL-DEV account to login below</p>
              <Panel>
                <form >
                  <h4 className="text-left"><b>Username</b></h4>
                  <input
                    style={{ fontSize: '16px'}}
                    type="text"
                    name="username"
                    placeholder="a-tpx_id@dev.global.tesco.org"
                    className="login-form-input"
                    value={this.props.LoginPage.username}
                    onChange={(e) => {
                      this.props.onUsername(e.target.value);
                    }}
                  />
                  <br />
                  <h4 className="text-left"><b>Password</b></h4>
                  <input
                    style={{ fontSize: '16px'}}
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="login-form-input"
                    value={this.props.LoginPage.password}
                    onChange={(e) => {
                      this.props.onPassword(e.target.value);
                    }}
                  />
                  <br />
                  <Button
                    type="submit"
                    buttonType={'primary'}
                    onClick={(e) => {
                      e.preventDefault();
                      localStorage.clear();
                      const frontendHostName = '10.1.181.100';
                      document.cookie = 'token'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      document.cookie = 'user'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      document.cookie = 'designation'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      document.cookie = 'buying_controller'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      document.cookie = 'buyer'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      document.cookie = 'login_timestamp'.concat(`=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain=${frontendHostName};Path=/;`);
                      this.props.onLogin();
                      // this.props.onLoginSuccessUserParam();
                    }}
                  >Sign In</Button>
                </form>
              </Panel>
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
