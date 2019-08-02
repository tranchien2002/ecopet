import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Progress } from 'reactstrap';
import './Card.scss';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
const PetCard = (props) => {
  return (
    <div className='col-md-4 card-item'>
      <Link to={`/pets/${props.address}`}>
        <Card>
          <CardHeader className='card-header'>
            <img
              alt='...'
              className='img-center img-fluid item-img'
              src={props.petList[props.type]}
            />
          </CardHeader>
          <CardBody>
            <CardTitle>Name: </CardTitle>
            <Progress animated color='danger' value={props.age}>
              Age
            </Progress>
            <br />
            <Progress animated color='success' value={props.size}>
              Size
            </Progress>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    petList: state.newPets
  };
};
export default compose(connect(mapStateToProps))(PetCard);
