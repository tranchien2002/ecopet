import React, { Component } from 'react';
import { Row, Col, Button, Form, Label, Input, Progress } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'actions';
import * as createjs from 'createjs-module';
import StepProgressBar from './StepProgressBar';
import petWallet from 'contracts/PetWallet.json';
import { Pet } from 'constants/Pet';
import { PetAction } from 'constants/PetAction';

import './index.css';

class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      duration: 0,
      targetFund: 0,
      petInstance: null,
      type: 0,
      sendValue: '',
      withdrawValue: '',
      progress: 0
    };

    this.tick = this.tick.bind(this);
    this.feedPet = this.feedPet.bind(this);
    this.withDraw = this.withDraw.bind(this);
  }

  async componentDidMount() {
    await store.dispatch(actions.web3Connect());
    await store.dispatch(actions.instantiateContracts());
    await store.dispatch(actions.getAllPetsAddress());
    let PetInstance = await new this.props.tomo.web3.eth.Contract(
      petWallet.abi,
      this.props.petsAddress[this.props.match.params.address]
    );
    this.setState({ petInstance: PetInstance });
    await this.getPetInfo();
    this.stage = new createjs.Stage('canvas');
    this.setState({ action: PetAction.DEFAULT });
    this.action(PetAction.DEFAULT);
  }

  async getPetInfo() {
    let Pet = this.state.petInstance;
    let petInfo = await Pet.methods.getInfomation().call();
    this.setState({
      providentFund: petInfo[1],
      growthTime: petInfo[2],
      targetFund: petInfo[3],
      duration: petInfo[4]
    });
  }

  handleSendChange = (e) => {
    this.setState({ sendValue: e.target.value });
  };

  feedPet = async (event) => {
    event.preventDefault();
    let PetInstance = this.state.petInstance;
    await PetInstance.methods
      .savingMoney(this.state.sendValue)
      .send({ from: this.props.tomo.account, value: this.state.sendValue * 10 ** 18 })
      .then(async () => {
        this.getPetInfo();
        this.setState({
          sendValue: ''
        });
        this.action(PetAction.FEED);
      });
  };

  handleWithdrawChange = (e) => {
    this.setState({ withdrawValue: e.target.value });
  };

  withDraw = async (event) => {
    event.preventDefault();
    let PetInstance = this.state.petInstance;
    await PetInstance.methods
      .withdrawMoney(this.state.withdrawValue)
      .send({ from: this.props.tomo.account })
      .then(async () => {
        this.getPetInfo();
        this.setState({ withdrawValue: '' });
        this.action(PetAction.WITHDRAW);
      });
  };

  action(action) {
    this.stage.removeAllChildren();
    let petAction = new createjs.SpriteSheet(Pet[this.state.type][this.state.progress][action]);
    let petInstance = new createjs.Sprite(petAction);
    this.stage.addChild(petInstance);
    petInstance.gotoAndPlay();
    createjs.Ticker.addEventListener('tick', this.tick);
  }

  tick() {
    this.stage.update();
    createjs.Ticker.framerate = 5;
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs='9'>
            <canvas id='canvas' width='1000px' />
          </Col>
          <Col xs='3'>
            <div className='pet_tracking'>
              <div className='growth_tracking'>
                <p>Growth Tracking</p>
                <StepProgressBar
                  percent={(this.state.growthTime / this.state.duration) * 100}
                  step={5}
                  img='https://image.flaticon.com/icons/png/512/1995/1995002.png'
                />
              </div>
              <div className='fund_tracking'>
                <p>Fund Tracking</p>
                <Progress
                  animated
                  value={(this.state.providentFund / this.state.targetFund) * 100}
                  color='warning'
                >
                  {this.state.providentFund} / {this.state.targetFund} TOMO
                </Progress>
              </div>
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
                  value={this.state.sendValue}
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
                  value={this.state.withdrawValue}
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
    petsAddress: state.tomo.petsAddress
  };
};

export default compose(connect(mapStateToProps))(PetDetail);
