import React, { useState } from 'react';
import { Form, Button, FormControl } from 'react-bootstrap';


const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault();
    if(keyword.trim()) {
      history.push(`/search/${keyword}`)
    } else {
      history.push('/')
    }
  }

  return (
    <Form className='d-flex flex-row' onSubmit={submitHandler} inline>
      <FormControl className='me-sm-2 ms-sm-5' type='text' name='q' onChange={(e) => setKeyword(e.target.value)} placeholder='Search Products...'></FormControl>
      <Button type='submit' variant='outline-success' className='p-2'>Search</Button>
    </Form>
  )
}

export default SearchBox
