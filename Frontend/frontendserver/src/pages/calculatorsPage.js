import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/calculatorsPage.css';

const Calculators = ({ slug }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`/api/pages/${slug}`)
      .then(res => setContent(res.data.content))
      .catch(err => console.error(err));
  }, [slug]);

  return (
    <div className='calcPage'>
      <div className='leftP'>

      </div>
      <div className='centerP'>
        <h1>{slug.toUpperCase()}</h1>
        <p>{content}</p>
      </div>
      <div className='rightP'>

      </div>
    </div>
  );
};

export default Calculators;