import React from 'react';
import PetCard from '../Card';
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
      <div className='container'>
        <NewPetModal isOpen={this.state.isOpen} toggle={this.toggle} />
        <div className='card-deck-container row'>
          {this.props.pets.map((item, index) => (
            <PetCard
              key={index}
              age={item.time / 3600}
              size={item.amount}
              address={index}
              type={item.id}
            />
          ))}
          <DefaultCard onClick={this.toggle} />
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
