import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';
import FormContainer from '../components/FormContainer';

import { listProductDetails, updateProduct } from '../redux/actions/product.actions';
import { PRODUCT_UPDATE_RESET } from '../redux/constants/product.constants';

import { Form, Button, FormGroup, FormLabel, FormControl, FormCheck } from 'react-bootstrap'; 


const ProductEditScreen = ({ match, history }) => {
  const productId = match.params.id

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const dispatch = useDispatch();
  
  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  // const productUpdate = useSelector(state => state.productUpdate);
  // const { loading:loadingUpdate, error:errorUpdate, success:successUpdate } = productUpdate;

  useEffect(() => {
    // if(successUpdate) {
    //   dispatch({ type: PRODUCT_UPDATE_RESET })
    //   history.push('/admin/productlist')
    // } else {
      if(!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId))
      } else {
        setName(product.name)
        setPrice(product.price)
        setImage(product.image)
        setBrand(product.brand)
        setCategory(product.category)
        setCountInStock(product.countInStock)
        setDescription(product.description)
      }
    // }
  }, [dispatch, product, productId, history])

  const submitHandler = (e) => {
    e.preventDefault();
    // dispatch(updateProduct({ _id: productId, name, email, isAdmin }))
  }

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>Go Back</Link>
      <FormContainer>
        <h1>Edit Product</h1>
        {/* { loadingUpdate && <Loader /> }
        { errorUpdate && <Message variant='danger'>{errorUpdate}</Message> } */}
        { loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
          <Form onSubmit={submitHandler}>
            <FormGroup className='py-3' controlId='name'>
              <FormLabel>Name</FormLabel>
              <FormControl type="name" placeholder='Enter name' value={name} onChange={(e) => setName(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='price'>
              <FormLabel>Price</FormLabel>
              <FormControl type="number" placeholder='Enter price' value={price} onChange={(e) => setPrice(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='image'>
              <FormLabel>Image</FormLabel>
              <FormControl type="text" placeholder='Enter image url' value={image} onChange={(e) => setImage(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='brand'>
              <FormLabel>Brand</FormLabel>
              <FormControl type="text" placeholder='Enter brand' value={brand} onChange={(e) => setBrand(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='countInStock'>
              <FormLabel>Count In Stock</FormLabel>
              <FormControl type="number" placeholder='Enter countInStock' value={countInStock} onChange={(e) => setCountInStock(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='category'>
              <FormLabel>Category</FormLabel>
              <FormControl type="text" placeholder='Enter category' value={category} onChange={(e) => setCategory(e.target.value)}></FormControl>
            </FormGroup>
            <FormGroup className='py-3' controlId='description'>
              <FormLabel>Description</FormLabel>
              <FormControl type="text" placeholder='Enter description' value={description} onChange={(e) => setDescription(e.target.value)}></FormControl>
            </FormGroup>
            <Button type='submit' variant='primary'>Update</Button>
          </Form>
        )}
      </FormContainer>
    </>
  )
}


export default ProductEditScreen;