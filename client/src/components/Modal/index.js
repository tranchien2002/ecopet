import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
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
                onClick={() => this.handleClick(1)}
                src='https://i.redd.it/ieed5vswxeu21.jpg'
              />
              <NewCard
                onClick={() => this.handleClick(2)}
                src='https://honeysanime.com/wp-content/uploads/2016/05/Chi%E2%80%99s-Sweet-Home-Wallpaper.jpg'
              />
              <NewCard
                onClick={() => this.handleClick(3)}
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbH3T1w7KuoctUWU8_Jetiw_k8KSXRQgl9YAM-G-dbUOuTqDt'
              />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='danger' onClick={this.props.toggle}>
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default NewPetModal;
