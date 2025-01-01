import React, { useState } from 'react';
import '../../css/donationPayment.css';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Container, Row, Col, Modal } from 'react-bootstrap';

const DonationPayment = () => {
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState('');
  const [isPaymentSuccess, setIsPaymentSuccess] = useState(false);
  const [cardDetails, setCardDetails] = useState({ cardNumber: '', cvv: '', expiryMonth: '', expiryYear: '' });
  const [upiDetails, setUpiDetails] = useState({ upiId: '' });
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(5000);

  const handlePayment = () => {
    setError(null);
  
    if (!paymentMethod) {
      setError('Please select a payment method.');
      return;
    }
  
    if (paymentMethod === 'card') {
      const { cardNumber, cvv, expiryMonth, expiryYear } = cardDetails;
  
      if (!cardNumber || cardNumber.length !== 16 || isNaN(cardNumber)) {
        setError('Please enter a valid 16-digit card number.');
        return;
      }
  
      if (!expiryMonth || !expiryYear || isNaN(expiryMonth) || isNaN(expiryYear) || 
          expiryMonth < 1 || expiryMonth > 12 || expiryYear < new Date().getFullYear()) {
        setError('Please enter a valid expiry date.');
        return;
      }
  
      if (!cvv || cvv.length !== 3 || isNaN(cvv)) {
        setError('Please enter a valid 3-digit CVV.');
        return;
      }
  
      console.log('Card Details:', cardDetails);
    } else if (paymentMethod === 'upi') {
      const { upiId } = upiDetails;
  
      const upiRegex = /^[a-zA-Z0-9.\-_]+@[a-zA-Z]+$/;
      if (!upiId || !upiRegex.test(upiId)) {
        setError('Please enter a valid UPI ID.');
        return;
      }
  
      console.log('UPI Details:', upiDetails);
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
          <Row>

            <Form.Group controlId="donationAmount" className="mb-4">
              <Form.Label>Choose Donation Amount: Rs. <Button variant='primary'>{amount}</Button></Form.Label>
              <Form.Range
                min={2500}
                max={10000}
                step={100}
                value={amount}
                onChange={(e) => {
                  setAmount(Number(e.target.value))
                  setError('');
                }}
              />
            </Form.Group>
          </Row>

          {!isPaymentSuccess ? (
            <Row>
              <Col>
                <Form>
                  <Form.Group controlId="paymentMethod" className="mb-3">
                    <Form.Label>Select Payment Method</Form.Label>
                    <Form.Check
                      type="radio"
                      label="Credit/Debit Card"
                      name="paymentMethod"
                      value="card"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value)
                        setError('');
                      }}
                    />
                    <Form.Check
                      type="radio"
                      label="UPI"
                      name="paymentMethod"
                      value="upi"
                      onChange={(e) => {
                        setPaymentMethod(e.target.value)
                        setError('');
                      }}
                    />
                  </Form.Group>
                </Form>
              </Col>
              <Col>
                {paymentMethod === 'card' ? (
                  <Form>
                    <Form.Group controlId="cardNumber" className="mb-3">
                      <Form.Label>Card Number</Form.Label>
                      <Form.Control type="text" onChange={
                        (e)=> setCardDetails((prev) => {
                          return {...prev, cardNumber: e.target.value}
                        })
                      } placeholder="Enter card number" />
                    </Form.Group>

                    <Form.Group controlId="cardExpiry" className="mb-3">
                      <Form.Label>Expiry</Form.Label>
                      <Row>
                        <Col>
                          <Form.Control type="text" onChange={
                            (e)=> setCardDetails((prev) => {
                              return {...prev, expiryMonth: e.target.value}
                            })
                          } placeholder="MM" />
                        </Col>
                        <Col>
                          <Form.Control type="text" onChange={
                            (e)=> setCardDetails((prev) => {
                              return {...prev, expiryYear: e.target.value}
                            })
                          } placeholder="YYYY" />
                        </Col>
                      </Row>
                    </Form.Group>

                    <Form.Group controlId="cardCvv" className="mb-3">
                      <Form.Label>CVV</Form.Label>
                      <Form.Control type="password" onChange={
                        (e)=> setCardDetails((prev) => {
                          return {...prev, cvv: e.target.value}
                        })
                      } placeholder="Enter CVV" />
                    </Form.Group>
                  </Form>
                ) : paymentMethod === 'upi' && (
                  <Form>
                    <Form.Group controlId="upiId" className="mb-3">
                      <Form.Label>UPI ID</Form.Label>
                      <Form.Control type="text" placeholder="Enter UPI ID" onChange={
                        (e)=> setUpiDetails((prev) => {
                          return {...prev, upiId: e.target.value}
                        })
                      } />
                    </Form.Group>
                  </Form>
                )
                }
              </Col>
            </Row>

          ) : (
            <Modal show={isPaymentSuccess} centered>
              <Modal.Body className="text-center">
                <h4 className="mt-3">Payment Successful!</h4>
                <p className='text-dark'>Your transaction id is 439fagsbik$984hcc</p>
                <p className="text-muted">Thank you for your donation.</p>
              </Modal.Body>
              <Button>Check donation in Profile</Button>
            </Modal>
          )}
          {error && <p className="text-danger">{error}</p>}
          <Button
            variant="primary"
            className="w-100 mt-3"
            onClick={handlePayment}
          >
            Pay {amount}
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DonationPayment;
