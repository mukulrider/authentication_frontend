/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';

export class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="HomePage"
          meta={[
            { name: 'description', content: 'Description of HomePage' },
          ]}
        />
        <h1>I'm coming Home! I'm coming Home</h1>
        <h3> -- Yours sincerely, Home Page</h3>
      </div>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  HomePage: makeSelectHomePage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
