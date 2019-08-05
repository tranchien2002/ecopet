import React from 'react';
import { Modal, ModalHeader, ModalBody, Input, Form, Button } from 'reactstrap';
import NewCard from '../Card/NewCard';
import store from 'store';
import * as actions from 'actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Pet from 'constants/PetInformation';

import './Modal.css';

class NewPetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: '',
      chosenPet: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick(pet) {
    await store.dispatch(
      actions.createNewPet(pet.type, pet.targetFund, pet.duration, this.state.purpose)
    );
    await store.dispatch(actions.getAllPets());
  }

  handleChange = (e) => {
    this.setState({ purpose: e.target.value });
  };

  render() {
    return (
      <div>
        <Modal className='modal-dialog' isOpen={this.props.isOpen} toggle={this.props.toggle}>
          <ModalHeader>Create New Pet</ModalHeader>
          <ModalBody>
            <div className='card-deck row'>
              {Pet.map((item, index) => (
                <NewCard
                  key={index}
                  onClick={() => this.setState({ chosenPet: item })}
                  src={item.src}
                  targetFund={item.targetFund}
                  duration={item.duration}
                />
              ))}
            </div>
            <div className='create-form'>
              <Form>
                <Input
                  type='string'
                  id='purpose'
                  maxLength={16}
                  placeholder='purpose'
                  onChange={this.handleChange}
                />
                <Button
                  color='success'
                  onClick={() => this.handleClick(this.state.chosenPet).then(this.props.toggle)}
                >
                  Create
                </Button>
              </Form>
            </div>
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    petList: state.newPets
  };
};
export default compose(connect(mapStateToProps))(NewPetModal);
