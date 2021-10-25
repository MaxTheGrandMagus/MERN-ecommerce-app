import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import FormContainer from '../components/FormContainer';
import CheckoutSteps from '../components/CheckoutSteps';

import { saveShippingAddress } from '../redux/actions/cart.actions';

import { Form, Button, FormGroup, FormLabel, FormControl } from 'react-bootstrap';


const ShippingScreen = ({ history }) => {
  const dispatch = useDispatch();

  const cart = useSelector(state => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    history.push('/payment');
  }

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <FormGroup className='py-3' controlId='address'>
          <FormLabel>Address</FormLabel>
          <FormControl type="text" placeholder='Enter address' value={address} required onChange={(e) => setAddress(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup className='py-3' controlId='city'>
          <FormLabel>City</FormLabel>
          <FormControl type="text" placeholder='Enter city' value={city} required onChange={(e) => setCity(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup className='py-3' controlId='postalCode'>
          <FormLabel>Postal Code</FormLabel>
          <FormControl type="text" placeholder='Enter Postal Code' value={postalCode} required onChange={(e) => setPostalCode(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup className='py-3' controlId='country'>
          <FormLabel>Country</FormLabel>
          <FormControl type="text" placeholder='Enter country' value={country} required onChange={(e) => setCountry(e.target.value)}></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>Continue</Button>
      </Form>
    </FormContainer>
  )
}


export default ShippingScreen;