import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { getUserDetails, updateUserProfile } from '../redux/actions/user.actions';

import { Form, Button, Row, Col, FormGroup, FormLabel, FormControl } from 'react-bootstrap'; 


const ProfileScreen = ({ location, history }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState(null);

  const dispatch = useDispatch();

  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector(state => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  useEffect(() => {
    if(!userInfo) {
      history.push('/login')
    } else {
      if(!user.name) {
        dispatch(getUserDetails('profile'))
      } else {
        setName(user.name)
        setEmail(user.email)
      }
    }
  }, [dispatch, history, userInfo, user])

  const submitHandler = (e) => {
    e.preventDefault();
    if(password !== confirmPassword) {
      setMessage('Passwords do not match')
    } else {
      dispatch(updateUserProfile({ id: user._id, name, email, password }))
    }
  }

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>Profile Updated</Message>}
        {loading && <Loader />}
        <Form onSubmit={submitHandler}>
          <FormGroup className='py-3' controlId='name'>
            <FormLabel>Name</FormLabel>
            <FormControl type="name" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup className='py-3' controlId='email'>
            <FormLabel>Email Address</FormLabel>
            <FormControl type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup className='py-3' controlId='password'>
            <FormLabel>Password</FormLabel>
            <FormControl type='password' placeholder='Enter password' value={password} onChange={(e) => setPassword(e.target.value)}></FormControl>
          </FormGroup>
          <FormGroup className='py-3' controlId='confirmPassword'>
            <FormLabel>Confirm Password</FormLabel>
            <FormControl type='password' placeholder='Confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}></FormControl>
          </FormGroup>
          <Button type='submit' variant='primary'>Update</Button>
        </Form>
      </Col>
      <Col md={9}>
        <h2>My orders</h2>
      </Col>
    </Row>
  )
}


export default ProfileScreen;