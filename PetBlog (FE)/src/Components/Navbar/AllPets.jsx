import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import PetCard from '../Pet/PetCard';
import '../CSS/AllPets.css';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get('https://localhost:7026/api/Pets')
      .then((response) => {
        setPets(response.data);
      })
      .catch((error) => console.error('Error fetching pets:', error));
  }, []);

  const filteredPets = pets.filter((pet) =>
    pet.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container className='allpets-container'>
      <Form.Control
        type="text"
        className="text-center mb-4 mt-4"
        placeholder="Search by name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Row>
        {filteredPets.length > 0 ? filteredPets.map((pet) => (
          <Col key={pet.id} className="d-flex justify-content-center align-items-center mb-4">
            <PetCard pet={pet} />
          </Col>
        )) : <div className='w-100 fs-3'>No available pets!</div>}
      </Row>
    </Container>
  );
};

export default AllPets;