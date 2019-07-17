import React from 'react';
import {
  Card,
  CardTitle,
  CardBody,
  CardHeader,
  Progress
} from 'reactstrap';
import './Card.css';

const PetCard = (props) => {
  return (
    <div className='col-md-4 card-item'>
      <Card>
        <CardHeader className='card-header'>
          <img
            alt='...'
            className='img-center img-fluid item-img '
                      src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOAAAADgCAMAAAAt85rTAAAAHlBMVEX///8AAADj4+Pp6enm5ub7+/vh4eHPz8/KysrV1dW3emMpAAAA+ElEQVR4nO3cQYrDMBBFwYwi28n9Lzww++kQYmh/pWov6AdaqUG3GwAAAAAAAAAAAAAAAAAA32Yb819j657uBPtPYXZPd4JRBd67pzuBwHQC0wlMJzCdwHQC0wlMJzCdwHQC0wlMJzCdwHTLB874wG0fhfmoAo9Znd2vsV0r7+BnRnfbn/IOfuYa60OBAgX2EihQYC+BAgX2EihQYC+BAgX2EihQYK/lA5d/ut/mvXJUBc/y6LzG8uWF/PXZC8svQAWmE5hOYDqB6QSmE5hOYDqB6QSmE5hOYDqB6QSmWz5w+Y/jlv/6DwAAAAAAAAAAAAAAAACA9/wCHCMVDPZ/kbAAAAAASUVORK5CYII='
          />
        </CardHeader>
        <CardBody>
          <CardTitle>Name: {props.name}</CardTitle>
          <Progress animated color='danger' value={props.age}>
            Age
          </Progress>
          <br />
          <Progress animated color='success' value={props.size}>
            Size
          </Progress>
        </CardBody>
      </Card>
    </div>
  );
};

export default PetCard;
