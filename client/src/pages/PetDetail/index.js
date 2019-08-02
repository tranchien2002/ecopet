import React, { Component } from 'react';
import { Row, Col, Button, Form, Label, Input } from 'reactstrap';
import { compose } from 'redux';
import { connect } from 'react-redux';
import store from 'store';
import * as actions from 'actions';
import * as createjs from 'createjs-module';
import './index.css';

class PetDetail extends Component {
  constructor() {
    super();

    this.state = {
      growthTime: 0,
      providentFund: 0,
      petInstance: null,
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
    await store.dispatch(actions.getAllPets());

    const Pet = await this.props.pets[this.props.match.params.address].instance;
    this.setState({ petInstance: Pet });
    this.getPetInfo();
    this.stage = new createjs.Stage('canvas');
    this.idle();
  }
  async getPetInfo() {
    let Pet = this.state.petInstance;
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
      });
  };

  walk() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_walk = new createjs.SpriteSheet({
      images: [require('assets/sprites/whiteYeti/walk.png')],
      frames: [
        [1, 1, 104, 111, 0, 0, 0],
        [107, 1, 100, 107, 0, 0, 0],
        [209, 1, 121, 104, 0, 0, 0],
        [332, 1, 112, 104, 0, 0, 0]
      ],

      animations: {
        'walk(1)': { frames: [0] },
        'walk(2)': { frames: [1] },
        'walk(3)': { frames: [3] },
        'walk(4)': { frames: [2] }
      }
    });
    let yetiInstance = new createjs.Sprite(yeti_walk);
    yetiInstance.gotoAndPlay('walk');
    console.log(this.stage);
    console.log('instance', yetiInstance);

    // debugger;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  idle() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_walk = new createjs.SpriteSheet({
      images: [require('assets/sprites/whiteYeti/idle.png')],
      frames: [[0, 0, 100, 107, 0, 0, 0], [100, 0, 100, 107, 0, 0, 0], [200, 0, 100, 107, 0, 0, 0]],

      animations: {
        8: { frames: [0] },
        9: { frames: [1] },
        10: { frames: [2] }
      }
    });

    let yetiInstance = new createjs.Sprite(yeti_walk);
    yetiInstance.gotoAndPlay('idle');
    yetiInstance.x = 200;
    yetiInstance.y = 0;

    // debugger;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  dead() {
    this.stage.removeAllChildren();
    this.stage.update();
    let yeti_walk = new createjs.SpriteSheet({
      images: [require('assets/sprites/whiteYeti/dead.png')],

      framerate: 20,
      frames: [
        [0, 0, 100, 107, 0, 0, 0],
        [174, 0, 113, 93, 0, 0, 0],
        [348, 0, 115, 93, 0, 0, 0],
        [522, 0, 174, 64, 0, 0, 0],
        [696, 0, 172, 63, 0, 0, 0],
        [870, 0, 170, 63, 0, 0, 0],
        [1044, 0, 170, 63, 0, 0, 0]
      ],

      animations: {
        'dead[1]': { frames: [0] },
        'dead[2]': { frames: [1] },
        'dead[3]': { frames: [2] },
        'dead[4]': { frames: [3] },
        'dead[5]': { frames: [4] },
        'dead[6]': { frames: [5] },
        'dead[7]': { frames: [6] }
      }
    });

    let yetiInstance = new createjs.Sprite(yeti_walk);
    yetiInstance.gotoAndPlay('dead');
    yetiInstance.x = 400;
    yetiInstance.y = 0;

    // debugger;
    this.stage.addChild(yetiInstance);
    createjs.Ticker.addEventListener('tick', this.tick);
  }
  tick() {
    createjs.Ticker.framerate = 5;
    this.stage.update();
    console.log('1');
  }
  s;
  render() {
    return (
      <div>
        <Row>
          <Col xs='9'>
            <canvas id='canvas' width='800' height='400' />;
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
