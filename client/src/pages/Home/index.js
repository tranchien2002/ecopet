import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Loading from '../../components/Loading';
import PetDeck from '../../components/Deck';
class Home extends Component {
  render() {
    const { tomo } = this.props;
    return <div>{tomo.web3 ? <PetDeck total={5} /> : <Loading />}</div>;
  }
}

const mapStatetoProps = state => {
  return {
    tomo: state.tomo
  };
};

export default compose(connect(mapStatetoProps))(Home);
