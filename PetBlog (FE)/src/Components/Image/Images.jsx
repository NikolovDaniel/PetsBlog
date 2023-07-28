import { useState, useEffect } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import "../CSS/PetById.css";

const Images = ({ id }) => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(false);

    const fetchImages = () => {
        setLoading(true);
        axios
            .get(`https://kolombus-001-site1.htempurl.com/api/Images/${id}`)
            .then((response) => {
                setPet(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching pet:', error);
                setLoading(false);
            });
    };

    const fetchPetImages = () => {
        const imagePromises = pet.images.map((image) =>
            new Promise((resolve, reject) => {
                const img = new Image();
                img.src = `data:image/jpeg;base64,${image.image}`;
                img.onload = resolve;
                img.onerror = reject;
            })
        );

        Promise.allSettled(imagePromises)
            .then(() => setImagesLoaded(true))
            .catch(() => setImagesLoaded(true));
    };

    useEffect(() => {
        fetchImages();
    }, []);

    useEffect(() => {
        if (!loading && Object.keys(pet).length > 0) {
            fetchPetImages();
        }
    }, [pet, loading]);

    if (loading) {
        return <div className='headers text-center fs-3'>Loading...</div>;
    }

    const allCategories = ['All', ...new Set(Object.values(pet.images).map((image) => image.category))];

    const filteredImages = selectedCategory === 'All' ? pet.images : pet.images.filter((image) => image.category === selectedCategory);

    return (
        <>
            <Row className='d-flex justify-content-center mt-5'>
                <Col xs={6}>
                    <h2 className='headers text-center'>Gallery</h2>
                    <Form className='text-center'>
                        <Form.Group controlId="categoryDropdown">
                            <Form.Label className='headers fs-5'>Select Category</Form.Label>
                            <Form.Control
                                className='category text-center'
                                as="select"
                                style={{ fontSize: "large" }}
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                            >
                                {allCategories.map((category) => (
                                    <option key={category} value={category}>
                                        {category}
                                    </option>
                                ))}
                            </Form.Control>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
            {imagesLoaded && (
                <Row className='gallery d-flex justify-content-center mt-5'>
                    {images ? images.map((img, index) => (
                        <Col className='pt-2 pb-2' key={index} xs={6} md={4} lg={3}>
                            <div className='pet-picture-wrapper'>
                                <Card>
                                    <Card.Img className='pet-picture' loading='lazy' variant="top" src={`data:image/jpeg;base64,${img.image}`} alt={`Dog ${index + 1}`} />
                                </Card>
                            </div>
                        </Col>
                    )) : <div className='text-center fs-3'>No images available!</div>}
                </Row>
            )}
        </>
    );
}


export default Images;