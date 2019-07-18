import React, { Component } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import JellyPet from '../../components/JellyPet';
class PetDetail extends Component {
  render() {
    console.log(this.props.match.params.address);
    return <JellyPet />;
  }
}
const mapStateToProps = state => {
  return {
    tomo: state.tomo
  };
};

export default compose(connect(mapStateToProps))(PetDetail);
