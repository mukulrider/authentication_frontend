/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a necessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';
import Footer from 'components/footer';
import Header from 'components/header';
import styles from './style.scss';

export default class App extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    children: React.PropTypes.node,
  };

  componentWillMount() {
    const frontendHostName = 'dvcmpweb00001uk.dev.global.tesco.org';
    const frontendHostPort = '80';
    const getCookie = (name) => {
      let outValue = '';
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) {
        outValue = parts.pop().split(';').shift();
      } else {
        outValue = 0;
      }
      return outValue;
    };
    const token = getCookie('token');
    if (token && this.props.location.pathname.includes('login')) {
      window.location = `http://${frontendHostName}:${frontendHostPort}/`;
    }
    if (!token && !this.props.location.pathname.includes('login')) {
      window.location = `http://${frontendHostName}:${frontendHostPort}/login/`;
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid" style={{ marginTop: '120px' }}>
          {React.Children.toArray(this.props.children)}
        </div>
        <Footer />
      </div>
    );
  }
}
