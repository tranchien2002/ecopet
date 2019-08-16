import React from 'react';
import CarouselCard from '../CarouselCard';
import DefaultCard from '../Card/DefaultCard';
import NewPetModal from '../Modal';
import './Deck.css';
import { compose } from 'redux';
import { connect } from 'react-redux';

class PetDeck extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div className='container-custom'>
        <NewPetModal isOpen={this.state.isOpen} toggle={this.toggle} />
        <div className='box-button-create'>
          {this.props.pets.length !== 0 ? (
            <div>
              <div className='row margin-0 header-create'>
                <div className='infor-pet col-8'>
                  <h3 className='infor-wallet'>Information </h3>
                  <p> Address : </p>
                  <p> Amount: </p>
                </div>
                <div className='btn-create-pet col-4'>
                  <span className='pushme'>
                    <span className='inner' onClick={this.toggle}>
                      <img alt='pet' src={require('assets/img/784101.png')} />{' '}
                    </span>
                  </span>
                </div>
              </div>
              <div className='slide-custom'>
                <CarouselCard pets={this.props.pets} />
              </div>
            </div>
          ) : (
            <div className='card-create-pet'>
              <DefaultCard onClick={this.toggle} />
            </div>
          )}
        </div>
      </div>
    );
  }
}
const mapStatetoProps = (state) => {
  return {
    pets: state.tomo.pets
  };
};
export default compose(connect(mapStatetoProps))(PetDeck);
