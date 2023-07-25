import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../CSS/PetCard.css';

const PetCard = ({ pet }) => {
  return (
    <Card className="pet-card">
      <div className="image-wrapper">
        <Card.Img
          className="image"
          loading='lazy'
          src={pet.image ? `data:image/jpeg;base64,${pet.image}` : 'https://via.placeholder.com/400'} alt={pet.name} />
      </div>
      <Card.Body className='d-flex flex-column align-items-center'>
        <Card.Title>
          <h3 className='headers text-center fs-3'>{pet.name}</h3>
          </Card.Title>
        <Button 
        className='readMore btn btn-md fs-5 border-0' 
        href={`/pet/${pet.id}`} 
        style={{ backgroundColor: "#012840", color: "orange"}}>More</Button>
      </Card.Body>
    </Card >
  );
};

export default PetCard;