import { Row, Col, Container, Image } from 'react-bootstrap';
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Images from '../Image/Images'
import "../CSS/PetById.css";

const RandomPet = () => {
    const [pet, setPet] = useState({});
    // const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    // const [imagesLoaded, setImagesLoaded] = useState(false);

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
            .get(`https://kolombus-001-site1.htempurl.com/api/Pets/Random`)
            .then((response) => {
                setPet(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pet:', error);
                setLoading(false);
            });
    };

    // const fetchPetImages = () => {
    //     const imagePromises = pet.images.map((image) =>
    //         new Promise((resolve, reject) => {
    //             const img = new Image();
    //             img.src = `data:image/jpeg;base64,${image.image}`;
    //             img.onload = resolve;
    //             img.onerror = reject;
    //         })
    //     );

    //     Promise.allSettled(imagePromises)
    //         .then(() => setImagesLoaded(true))
    //         .catch(() => setImagesLoaded(true));
    // };

    useEffect(() => {
        fetchPetData();
    }, []);

    // useEffect(() => {
    //     if (!loading && Object.keys(pet).length > 0) {
    //         fetchPetImages();
    //     }
    // }, [pet, loading]);

    if (loading) {
        return <div className='text-center fs-3'>Loading...</div>;
    }

    if (Object.keys(pet).length === 0) {
        return <div className='text-center fs-3'>Unable to fetch pet data.</div>;
    }

    // const allCategories = ['All', ...new Set(Object.values(pet.images).map((image) => image.category))];

    // const filteredImages = selectedCategory === 'All' ? pet.images : pet.images.filter((image) => image.category === selectedCategory);

    return (
        <Container fluid className='mt-5'>
            <Row className='title-row pt-2 pb-2'>
                <Col xs={12} lg={6}>
                    <div className='pet-title-image-preview'>
                        <Image variant="top" src={pet.images ? `data:image/jpeg;base64,${pet.images[0].image}` : 'https://via.placeholder.com/400'} alt={pet.name}></Image>
                    </div>
                </Col>
                <Col xs={12} lg={6} className='d-flex flex-column justify-content-center align-items-center mt-3'>
                    <div>
                        <h1 className='headers text-center'>{pet.name}</h1>
                        <p className='lead fs-2 text-center ps-2 pe-2 pt-2 pb-2' style={{ color: "#012840", backgroundColor: "orange", borderRadius: "10px" }}>{pet.description}</p>
                        <h4 className='headers text-center'>Information</h4>
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
            <Images id={pet.id} />
        </Container>
    );
}

export default RandomPet;
