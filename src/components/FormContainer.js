import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'


function FormContainer({ children }) {

    return (
        <Container className="py-3" style={{ marginTop: '100px', minHeight: '520px' }}>
            <Row className="justify-content-md-center">
                <Col xs={12} md={6}>

                    {children}

                </Col>
            </Row>
        </Container>
    )
}

export default FormContainer

