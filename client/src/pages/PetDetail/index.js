import React, { Component } from 'react';
import { Row, Col, Button, Form, Label, Input } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'actions';
import * as createjs from 'createjs-module';
import './index.css';
import petWallet from 'contracts/PetWallet.json';
import { Type } from 'constants/PetType';
class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      petInstance: null,
      type: 0,
      sendValue: 0,
      withdrawValue: 0,
      action: ''
    };
    this.tick = this.tick.bind(this);
    this.feedPet = this.feedPet.bind(this);
    this.withDraw = this.withDraw.bind(this);
  }

  async componentDidMount() {
    await store.dispatch(actions.web3Connect());
    await store.dispatch(actions.instantiateContracts());
    await store.dispatch(actions.getAllPetsAddress());
    const Pet = await new this.props.tomo.web3.eth.Contract(
      petWallet.abi,
      this.props.petsAddress[this.props.match.params.address]
    );
    this.setState({ petInstance: Pet });
    await this.getPetInfo();
    this.stage = new createjs.Stage('canvas');
    this.walk();
  }
  async getPetInfo() {
    let Pet = this.state.petInstance;
    let id = await Pet.methods.petId().call();
    this.setState({ type: id });
    let amount = await Pet.methods.providentFund().call();
    this.setState({ providentFund: amount });

    let time = await Pet.methods.growthTime().call();
    this.setState({ growthTime: time });
  }

  handleSendChange = (e) => {
    this.setState({ sendValue: e.target.value });
  };

  feedPet = async (event) => {
    event.preventDefault();
    let Pet = this.state.petInstance;
    await Pet.methods
      .savingMoney(this.state.sendValue)
      .send({ from: this.props.tomo.account, value: this.state.sendValue * 10 ** 18 })
      .then(async () => {
        this.getPetInfo();
        this.walk();
      });
  };

  handleWithdrawChange = (e) => {
    this.setState({ withdrawValue: e.target.value });
  };

  withDraw = async (event) => {
    event.preventDefault();
    let Pet = this.state.petInstance;
    await Pet.methods
      .withdrawMoney(this.state.withdrawValue)
      .send({ from: this.props.tomo.account })
      .then(async () => {
        this.getPetInfo();
        this.dead();
        this.setState({ withdrawValue: '' });
      });
  };

  walk() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_walk = new createjs.SpriteSheet(Type[this.state.type].walk);
    let yetiInstance = new createjs.Sprite(yeti_walk);
    yetiInstance.gotoAndPlay('walk');
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  idle() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_idle = new createjs.SpriteSheet(Type[this.state.type].idle);

    let yetiInstance = new createjs.Sprite(yeti_idle);
    yetiInstance.gotoAndPlay('idle');
    yetiInstance.x = 200;
    yetiInstance.y = 0;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  dead() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_dead = new createjs.SpriteSheet(Type[this.state.type].dead);

    let yetiInstance = new createjs.Sprite(yeti_dead);
    yetiInstance.gotoAndPlay('dead');
    yetiInstance.x = 400;
    yetiInstance.y = 0;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  attack() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_attack = new createjs.SpriteSheet(Type[this.state.type].idle);

    let yetiInstance = new createjs.Sprite(yeti_attack);
    yetiInstance.gotoAndPlay('dead');
    yetiInstance.x = 400;
    yetiInstance.y = 0;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  tick() {
    createjs.Ticker.framerate = 5;
    this.stage.update();
  }
  render() {
    return (
      <div>
        <Row>
          <Col xs='9'>
            <canvas id='canvas' width='800' height='400' />
          </Col>
          <Col xs='3'>
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
