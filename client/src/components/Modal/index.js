import React from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Input, Form, Button } from 'reactstrap';
import store from 'store';
import * as actions from 'actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import Pet from 'constants/PetInformation';
import CarouselNewPet from 'components/CarouselNewPet';
import 'components/Modal/Modal.css';

class NewPetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      purpose: '',
      chosenPet: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  async handleClick() {
    let type = parseInt(
      document
        .querySelector('div.slick-slide.slick-active.slick-current div.item-pet')
        .getAttribute('data-type')
    );

    let pet = Pet.find((element) => {
      return element.type === type;
    });

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
            <div>
              <CarouselNewPet pets={Pet} />
            </div>
          </ModalBody>
          <ModalFooter>
            <div className='create-form'>
              <Form>
                <Input
                  type='string'
                  id='purpose'
                  maxLength={16}
                  placeholder='purpose'
                  onChange={this.handleChange}
                />
                <Button color='success' onClick={() => this.handleClick().then(this.props.toggle)}>
                  Create
                </Button>
                <Button color='secondary' onClick={this.props.toggle}>
                  Cancel
                </Button>
              </Form>
            </div>
          </ModalFooter>
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
