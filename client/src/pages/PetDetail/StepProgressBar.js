import React, { Component } from 'react';
import './index.css';
import ProgressBar from './progress-bar';
import Step from './progress-bar/tracking-step';

class StepProgressBar extends Component {
  render() {
    let steps = [];
    for (let i = 0; i < this.props.step; i++) {
      steps.push(
        <Step transition='scale'>
          {({ accomplished }) => (
            <img
              alt=''
              style={{ filter: `grayscale(${accomplished ? 0 : 80}%)` }}
              width='30'
              src={this.props.img}
            />
          )}
        </Step>
      );
    }
    return (
      <ProgressBar
        percent={this.props.percent}
        filledBackground='linear-gradient(to right, orange, red)'
      >
        {steps}
      </ProgressBar>
    );
  }
}

export default StepProgressBar;
