import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { getUserDetails, updateUser } from '../redux/actions/user.actions';
import { USER_UPDATE_RESET } from '../redux/constants/user.constants';

import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'; 


const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);

  const dispatch = useDispatch();
  
  const userDetails = useSelector(state => state.userDetails);
  const { loading, error, user } = userDetails;

  const userUpdate = useSelector(state => state.userUpdate);
  const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = userUpdate;

  useEffect(() => {
    if(successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userlist')
    } else {
      if(!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setIsAdmin(user.isAdmin)
      }
    }
  }, [dispatch, user, userId, history, successUpdate])

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(updateUser({ _id: userId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/userlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit User</h1>
        { loadingUpdate && <Loader /> }
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> }
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <FormGroup className='py-3' controlId='name'>
              <FormLabel>Name</FormLabel>
              <FormControl type="name" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='email'>
              <FormLabel>Email Address</FormLabel>
              <FormControl type="email" placeholder='Enter email' value={email} onChange={(e) => setEmail(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='isAdmin'>
              <FormCheck type='checkbox' label='Is Admin' checked={isAdmin} onChange={(e) => setIsAdmin(e.target.checked)}></FormCheck>
            </FormGroup>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}


export default UserEditScreen;