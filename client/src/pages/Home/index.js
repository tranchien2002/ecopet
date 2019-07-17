import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import PetDeck from '../../components/Card/Card';
class Home extends Component {
  render() {
    const { tomo } = this.props;
    return <div>{tomo.web3 ? <PetDeck name='Corgi' age ='50' size ='30'  /> : <Loading />}</div>;
  }
}

const mapStatetoProps = state => {
  return {
    tomo: state.tomo
  };
};

export default compose(connect(mapStatetoProps))(Home);
