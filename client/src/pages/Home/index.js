import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';

class Home extends Component {
  render() {
    const { tomo } = this.props;
    return <div>{tomo.web3 ? <h1>hello world</h1> : <Loading />}</div>;
  }
}

const mapStatetoProps = state => {
  return {
    tomo: state.tomo
  };
};

export default compose(connect(mapStatetoProps))(Home);
