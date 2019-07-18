import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Input } from 'reactstrap';
import './Card.css';

class NewCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState({
      selected: !this.state.selected
    });
  }
  render() {
    let active = this.state.selected ? 'active' : '';
    return (
      <div className='col-md-4 card-item' onClick={this.handleClick}>
        <Card className={active}>
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
