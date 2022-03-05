import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
  return (
    <div>
      <h1>404</h1>
      <h3>Page not found.</h3>
      <br />
      <Link to='/' className='btn btn-success'>Home</Link>
    </div>
  );
};

export default NoMatch;