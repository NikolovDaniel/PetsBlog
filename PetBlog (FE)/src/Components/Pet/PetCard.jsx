import React from 'react';
import { Button, Card } from 'react-bootstrap';
import '../CSS/PetCard.css';
import { Link } from 'react-router-dom';

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
        className='custom-button btn btn-md fs-5 border-0'><Link to={`/pet/${pet.id}`} className="text-decoration-none text-dark fs-5">More</Link></Button>
      </Card.Body>
    </Card >
  );
};

export default PetCard;