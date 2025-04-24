import React from 'react';
import '../css/notfound.css';

export default function NotFound() {
  return (
    <div className='notfound'>
      <h1>404 - Not Found</h1>
      <p>This page does not exist.</p>
      <p>Click below to return home</p>
      <a href="/">Return Home</a>
    </div>
  );
}