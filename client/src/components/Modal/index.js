import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewCard from '../Card/NewCard';
import './Modal.css';
import store from 'store';
import * as actions from 'actions';
class NewPetModal extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }
  async handleClick(type) {
    await store.dispatch(actions.createNewPet(type));
    await store.dispatch(actions.getAllPets());
  }

  render() {
    return (
      <div>
        <Modal className='modal-dialog' isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader>Create New Pet</ModalHeader>
          <ModalBody>
            <div className='card-deck row'>
              <NewCard
                onClick={() => this.handleClick(1).then(this.props.toggle)}
                src={require('assets/img/penguine.png')}
              />
              <NewCard
                onClick={() => this.handleClick(2).then(this.props.toggle)}
                src={require('assets/img/dragon.png')}
              />
              <NewCard
                onClick={() => this.handleClick(3).then(this.props.toggle)}
                src={require('assets/img/cat.png')}
              />
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}
export default NewPetModal;
