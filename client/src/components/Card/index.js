import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Progress } from 'reactstrap';
import './Card.scss';
import { Link } from 'react-router-dom';
class PetCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      src: require('assets/img/penguine.png')
    };
  }

  componentDidMount() {
    if (this.props.type === 1) {
      this.setState({
        src: require('assets/img/dragon.png')
      });
    }
  }
  render() {
    return (
      <div className='col-md-4 card-item'>
        <Link to={`/pets/${this.props.address}`}>
          <Card>
            <CardHeader className='card-header'>
              <img alt='...' className='img-center img-fluid item-img' src={this.state.src} />
            </CardHeader>
            <CardBody>
              <CardTitle>Pet Address: {this.props.name}</CardTitle>
              <Progress animated color='danger' value={this.props.age}>
                Age
              </Progress>
              <br />
              <Progress animated color='success' value={this.props.size}>
                Size
              </Progress>
            </CardBody>
          </Card>
        </Link>
      </div>
    );
  }
}

export default PetCard;
