import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Calculators = ({ slug }) => {
  const [content, setContent] = useState('');

  useEffect(() => {
    axios.get(`/api/pages/${slug}`)
      .then(res => setContent(res.data.content))
      .catch(err => console.error(err));
  }, [slug]);

  return (
    <div>
      <h1>{slug.toUpperCase()}</h1>
      <p>{content}</p>
    </div>
  );
};

export default Calculators;