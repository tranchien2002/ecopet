import React from 'react';
import { Card, CardTitle, CardBody, CardHeader, Progress } from 'reactstrap';
import './Card.scss';
import { Link } from 'react-router-dom';
import Pet from 'constants/PetInformation';
const PetCard = (props) => {
  return (
    <div className='col-md-4 card-item'>
      <Link to={`/pets/${props.index}`}>
        <Card>
          <CardHeader className='card-header'>
            <img
              alt='...'
              className='img-center img-fluid item-img'
              src={Pet[props.pet.id - 1].src}
            />
          </CardHeader>
          <CardBody>
            <CardTitle>{props.name} </CardTitle>
            <Progress
              animated
              color='danger'
              value={(props.pet.time / 86400 / props.pet.duration) * 100}
            >
              Age
            </Progress>
            <br />
            <Progress
              animated
              color='success'
              value={(props.pet.amount / props.pet.targetFund) * 100}
            >
              Size
            </Progress>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default PetCard;
