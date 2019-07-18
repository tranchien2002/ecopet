import React from 'react';
import { Modal, ModalHeader, ModalBody, Button, ModalFooter } from 'reactstrap';
import NewCard from '../Card/NewCard';
import './Modal.css';
class NewPetModal extends React.Component {
  render() {
    return (
      <div>
        <Modal className='modal-dialog' isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader>Create New Pet</ModalHeader>
          <ModalBody>
            <div className='card-deck row'>
              <NewCard src='https://i.redd.it/ieed5vswxeu21.jpg' />
              <NewCard src='https://honeysanime.com/wp-content/uploads/2016/05/Chi%E2%80%99s-Sweet-Home-Wallpaper.jpg' />
              <NewCard src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjbH3T1w7KuoctUWU8_Jetiw_k8KSXRQgl9YAM-G-dbUOuTqDt' />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={this.props.toggle}>
              Do Something
            </Button>{' '}
            <Button color='secondary' onClick={this.props.toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}
export default NewPetModal;
