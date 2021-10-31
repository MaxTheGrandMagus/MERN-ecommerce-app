import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { listProductDetails, createProductReview } from '../redux/actions/product.actions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/product.constants';

import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Meta from '../components/Meta';

import { Row, Col, Image, ListGroup, Card, Button, ListGroupItem, FormControl, Form, FormGroup, FormLabel } from 'react-bootstrap';


const ProductScreen = ({ history, match }) => {
  const [qty, setQty] = useState(1);  
  const [rating, setRating] = useState(0);  
  const [comment, setComment] = useState('');  

  const dispatch = useDispatch();

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { loading: loadingProductReview, error:errorProductReview, success:successProductReview } = productReviewCreate;

  useEffect(() => {
    if(successProductReview) {
      setRating(0)
      setComment('')
    }
    if (!product._id || product._id !== match.params.id) {
      dispatch(listProductDetails(match.params.id))
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET })
    }
  }, [dispatch, match, successProductReview, product])

  const addToCartHandler = () => {
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(createProductReview(match.params.id, { rating, comment }))
  }


  return (
    <>
      <Link to="/" className="btn btn-light my-3">Go Back</Link> 
      { loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Meta title={product.name} />
            <Row>
              <Col md={6}>
                <Image src={product.image} alt={product.name} fluid />
              </Col>
              <Col md={3}>
                <ListGroup variant="flush">
                  <ListGroupItem><h3>{product.name}</h3></ListGroupItem>
                  <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                  </ListGroupItem>
                  <ListGroupItem>Price: ${product.price}</ListGroupItem>
                  <ListGroupItem>Description: {product.description}</ListGroupItem>
                </ListGroup>
              </Col>
              <Col md={3}>
                <Card>
                  <ListGroup variant="flush">
                    <ListGroupItem>
                      <Row>
                        <Col>Price:</Col>
                        <Col><strong>${product.price}</strong></Col>
                      </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                      <Row>
                        <Col>Status:</Col>
                        <Col>{product.countInStock > 0 ? 'In Stock' : 'Out of stock'}</Col>
                      </Row>
                    </ListGroupItem>
                    {product.countInStock > 0 && (
                      <ListGroupItem>
                        <Row>
                          <Col>Qty</Col>
                          <Col>
                            <FormControl as='select' value={qty} onChange={(e) => setQty(e.target.value)}>
                              {
                                [...Array(product.countInStock).keys()].map(x => (
                                  <option key={x + 1} value={x + 1}>
                                    {x + 1}
                                  </option>
                                ))
                              }
                            </FormControl>
                          </Col>
                        </Row>
                      </ListGroupItem>
                    )}
                    <ListGroupItem className="d-grid gap-2">
                      <Button 
                        onClick={addToCartHandler}
                        disabled={product.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </ListGroupItem>
                  </ListGroup>
                </Card>
              </Col>
            </Row>
            <Row className='mt-3'>
              <Col md={6}>
                <h2>Reviews</h2>
                { product.reviews.length === 0 && <Message>No Reviews</Message> }
                <ListGroup variant='flush'>
                  {product.reviews.map(review => (
                    <ListGroupItem key={review._id}>
                      <strong>{review.name}</strong>
                      <Rating value={review.rating} />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroupItem>
                  ))}
                  <ListGroupItem>
                    <h2>Write a Customer Review</h2>
                    {successProductReview && (<Message variant='success'>Review submitted successfully</Message>)}
                    {loadingProductReview && <Loader />}
                    {errorProductReview && (<Message variant='danger'>{errorProductReview}</Message>)}
                    {userInfo ? (
                      <Form onSubmit={submitHandler}>
                        <FormGroup className='mt-3' controlId='rating'>
                          <FormLabel>Rating</FormLabel>
                          <FormControl as='select' value={rating} onChange={(e) => setRating(e.target.value)}>
                            <option value=''>Select...</option>
                            <option value='1'>1 - Poor</option>
                            <option value='2'>2 - Fair</option>
                            <option value='3'>3 - Good</option>
                            <option value='4'>4 - Very Good</option>
                            <option value='5'>5 - Excellent</option>
                          </FormControl>
                        </FormGroup>
                        <FormGroup className='mt-3' controlId='comment'>
                          <FormLabel>Comment</FormLabel>
                          <FormControl as='textarea' row='3' value={comment} onChange={(e) => setComment(e.target.value)}>
                          </FormControl>
                        </FormGroup>
                        <Button className='mt-3' type='submit' variant='primary' disabled={loadingProductReview}>Submit</Button>
                      </Form>
                    ) : (
                      <Message>Please <Link to='/login'>sign in</Link> to write a review</Message>
                    )}
                  </ListGroupItem>
                </ListGroup>
              </Col>
            </Row>
          </>
        )
      }
    </>
  )
}

export default ProductScreen
