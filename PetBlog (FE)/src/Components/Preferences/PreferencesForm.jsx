import React, { useState } from 'react';
import axios from 'axios';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import '../CSS/PetForm.css';
import SuccessModal from '../SuccessModal';
import ErrorModal from '../ErrorModal';

const PreferencesForm = () => {
    const [hates, setHates] = useState([{ name: '' }]);
    const [loves, setLoves] = useState([{ name: '' }]);
    const [apiKey, setApiKey] = useState('');
    const [ownerId, setOwnerId] = useState('');
    const [petId, setPetId] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleAddField = (type) => {
        if (type === 'hates' && hates.length >= 10) {
            alert('Maximum limit of 10 hates fields reached.');
            return;
        }

        if (type === 'loves' && loves.length >= 10) {
            alert('Maximum limit of 10 loves fields reached.');
            return;
        }

        if (type === 'hates') {
            setHates([...hates, { Name: '' }]);
        } else if (type === 'loves') {
            setLoves([...loves, { Name: '' }]);
        }
    };

    const handleHateChange = (index, value) => {
        const updatedHates = [...hates];
        updatedHates[index].name = value;
        setHates(updatedHates);
    };

    const handleLoveChange = (index, value) => {
        const updatedLoves = [...loves];
        updatedLoves[index].name = value;
        setLoves(updatedLoves);
    };

    const handleSubmit = async (e, formType) => {
        e.preventDefault();

        const formData = new FormData();
        const data = formType === 'hates' ? hates.map((hate) => hate.name) : loves.map((love) => love.name);
        const type = formType === 'hates' ? 'Hates' : 'Loves';
        formData.append("JsonPreferences", JSON.stringify(data));
        formData.append("Type", type);
        formData.append('ApiKey', apiKey);
        formData.append('OwnerId', ownerId);
        formData.append('PetId', petId);

        try {
            await axios.post(`http://kolombus-001-site1.htempurl.com/api/Preferences/${apiKey}`, formData);

            setShowModal(true);
        } catch (error) {
            console.error('Error submitting the form:', error);
            if (error.response.status === 400) {
                console.log(error.response.data.Error);
                setErrorMessages(error.response.data.Error);
            }
            else if (error.response && error.response.status === 400) {
                const errorData = error.response.data;

                if (errorData.errors) {
                    // Handle ModelState errors
                    const errorMessages = Object.entries(errorData.errors).map(([key, value]) => `${key}: ${value}`);
                    setErrorMessages(errorMessages);
                } else if (errorData.Errors) {
                    // Handle ProblemDetails errors
                    const errorMessages = errorData.Errors;
                    setErrorMessages(errorMessages);
                } else {
                    setErrorMessages(['An error occurred while submitting the form. Please try again later.']);
                }
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

    sessionStorage.setItem('ownerId', 'daniel')

    return (
        <Container fluid>
            <Row>
                <p className='headers text-center fs-5 mt-5'>* Every Pet can have 10 Loves and 10 Hates preferences.</p>
                <Form.Label className='headers text-center fs-3'>Request Information:</Form.Label>
                <Col xs={12} md={4}>
                    <Form.Group className='mt-1'>
                        <Form.Floating>
                            <Form.Control
                                value={ownerId}
                                onChange={(e) => setOwnerId(e.target.value)}
                                type='text'
                            />
                            <Form.Label>Owner ID</Form.Label>
                        </Form.Floating>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group className='mt-1'>
                        <Form.Floating>
                        <Form.Control
                            value={petId}
                            onChange={(e) => setPetId(e.target.value)}
                            type='text' />
                            <Form.Label>Pet ID</Form.Label>
                        </Form.Floating>
                    </Form.Group>
                </Col>
                <Col xs={12} md={4}>
                    <Form.Group className='mt-1'>
                        <Form.Floating>
                        <Form.Control
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            type='text' />
                            <Form.Label>API Key</Form.Label>
                        </Form.Floating>
                    </Form.Group>
                </Col>
            </Row>
            <Row className='pet-form mt-3 bg-dark'>
                <Col xs={12} md={6}>
                    <Form className='d-flex flex-column'>
                        <Form.Label className='headers text-center fs-3 mt-5'>Your pet hates:</Form.Label>
                        {hates.map((hate, index) => (
                            <Form.Group className='mt-1' controlId={`hate-${index}`} key={index}>
                                <Form.Control
                                    maxLength={20}
                                    type='text'
                                    value={hate.name}
                                    onChange={(e) => handleHateChange(index, e.target.value)}
                                    placeholder={'Keyword'}
                                />
                            </Form.Group>
                        ))}
                        <Button
                            className='custom-button mt-2 justify-content-center'
                            type='button'
                            onClick={() => handleAddField('hates')}>
                            Add Hate Field
                        </Button>
                        <Button
                            className='custom-button fs-5 mt-2 mb-2 justify-content-center'
                            type='submit'
                            onClick={(e) => handleSubmit(e, 'hates')}
                        >
                            Submit Hates
                        </Button>
                    </Form>
                </Col>
                <Col xs={12} md={6}>
                    <Form className='d-flex flex-column'>
                        <Form.Label className='headers text-center fs-3 mt-5'>Your pet loves:</Form.Label>
                        {loves.map((love, index) => (
                            <Form.Group className='mt-1' controlId={`love-${index}`} key={index}>
                                <Form.Control
                                    maxLength={20}
                                    type='text'
                                    value={love.name}
                                    onChange={(e) => handleLoveChange(index, e.target.value)}
                                    placeholder={'Keyword'}
                                />
                            </Form.Group>
                        ))}
                        <Button
                            className='custom-button mt-2 justify-content-center'
                            type='button'
                            onClick={() => handleAddField('loves')}>
                            Add Love Field
                        </Button>
                        <Button
                            className='custom-button fs-5 mt-2 mb-2 justify-content-center'
                            type='submit'
                            onClick={(e) => handleSubmit(e, 'loves')}
                        >
                            Submit Loves
                        </Button>
                    </Form>
                </Col>
            </Row>
            <SuccessModal
                show={showModal}
                onClose={handleCloseModal}
                message={'You have successfully added the preferences of your Pet.'}
            />
            <ErrorModal show={showErrorModal} onClose={handleCloseErrorModal} errorMessages={errorMessages} />
        </Container >
    );
};

export default PreferencesForm;
