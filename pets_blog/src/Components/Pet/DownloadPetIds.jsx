import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Row, Col, Form } from 'react-bootstrap';

const DownloadPetIds = () => {

    const [ownerIdField, setOwnerIdField] = useState('');
    const [isValidOwnerId, setIsValidOwnerId] = useState(false);

    const handleDownloadClick = async () => {
        try {
            if (!isValidGuid(ownerIdField)) {
                alert('Please enter a valid Owner ID (GUID).');
                return;
            }

            const response = await axios.get(`http://kolombus-001-site1.htempurl.com/api/Pets/Download?ownerId=${ownerIdField}`, {
                responseType: 'blob',
            });

            const fileBlob = new Blob([response.data], { type: 'text/plain' });

            const fileUrl = URL.createObjectURL(fileBlob);

            const downloadLink = document.createElement('a');
            downloadLink.href = fileUrl;
            downloadLink.download = 'textfile.txt';
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        } catch (error) {
            console.error('Error downloading the text file:', error);
        }
    };

    const isValidGuid = (guid) => {
        const guidPattern = /^[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{4}-[0-9A-Fa-f]{12}$/;
        return guidPattern.test(guid);
    };

    return (
        <Row className='d-flex flex-column text-center justify-content-center align-items-center'>
            <Col xs={12} lg={6}>
                <Form.Label className='headers text-center fs-3 mt-3'>Request Information:</Form.Label>
                <Form.Group controlId='ownerId'>
                    <Form.Floating className='mt-2'>
                        <Form.Control
                            type='text'
                            value={ownerIdField}
                            onChange={(e) => {
                                setOwnerIdField(e.target.value);
                                setIsValidOwnerId(isValidGuid(e.target.value));
                            }} />
                        <Form.Label>Owner ID</Form.Label>
                    </Form.Floating>
                </Form.Group>
            </Col>
            <Col>
                <Form.Label className='headers text-center fs-3 mt-3'>Download your Pet IDs</Form.Label>
                <div>
                    <button className='custom-button' onClick={handleDownloadClick}>Download IDs</button>
                </div>
            </Col>
        </Row>
    );
};

export default DownloadPetIds;
