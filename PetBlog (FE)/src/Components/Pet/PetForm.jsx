import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../CSS/PetForm.css';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';

const PetForm = () => {
  const [generatedGuid, setGeneratedGuid] = useState('');
  const [generatedPetId, setGeneratedPetId] = useState('');
  const [petName, setPetName] = useState('');
  const [petBirthDate, setPetBirthDate] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [ownerId, setOwnerId] = useState('');
  const [petBreed, setPetBreed] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [petDescription, setPetDescription] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const generateGuid = async () => {
    try {
      const response = await axios.get('https://www.uuidtools.com/api/generate/v1');
      setGeneratedGuid(response.data);
    } catch (error) {
      console.error('Error generating GUID:', error);
      setGeneratedGuid('');
    }
  };

  const generatePetId = async () => {
    try {
      const response = await axios.get('https://www.uuidtools.com/api/generate/v1');
      setGeneratedPetId(response.data);
    } catch (error) {
      console.error('Error generating GUID:', error);
      setGeneratedGuid('');
    }
  };

  useEffect(() => {
    generateGuid();
    generatePetId();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', petName);
    formData.append('BirthDate', petBirthDate);
    formData.append('OwnerName', ownerName);
    formData.append('OwnerId', ownerId);
    formData.append('Type', petBreed);
    formData.append('ImageFile', petImage);
    formData.append('Description', petDescription);
    formData.append('Id', generatedPetId)
    try {
      await axios.post(`http://kolombus-001-site1.htempurl.com/api/Pets/${apiKey}`, formData);
      setShowModal(true);
      setPetName('');
      setPetBirthDate('');
      setOwnerName('');
      setOwnerId('');
      setPetBreed('');
      setApiKey('');
      setPetDescription('');
      setPetImage(null);
    } catch (error) {
      console.error('Error submitting the form:', error);

      if (error.response && error.response.data && error.response.data.errors) {
        const errorData = error.response.data;
        const errorMessages = [];

        for (const [key, value] of Object.entries(errorData.errors)) {
          const errorMessage = `${key}: ${value}`;
          errorMessages.push(errorMessage);
        }

        setErrorMessages(errorMessages);
      } else {
        setErrorMessages(['An error occurred while submitting the form. Please try again later.']);
      }
      setShowErrorModal(true);
    }
  };

  const handleCloseErrorModal = () => {
    setShowErrorModal(false);
    setErrorMessages([]);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedGuid);
  };

  const copyPetIdToClipboard = () => {
    navigator.clipboard.writeText(generatedPetId);
  };
  return (
    <Container fluid>
      <Row className='mt-4'>
        <Col className='text-center'>
          <h4 className='headers'>GUID's</h4>
          <p className='fs-5'>Owner ID: <b>{generatedGuid}</b></p>
          <p className='fs-5'>Pet ID: <b>{generatedPetId}</b></p>
          <p className='fs-5'>* Please save your Owner ID and Pet ID, as you will need it in order to manipulate your Pet Data.</p>
          <p className='fs-5'>* In order to add your favorite Pet, you need to include an API key.</p>
          <div>
            <Button className='custom-button fs-5' onClick={copyToClipboard}>Copy Owner ID to Clipboard</Button>
            <Button className='custom-button fs-5 ms-0 ms-lg-1 mt-1 mt-lg-0' onClick={copyPetIdToClipboard}>Copy Pet ID to Clipboard</Button>
          </div>
        </Col>
      </Row>
      <Row className='pet-form d-flex flex-column justify-content-center align-items-center mt-5 bg-dark'>
        <Col xs={12} md={6}>
          <Form className='d-flex flex-column mt-3' onSubmit={handleSubmit}>
            {petImage && (
              <div className='d-flex aling-items-center justify-content-center pet-image-preview'>
                <Image src={URL.createObjectURL(petImage)} fluid />
              </div>
            )}
            <Form.Label className='headers text-center fs-3'>Pet Image</Form.Label>
            <Form.Group controlId='imageUpload'>
              <Form.Control className='mt-2' type='file' onChange={(e) => setPetImage(e.target.files[0])} />
            </Form.Group>
            <Form.Label className='headers text-center fs-3 mt-5'>Pet Information</Form.Label>
            <Form.Group controlId='petName'>
              <Form.Floating className=''>
                <Form.Control type='text' value={petName} onChange={(e) => setPetName(e.target.value)} />
                <Form.Label>Pet Name</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='petBreed'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={petBreed} onChange={(e) => setPetBreed(e.target.value)} />
                <Form.Label>Kind</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='petBirthDate'>
              <Form.Floating className='mt-2'>
                <Form.Control type='date' value={petBirthDate} onChange={(e) => setPetBirthDate(e.target.value)} />
                <Form.Label>Birth Date</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='ownerName'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
                <Form.Label>Owner Name</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='ownerId'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
                <Form.Label>Owner ID</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='apiKey'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <Form.Label>API Key</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='petDescription' className='mb-3 mt-2'>
              <Form.Floating>
                <Form.Control
                  as='textarea'
                  value={petDescription}
                  onChange={(e) => setPetDescription(e.target.value)}
                  style={{ height: '150px' }}
                />
                <Form.Label>Description</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Button className='custom-button fs-5 mt-2 mb-2 justify-content-center' type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
      <SuccessModal show={showModal} onClose={handleCloseModal} message={'You have succesfully created your Pet.'} />
      <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} errorMessages={errorMessages} />
    </Container>
  );
};

export default PetForm;
