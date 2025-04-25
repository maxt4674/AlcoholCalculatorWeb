import React from 'react';
import '../css/notfound.css';

export default function Forbidden() {
  return (
    <div className='notfound'>
      <h1>403 - Forbidden</h1>
      <p>You cannot access this page.</p>
      <p>Click below to return home</p>
      <a href="/">Return Home</a>
    </div>
  );
}