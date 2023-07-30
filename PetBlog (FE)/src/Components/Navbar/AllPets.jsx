import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form } from 'react-bootstrap';
import RingLoader from 'react-spinners/RingLoader';
import PetCard from '../Pet/PetCard';
import '../CSS/AllPets.css';

const AllPets = () => {
  const [pets, setPets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get('https://kolombus-001-site1.htempurl.com/api/Pets')
      .then((response) => {
        setPets(response.data);
        setLoading(false);

      })
      .catch((error) => {
        console.error('Error fetching pets:', error)
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className='text-center fs-3'>
            <h4 className='headers'>Pets Loading</h4>
            <RingLoader size={75}/>
            </div>;
  }

  if (Object.keys(pets).length === 0) {
    return <div className='headers text-center fs-3'>No available Pets!</div>;
  }

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
        )) : <div className='headers w-100 fs-3'>Loading...</div>}
      </Row>
    </Container>
  );
};

export default AllPets;