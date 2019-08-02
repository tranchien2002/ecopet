import React from 'react';
import { Card, CardHeader } from 'reactstrap';
import './Card.scss';

class NewCard extends React.Component {
  render() {
    return (
      <div className='col-md-4 card-item'>
        <Card onClick={this.props.onClick}>
          <CardHeader className='card-header'>
            <img alt='...' className='img-center img-fluid item-img ' src={this.props.src} />
          </CardHeader>
        </Card>
      </div>
    );
  }
}

export default NewCard;
