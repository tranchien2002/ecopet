import React, { Component } from 'react';
import { Row, Col, Button, Form, Label, Input, Progress } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'actions';
import * as createjs from 'createjs-module';
import StepProgressBar from './StepProgressBar';
import petWallet from 'contracts/PetWallet.json';
import Pet from 'constants/Pet';
import { PetAction } from 'constants/PetAction';

import './index.css';

class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      targetFund: 0,
      duration: 0,
      petInstance: null,
      type: 0,
      sendValue: '',
      withdrawValue: '',
      progress: 0,
      action: PetAction.DEFAULT,
      scale: 1,
      xCoordinate: 700,
      yCoordinate: 500
    };

    this.tick = this.tick.bind(this);
    this.feedPet = this.feedPet.bind(this);
    this.withDraw = this.withDraw.bind(this);
    this.action = this.action.bind(this);
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
    this.stage = new createjs.Stage('canvas');
    this.getPetInfo();
  }

  async getPetInfo() {
    let [type, providentFund, growthTime, targetFund, duration] = Object.values(
      await this.state.petInstance.methods.getInfomation().call()
    );
    this.setState({ type, providentFund, growthTime, targetFund, duration });
    this.getProgress();
    this.getSize();
    this.action();
  }

  getProgress() {
    let progress = (this.state.growthTime / this.state.duration) * 100;
    let progressArray = Pet[this.state.type].progress;
    for (let element of progressArray) {
      if (progress <= element.milestone) {
        this.setState({
          progress: element.index
        });
        break;
      }
    }
  }

  getSize() {
    let size = (this.state.providentFund / this.state.targetFund) * 100;
    let sizeArray = Pet[this.state.type].size;
    for (let element of sizeArray) {
      if (size >= element.milestone) {
        this.setState({
          scale: element.scale
        });
      }
    }
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
          sendValue: '',
          action: PetAction.FEED
        });
        this.action();
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
        this.setState({ withdrawValue: '', action: PetAction.WITHDRAW });
        this.action();
      });
  };

  action() {
    this.stage.removeAllChildren();
    let petAction = new createjs.SpriteSheet(
      Pet[this.state.type].progress[this.state.progress].item[this.state.action]
    );
    let petSprite = new createjs.Sprite(petAction);
    this.setState({ petSprite: petSprite });
    petSprite.x = this.state.xCoordinate;
    petSprite.y = this.state.yCoordinate;
    petSprite.scaleX = this.state.scale;
    petSprite.scaleY = this.state.scale;
    this.stage.addChild(petSprite);
    petSprite.gotoAndPlay();
    createjs.Ticker.addEventListener('tick', this.tick);
  }

  tick() {
    let petSprite = this.state.petSprite;
    this.stage.update();
    if (this.state.action === PetAction.FEED) {
      if (petSprite.x < 0) {
        petSprite.x = 0;
        petSprite.scaleX = -1 * this.state.scale;
      } else if (petSprite.x > this.stage.canvas.width) {
        petSprite.x = this.stage.canvas.width;
        petSprite.scaleX = 1 * this.state.scale;
      }
      petSprite.scaleX > 0 ? (petSprite.x -= 10) : (petSprite.x += 10);
      this.setState({ xCoordinate: petSprite.x });
    }

    createjs.Ticker.framerate = 5;
  }

  render() {
    return (
      <div>
        <Row>
          <Col xs='9'>
            <canvas id='canvas' width='1000px' height='800px' />
          </Col>
          <Col xs='3'>
            <div className='pet_tracking'>
              <div className='growth_tracking'>
                <p>Growth Tracking</p>
                <StepProgressBar
                  percent={(this.state.growthTime / this.state.duration) * 100}
                  step={Pet[this.state.type].progress.length}
                  type={this.state.type}
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
