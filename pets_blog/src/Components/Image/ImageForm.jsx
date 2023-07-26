import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../CSS/PetForm.css';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';

const ImageForm = () => {
  const [ownerId, setOwnerId] = useState('');
  const [petId, setPetId] = useState('');
  const [petImage, setPetImage] = useState(null);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [apiKey, setApiKey] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessages, setErrorMessages] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('PetId', petId);
    formData.append('OwnerId', ownerId);
    formData.append('Description', description);
    formData.append('ImageFile', petImage);
    formData.append('Category', category);
    try {
      await axios.post(`https://localhost:7026/api/Images/${apiKey}`, formData);
      setShowModal(true);
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
      console.log(error.response.data)
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

  return (
    <Container fluid>
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
            <Form.Label className='headers text-center fs-3 mt-5'>Image Information</Form.Label>
            <Form.Group controlId='category'>
              <Form.Floating className=''>
                <Form.Control type='text' value={category} onChange={(e) => setCategory(e.target.value)} />
                <Form.Label>Category</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='ownerId'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={ownerId} onChange={(e) => setOwnerId(e.target.value)} />
                <Form.Label>Owner Id</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='petId'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={petId} onChange={(e) => setPetId(e.target.value)} />
                <Form.Label>Pet Id</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='apiKey'>
              <Form.Floating className='mt-2'>
                <Form.Control type='text' value={apiKey} onChange={(e) => setApiKey(e.target.value)} />
                <Form.Label>API Key</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Form.Group controlId='description' className='mb-3 mt-2'>
              <Form.Floating>
                <Form.Control
                  as='textarea'
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  style={{ height: '150px' }}
                />
                <Form.Label>Description</Form.Label>
              </Form.Floating>
            </Form.Group>
            <Button className='custom-button mt-2 justify-content-center' type='submit'>Submit</Button>
          </Form>
        </Col>
      </Row>
      <SuccessModal show={showModal} onClose={handleCloseModal} message={'You have successfully added an Image to your Pet.'}/>
      <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} errorMessages={errorMessages} />
    </Container>
  );
};

export default ImageForm;
