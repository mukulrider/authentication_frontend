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
          <Col xs={12} md={4}>
            <div style={{ textAlign: 'center'}}>
              <a href="">
                <img
                  src={Invoice} alt="invoice"
                  style={{ width: '20%', margin: '0 auto', display: 'block' }}
                />
                <br />
                <a
                  href="http://dvcmpweb00001uk.dev.global.tesco.org:81/sales/executive/"
                  style={{ fontFamily: 'Tesco', fontsize: '25px', textDecoration: 'None' }}
                >
                    Reporting
                  </a>
              </a>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Tag} alt="tag"
                style={{ width: '20%', margin: '0 auto', display: 'block' }}
              />
              <br />
              <a href="http://dvcmpweb00001uk.dev.global.tesco.org:83/pricing/">
                Pricing
              </a>
            </div>
          </Col>
          <Col xs={12} md={4}>
            <div style={{ textAlign: 'center' }}>
              <img
                src={Checklist} alt="checklist"
                style={{ width: '20%', margin: '0 auto', display: 'block' }}
              />
              <br />
              <a href="http://dvcmpweb00001uk.dev.global.tesco.org:82/ranging/">
                Ranging
              </a>
            </div>
          </Col>
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
