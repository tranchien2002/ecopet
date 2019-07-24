import React from 'react';
import PetCard from '../Card';
import DefaultCard from '../Card/DefaultCard';
import NewPetModal from '../Modal';
import './Deck.css';

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
          {this.props.deck.map((id) => (
            <PetCard key={id} age='50' size='30' />
          ))}
          <DefaultCard onClick={this.toggle} />
        </div>
      </div>
    );
  }
}
export default PetDeck;
