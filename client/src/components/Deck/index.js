import React from 'react';
import PetCard from '../Card';
import DefaultCard from '../Card/DefaultCard';
import './Deck.css';
const PetDeck = (props) => {
  const deck = [];
  for (let i = 0; i < props.total; i++) {
    deck.push(<PetCard age='50' size='30' name='Corgi' />);
  }
  deck.push(<DefaultCard />);
  return (
    <div className='container'>
      <div className='card-deck-container row'>{deck}</div>
    </div>
  );
};
export default PetDeck;
