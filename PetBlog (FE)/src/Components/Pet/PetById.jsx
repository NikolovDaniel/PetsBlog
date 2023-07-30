import { Row, Col, Card, Container, Image, Form } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import RingLoader from 'react-spinners/RingLoader';
import { useParams } from "react-router-dom";
import Images from '../Image/Images'
import "../CSS/PetById.css";

const PetById = () => {
    const { id } = useParams();
    const [pet, setPet] = useState({});
    const [loading, setLoading] = useState(true);

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birthDateObj = new Date(birthDate);
        let age = today.getFullYear() - birthDateObj.getFullYear();
        const monthDiff = today.getMonth() - birthDateObj.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDateObj.getDate())) {
            age--;
        }

        return age;
    };

    const fetchPetData = () => {
        setLoading(true);
        axios
            .get(`https://kolombus-001-site1.htempurl.com/api/Pets/NoImages/${id}`)
            .then((response) => {
                setPet(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pet:', error);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchPetData();
    }, []);

    if (loading) {
        return <div className='d-flex flex-column justify-content-center align-items-center mt-3 mb-3'>
            <h4 className='headers'>Pet Loading</h4>
            <div>
                <RingLoader size={75} />
            </div>
        </div>;
    }

    if (Object.keys(pet).length === 0) {
        return <div className='headers text-center fs-3'>Unable to fetch pet data.</div>;
    }

    return (
        <Container fluid className='mt-5'>
            <Row className='title-row pt-2 pb-2'>
                <Col xs={12} lg={6}>
                    <div className='pet-title-image-preview'>
                        <Image variant="top" src={Object.keys(pet.images).length > 0 ? `data:image/jpeg;base64,${pet.images[0].image}` : 'https://via.placeholder.com/400'} alt={pet.name}></Image>
                    </div>
                </Col>
                <Col xs={12} lg={6} className='d-flex flex-column justify-content-center align-items-center mt-3'>
                    <div>
                        <h1 className='headers text-center'>{pet.name}</h1>
                        <p className='lead fs-2 text-center ps-2 pe-2 pt-2 pb-2' style={{ color: "#012840", backgroundColor: "orange", borderRadius: "10px" }}>{pet.description}</p>
                        <h4 className='headers fs-3 mt-4 text-center'>Information</h4>
                        <div className='text-center mb-2'>
                            <p className='headers fs-5'>Owner: <b>{pet.ownerName}</b></p>
                            <p className='headers fs-5'>Kind: <b>{pet.type}</b></p>
                            <p className='headers fs-5'>Age: <b>{calculateAge(pet.birthDate)} years</b></p>
                        </div>
                        <p className='headers fs-5'>Loves: {pet.loves ? pet.loves.map((p) => (
                            <div className='d-inline-block mt-2'>
                                <span key={p} className='ms-2 pb-1 pt-1 ps-1 pe-1' style={{ backgroundColor: "orange", borderRadius: "10px" }}><b>{p}</b></span>
                            </div>
                        )) : <span className='ms-1 pb-1 pt-1 ps-1 pe-1' style={{ backgroundColor: "orange", borderRadius: "10px" }}><b>No Loves</b></span>}</p>
                        <p className='headers fs-5'>Hates: {pet.hates ? pet.hates.map((p) => (
                            <div className='d-inline-block mt-2'>
                                <span key={p} className='ms-2 pb-1 pt-1 ps-1 pe-1' style={{ backgroundColor: "orange", borderRadius: "10px" }}><b>{p}</b></span>
                            </div>
                        )) : <span className='ms-1 pb-1 pt-1 ps-1 pe-1' style={{ backgroundColor: "orange", borderRadius: "10px" }}><b>No Hates</b></span>}</p>
                    </div>
                </Col>
            </Row>
            <Images id={id} />
        </Container>
    );
}

export default PetById;
