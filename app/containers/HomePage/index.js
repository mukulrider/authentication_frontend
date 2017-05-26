/*
 *
 * HomePage
 *
 */

import React, { PropTypes } from 'react';
import { Jumbotron, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import makeSelectHomePage from './selectors';
import Invoice from '../../assets/images/invoice.svg';
import Tag from '../../assets/images/tag.svg';
import Checklist from '../../assets/images/checklist.svg';
import './style.scss';

export class HomePage extends React.PureComponent {
  // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <div>
        <Helmet
          title="HomePage"
          meta={[
            { name: 'description', content: 'Description of HomePage' },
          ]}
        />
        <div style={{fontFamily: 'Tesco', fontSize: '18px', textDecoration: 'none'}}>
          <Jumbotron>
            <h1 style={{fontFamily: 'Tesco'}} >
              Welcome to Compass Tool (beta)
            </h1>
            <p style={{ fontFamily: 'Tesco' }}>
              Please navigate to below modules to start exploring
            </p>
          </Jumbotron>

          <div className="row moduleRow">
            <div className="col-xs-4 moduleIconDiv">
              <div className="moduleCircle">
                <a href="http://dvcmpweb00001uk.dev.global.tesco.org:81/sales/executive/" style={{textDecoration:'None'}}>
                  <img
                    src={Invoice} alt="invoice"
                    className="moduleIcon"/>
                  <br />
                  <div className="moduleHeading">
                      Reporting
                  </div>
                </a>
              </div>
              </div>

            <div className="col-xs-4 moduleIconDiv">
              <div className="moduleCircle">
                <a href="http://dvcmpweb00001uk.dev.global.tesco.org:83/pricing/" style={{textDecoration:'None'}}>
                <img
                  src={Tag} alt="tag"
                  className="moduleIcon"/>
                <br />
                <div className="moduleHeading">
                  Pricing
                </div>
                </a>
              </div>
            </div>

            <div className="col-xs-4 moduleIconDiv">
              <div className="moduleCircle">
                <a href="http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging/" style={{textDecoration:'None'}}>
                <img
                  src={Checklist} alt="checklist"
                  className="moduleIcon"/>
                <br />
                <div className="moduleHeading">
                  Ranging
                </div>
                </a>
              </div>
            </div>

          </div>
        </div>
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
