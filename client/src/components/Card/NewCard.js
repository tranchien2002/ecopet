import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Input } from 'reactstrap';
import './Card.css';

class NewCard extends React.Component {
  render() {
    return (
      <div className='col-md-4 card-item' onClick={this.props.onClick}>
        <Card>
          <CardHeader className='card-header'>
            <img alt='...' className='img-center img-fluid item-img ' src={this.props.src} />
          </CardHeader>
          <CardBody>
            <CardTitle>Name:</CardTitle>
            <Input type='text' placeholder='name' />
          </CardBody>
        </Card>
      </div>
    );
  }
}

export default NewCard;
