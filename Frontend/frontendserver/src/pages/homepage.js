import React from 'react';
import '../css/homepage.css';

const Home = () => {
  return <div className='hPage'>
    <div className='leftP'>
    </div>
    <div className='centerP'>
      <h1>Welcome to the Braxeator Calculators</h1>
      <h2>Features</h2>
      <div className='features'>
  	    <button>Calculators</button>
        <button>Brewing Data</button>
        <button>Marketplace</button>
      </div>
      <h2>About Us</h2>
      <p>---Put Stuff Here---</p>
    </div>
    <div className='rightP'>
    </div>
  </div>;
};

export default Home;