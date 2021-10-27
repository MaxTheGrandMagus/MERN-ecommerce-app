import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { savePaymentMethod } from '../redux/actions/cart.actions';

import { Form, Button, FormGroup, FormLabel, Col, FormCheck } from 'react-bootstrap';


const PaymentScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  if(!shippingAddress) {
      history.push('/shipping')
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    history.push('/placeorder');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup>
          <FormLabel as='legend'>Select Method</FormLabel>
          <Col>
            <FormCheck 
              type='radio' 
              label='PayPal or Credit Card' 
              id='PayPal' 
              name='paymentMethod'
              value='PayPal'
              checked 
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
            <FormCheck 
              type='radio' 
              label='Custom' 
              id='Custom' 
              name='paymentMethod'
              value='Custom'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></FormCheck>
          </Col>
        </FormGroup>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}


export default PaymentScreen;