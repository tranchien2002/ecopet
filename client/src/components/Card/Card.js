import React from 'react';
import { Card, Button, CardImg, CardTitle, CardText,
 CardSubtitle, CardBody,CardHeader,Progress } from 'reactstrap';
import './Card.css';

const PetDeck = (props) => {
  return (
    <div className="container">
        <div className="card-deck-container row  ">
            <div className="col-md-4 card-item">
                <Card>
                    <CardHeader className="card-header">
                        <img
                            alt="..."
                            className="img-center img-fluid item-img "
                            src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pembroke-welsh-corgi.jpg"
                        />
                    </CardHeader>
                    <CardBody>
                    <CardTitle>Name: {props.name}</CardTitle>
                    <Progress animated color="danger" value={props.age} >Age</Progress>
                    <br/>
                    <Progress animated color="success" value={props.size} >Size</Progress>
                    </CardBody>
                </Card>
            </div>
            <div className="col-md-4 card-item">
                <Card>
                    <CardHeader className="card-header">
                        <img
                            alt="..."
                            className="img-center img-fluid item-img "
                            src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pembroke-welsh-corgi.jpg"
                        />
                    </CardHeader>
                    <CardBody>
                    <CardTitle>Name: {props.name}</CardTitle>
                    <Progress animated color="danger" value={props.age} >Age</Progress>
                    <br/>
                    <Progress animated color="success" value={props.size} >Size</Progress>
                    </CardBody>
                </Card>
            </div>
            <div className="col-md-4 card-item">
                <Card>
                    <CardHeader className="card-header">
                        <img
                            alt="..."
                            className="img-center img-fluid item-img "
                            src="https://hips.hearstapps.com/ghk.h-cdn.co/assets/17/30/pembroke-welsh-corgi.jpg"
                        />
                    </CardHeader>
                    <CardBody>
                    <CardTitle>Name: {props.name}</CardTitle>
                    <Progress animated color="danger" value={props.age} >Age</Progress>
                    <br/>
                    <Progress animated color="success" value={props.size} >Size</Progress>
                    </CardBody>
                </Card>
            </div>
        </div>
    </div>
  );
};

export default PetDeck;