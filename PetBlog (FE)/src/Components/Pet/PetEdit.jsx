import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button, Image } from 'react-bootstrap';
import '../CSS/PetForm.css';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';

const PetEdit = () => {
    const [ownerIdField, setOwnerIdField] = useState('');
    const [petIdField, setPetIdField] = useState('');
    const [apiKeyField, setApiKeyField] = useState('');
    const [petImage, setPetImage] = useState(null);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const [petData, setPetData] = useState({});

    const handleCloseErrorModal = () => {
        setShowErrorModal(false);
        setErrorMessages([]);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.get(`https://kolombus-001-site1.htempurl.com/api/Pets/Edit?id=${petIdField}&ownerId=${ownerIdField}`);
            const petDetails = response.data;
            setPetData(petDetails);
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
            setPetData(null);
            setShowErrorModal(true);
        }
    };

    const handlePetFormSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();

        if (petImage) {
            formData.append("imageFile", petImage);
            formData.append("imageId", petData.imageId);
        }
        formData.append('Id', petIdField);
        formData.append('OwnerId', ownerIdField);
        formData.append('OwnerName', petData.ownerName);
        formData.append('Name', petData.name);
        formData.append('Type', petData.type);
        formData.append('Description', petData.description);
        formData.append('BirthDate', petData.birthDate);
        formData.append('image', petImage)
        try {
            await axios.put(`https://kolombus-001-site1.htempurl.com/api/Pets/${apiKeyField}?id=${petIdField}&ownerId=${ownerIdField}`, formData);
            setShowModal(true);
            setPetData({});
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

    return (
        <Container fluid>
            <Row className='mt-4'>
                <Col className='text-center'>
                    <h4 className='headers'>Request Information:</h4>
                    <Form>
                        <Row>
                            <Col className='mt-1 mt-md-0 fw-bold' xs={12} md={4}>
                                <Form.Group controlId='ownerIdField'>
                                    <Form.Floating>
                                        <Form.Control type='text' value={ownerIdField} onChange={(e) => setOwnerIdField(e.target.value)} />
                                        <Form.Label>Owner ID</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                            </Col>
                            <Col className='mt-2 mt-md-0 fw-bold' xs={12} md={4}>
                                <Form.Group controlId='petIdField'>
                                    <Form.Floating>
                                        <Form.Control type='text' value={petIdField} onChange={(e) => setPetIdField(e.target.value)} />
                                        <Form.Label>Pet ID</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                            </Col>
                            <Col className='mt-2 mt-md-0 fw-bold' xs={12} md={4}>
                                <Form.Group controlId='apiKeyField'>
                                    <Form.Floating>
                                        <Form.Control type='text' value={apiKeyField} onChange={(e) => setApiKeyField(e.target.value)} />
                                        <Form.Label>API Key</Form.Label>
                                    </Form.Floating>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Button className='custom-button mt-4 fs-5' type='submit' onClick={(e) => handleSubmit(e)}>
                                Retrieve Pet Details
                            </Button>
                        </Row>
                    </Form>
                </Col>
            </Row>
            {petData && (
                <Row className='pet-form d-flex flex-column justify-content-center align-items-center mt-5 bg-dark'>
                    <Col xs={12} md={6}>
                        <Form className='d-flex flex-column mt-3' onSubmit={handlePetFormSubmit}>
                            {petData.image && (
                                <>
                                    <Form.Label className='headers text-center fs-3'>Current Title Image</Form.Label>
                                    <div className='d-flex aling-items-center justify-content-center pet-image-preview'>
                                        <Image src={petData.image ? `data:image/jpeg;base64,${petData.image}` : 'https://via.placeholder.com/400'} alt={petData.name} fluid />
                                    </div>
                                </>

                            )}
                            {petImage && (
                                <>
                                    <Form.Label className='headers text-center fs-3'>New Title Image</Form.Label>
                                    <div className='d-flex aling-items-center justify-content-center pet-image-preview'>
                                        <Image src={URL.createObjectURL(petImage)} fluid />
                                    </div>
                                </>
                            )}
                            <Form.Group controlId='imageUpload'>
                                <Form.Control className='mt-2' type='file' onChange={(e) => setPetImage(e.target.files[0])} />
                            </Form.Group>
                            <Form.Label className='headers text-center mt-5 fs-3'>Pet Information</Form.Label>
                            <Form.Group controlId='petName'>
                                <Form.Floating>
                                    <Form.Control
                                        type='text'
                                        value={petData.name}
                                        onChange={(e) => setPetData({ ...petData, name: e.target.value })}
                                    />
                                    <Form.Label className='fw-bold'>Pet Name</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className='mt-3' controlId='petBirthDate'>
                                <Form.Floating>
                                    <Form.Control
                                        type='date'
                                        value={petData.birthDate ? new Date(petData.birthDate).toISOString().slice(0, 10) : "2023-05-07"}
                                        onChange={(e) => setPetData({ ...petData, birthDate: e.target.value })}
                                    />
                                    <Form.Label className='fw-bold'>Birth Date</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className='mt-3' controlId='ownerName'>
                                <Form.Floating>
                                    <Form.Control
                                        type='text'
                                        value={petData.ownerName}
                                        onChange={(e) => setPetData({ ...petData, ownerName: e.target.value })}
                                    />
                                    <Form.Label className='fw-bold'>Owner Name</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className='mt-3' controlId='petType'>
                                <Form.Floating>
                                    <Form.Control
                                        type='text'
                                        value={petData.type}
                                        onChange={(e) => setPetData({ ...petData, type: e.target.value })}
                                    />
                                    <Form.Label className='fw-bold'>Kind</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                            <Form.Group className='mt-3' controlId='petDescription'>
                                <Form.Floating>
                                    <Form.Control
                                        as='textarea'
                                        value={petData.description}
                                        onChange={(e) => setPetData({ ...petData, description: e.target.value })}
                                        style={{ height: '150px' }}
                                    />
                                    <Form.Label className='fw-bold'>Description</Form.Label>
                                </Form.Floating>
                            </Form.Group>
                            <Button className='custom-button fs-5 mt-2 mb-2 justify-content-center' type='submit'>
                                Edit Pet
                            </Button>
                        </Form>
                    </Col>
                </Row>
            )}
            <SuccessModal show={showModal} onClose={handleCloseModal} message={
                <React.Fragment>
                    <div className='d-flex flex-column justify-content-center align-items-center'>
                        <p className='fs-5'>You have successfully edited your Pet.</p>
                        {/* <Link to={`/pet/${petIdField}`} className='custom-button btn fs-5 border-0'>View your Pet</Link> */}
                    </div>
                </React.Fragment>} />
            <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} errorMessages={errorMessages} />
        </Container >
    );
};

export default PetEdit;
