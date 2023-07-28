import { Row, Col, Card } from 'react-bootstrap';
import "../CSS/PetById.css";

const Images = ({ images }) => {
    return (
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
    );
}


export default Images;