import React, { useState } from 'react';
import '../../css/donationPayment.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

const DonationPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);

  const [amount, setAmount] = useState(5000); 

  const handlePayment = () => {
    if (!paymentMethod) {
      alert('Please select a payment method.');
      return;
    }

    setTimeout(() => {
      setIsPaymentSuccess(true);
      setTimeout(() => navigate('/donation'), 3000); 
    }, 1000);
  };

  return (
    <Container className="donation-payment">
      <Row className="justify-content-center">
        <Col md={6}>
          <h1 className="text-center mb-4">Donation Payment</h1>

          <Form.Group controlId="donationAmount" className="mb-4">
            <Form.Label>Choose Donation Amount: Rs. <Button variant='primary'>{amount}</Button></Form.Label>
            <Form.Range
              min={2500}
              max={10000}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
            />
          </Form.Group>

          {!isPaymentSuccess ? (
            <Form>
              <Form.Group controlId="paymentMethod" className="mb-3">
                <Form.Label>Select Payment Method</Form.Label>
                <Form.Check
                  type="radio"
                  label="Credit/Debit Card"
                  name="paymentMethod"
                  value="card"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
                <Form.Check
                  type="radio"
                  label="UPI"
                  name="paymentMethod"
                  value="upi"
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />
              </Form.Group>
              <Button
                variant="primary"
                className="w-100 mt-3"
                onClick={handlePayment}
              >
                Pay Now
              </Button>
            </Form>
          ) : (
            <Modal show={isPaymentSuccess} centered>
              <Modal.Body className="text-center">
                <h4 className="mt-3">Payment Successful!</h4>
                <p className="text-muted">Thank you for your donation.</p>
              </Modal.Body>
            </Modal>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default DonationPayment;
