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
    const [showModal, setShowModal] = useState(false);
    const [showErrorModal, setShowErrorModal] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

    const handleAddHate = () => {
        setHates([...hates, { name: '' }]);
    };

    const handleAddLove = () => {
        setLoves([...loves, { name: '' }]);
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
        const data = formType === 'hates' ? hates : loves;

        formData.append("Preferences", JSON.stringify(data));
        formData.append('ApiKey', apiKey);
        console.log(JSON.stringify(data));

        try {
            await axios.post(`https://localhost:7026/api/Preferences`, formData);
            setShowModal(true);
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

    return (
        <Container fluid>
            <Row className='pet-form mt-5 bg-dark'>
                <Col xs={12} md={6}>
                    <Form className='d-flex flex-column'>
                        <Form.Label className='headers text-center fs-3 mt-5'>Your pet hates:</Form.Label>
                        {hates.map((hate, index) => (
                            <Form.Group className='mt-1' controlId={`hate-${index}`} key={index}>
                                <Form.Control
                                    type='text'
                                    value={hate.name}
                                    onChange={(e) => handleHateChange(index, e.target.value)}
                                    placeholder={'Keyword'}
                                />
                            </Form.Group>
                        ))}
                        <Button
                            style={{ backgroundColor: 'orange', color: '#012840' }}
                            className='button-hover mt-2 justify-content-center'
                            onClick={handleAddHate}>
                            Add Hate Field
                        </Button>
                        <Button
                            className='mt-2 mb-2 justify-content-center'
                            style={{ backgroundColor: '#012840', color: 'orange' }}
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
                                    type='text'
                                    value={love.name}
                                    onChange={(e) => handleLoveChange(index, e.target.value)}
                                    placeholder={'Keyword'}
                                />
                            </Form.Group>
                        ))}
                        <Button
                            style={{ backgroundColor: 'orange', color: '#012840' }}
                            className='button-hover mt-2 justify-content-center'
                            onClick={handleAddLove}>
                            Add Love Field
                        </Button>
                        <Button
                            className='mt-2 mb-2 justify-content-center'
                            style={{ backgroundColor: '#012840', color: 'orange' }}
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
