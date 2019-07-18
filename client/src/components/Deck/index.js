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
    const deck = [];
    for (let i = 0; i < this.props.total; i++) {
      deck.push(<PetCard key={i} age='50' size='30' name='Corgi' />);
    }
    deck.push(<DefaultCard key={deck.length + 1} onClick={this.toggle} />);
    return (
      <div className='container'>
        <NewPetModal isOpen={this.state.isOpen} toggle={this.toggle} />
        <div className='card-deck-container row'>{deck}</div>
      </div>
    );
  }
}
export default PetDeck;
