import React from 'react';
import { Modal, ModalHeader, ModalBody } from 'reactstrap';
import NewCard from '../Card/NewCard';
import './Modal.css';
import store from 'store';
import * as actions from 'actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
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
              {Object.keys(this.props.petList).map((item, index) => (
                <NewCard
                  key={item}
                  onClick={() => this.handleClick(item).then(this.props.toggle)}
                  src={this.props.petList[item]}
                />
              ))}
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
