import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';

const Instructions = () => {

    return (
        <>
            <Row className='mt-3'>
                <Col className='d-flex flex-column justify-content-center align-items-center bg-danger pt-3 pb-3'>
                    <Form.Label className='headers text-center fs-3'>Welcome to Mentormate Pets Blog</Form.Label>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "orange"}}>
                    <Form.Label className='headers text-center fs-3'>Instructions</Form.Label>
                    <Form.Label className='align-self-md-start ms-md-5 headers text-center fs-5'>1. Owner ID is provided and can be reused it, so <b>SAVE</b> it!</Form.Label>
                    <Form.Label className='align-self-md-start ms-md-5 headers text-center fs-5 mt-2'>2. <b>SAVE</b> the API Key I have provided you!</Form.Label>
                    <Form.Label className='align-self-md-start ms-md-5 headers text-center fs-5 mt-2'>3. Try to not add too large images as <b>space</b> is <b>limited!</b></Form.Label>
                </Col>
            </Row>
            <Row className='mt-3'>
                <Col className='d-flex flex-column justify-content-center align-items-center' style={{backgroundColor: "orange"}}>
                    <Form.Label className='headers text-center fs-3'>Contacts</Form.Label>
                    <Form.Label className='headers text-center fs-5'>1. <b>Daniel Nikolov</b> in the main Group Chat.</Form.Label>
                    <Form.Label className='headers text-center fs-5 mt-2'>2. <b>Email:</b> <span className='fw-bold'>kace123@abv.bg</span></Form.Label>
                    <Form.Label className='headers text-center fs-5 mt-2'>3. <b>Phone:</b> Not available!</Form.Label>
                    <Form.Label className='headers text-center fs-5 mt-2'>3. <b>Fax:</b> Not available!</Form.Label>
                </Col>
            </Row>
        </>

    );
}

export default Instructions;