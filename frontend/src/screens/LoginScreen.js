import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { login } from '../redux/actions/user.actions';

import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'; 


const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('')

  const redirect = location.search ? location.search.split('=')[1] : '/';

  const dispatch = useDispatch();
  const userLogin = useSelector(state => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if(userInfo) {
      history.push(redirect)
    }
  }, [history, userInfo, redirect])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password))
  }

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      <Form onSubmit={submitHandler}>
        <FormGroup className='py-3' controlId='email'>
          <FormLabel>Email Address</FormLabel>
          <FormControl type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
        </FormGroup>
        <FormGroup className='py-3' controlId='password'>
          <FormLabel>Password</FormLabel>
          <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
        </FormGroup>
        <Button type='submit' variant='primary'>Sign In</Button>
      </Form>

      <Row className='py-3'>
        <Col>
          New Customer? <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link>
        </Col>
      </Row>
    </FormContainer>
  )
}


export default LoginScreen;