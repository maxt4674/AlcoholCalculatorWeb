import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/homepage';
import Calculators from './pages/calculatorsPage';

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('/api/pages')
      .then(res => {
        console.log(res.data);
        setPages(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        {pages.map(page => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            element={<Calculators slug={page.slug} />}
          />
        ))}
      </Routes>
    </Router>
  );
}

export default App;
