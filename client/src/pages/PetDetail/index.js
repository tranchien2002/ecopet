import React, { Component } from 'react';
import { Row, Col, Button, Form, Label, Input } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import JellyPet from 'components/JellyPet';
import store from 'store';
import * as actions from 'actions';

import './index.css';

class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      petInstance: null,
      sendValue: 0,
      withdrawValue: 0
    };

    this.feedPet = this.feedPet.bind(this);
    this.withDraw = this.withDraw.bind(this);
  }

  async componentDidMount() {
    await store.dispatch(actions.web3Connect());
    await store.dispatch(actions.instantiateContracts());
    await store.dispatch(actions.getAllPets());

    let Pet = await this.props.pets[this.props.match.params.address];
    console.log('Pet: ', Pet);
    this.setState({ petInstance: Pet });

    let amount = await Pet.methods.providentFund().call();
    this.setState({ providentFund: amount });
    // console.log('provident fund: ', amount);

    let time = await Pet.methods.growthTime().call();
    this.setState({ growthTime: time });
    // console.log('growth time: ', time);
  }

  handleSendChange = (e) => {
    this.setState({ sendValue: e.target.value });
  };

  feedPet = async (event) => {
    let Pet = this.state.petInstance;
    console.log('pet: ', Pet);
    Pet.methods
      .savingMoney(this.state.sendValue)
      .send({ from: this.props.tomo.account, value: this.state.sendValue * 10 ** 18 });
    event.preventDefault();
  };

  handleWithdrawChange = (e) => {
    this.setState({ withdrawValue: e.target.value });
  };

  withDraw = async (event) => {
    let Pet = this.state.petInstance;
    console.log('pet: ', Pet);
    Pet.methods.withdrawMoney(this.state.withdrawValue).send({ from: this.props.tomo.account });
    event.preventDefault();
  };

  render() {
    console.log('address pet: ', this.props.match.params.address);
    return (
      <div>
        <Row>
          <Col xs='9'>
            <JellyPet />
          </Col>
          <Col className='box_color' xs='3'>
            <div className='pet_info'>
              <p>
                <span>Growth Time: </span>
                <span id='growth_time'>{this.state.growthTime}</span>
                <span> seconds</span>
              </p>
              <p>
                <span>Provident Fund: </span>
                <span id='provident_fund'>{this.state.providentFund}</span>
                <span> TOMO</span>
              </p>
            </div>
            <hr />
            <div className='manipulation_form'>
              <Form inline onSubmit={this.feedPet}>
                <Label className='mr-sm-2' />
                <Input
                  type='number'
                  id='feedAmount'
                  placeholder='feed amount'
                  onChange={this.handleSendChange}
                />
                <Button color='success' type='submit'>
                  Feed
                </Button>
              </Form>
              <Form inline onSubmit={this.withDraw}>
                <Label className='mr-sm-2' />
                <Input
                  type='number'
                  id='withdrawAmount'
                  placeholder='withdraw amount'
                  onChange={this.handleWithdrawChange}
                />
                <Button color='primary' type='submit'>
                  Withdraw
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tomo: state.tomo,
    pets: state.tomo.pets
  };
};

export default compose(connect(mapStateToProps))(PetDetail);
