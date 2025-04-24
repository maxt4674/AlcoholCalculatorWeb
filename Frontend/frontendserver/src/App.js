import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Home from './pages/homepage';
import Navbar from './components/navbar/navbarElements';
import Calculators from './pages/calculatorsPage';
import Footer from './components/footer/footer';
import NotFound from './pages/NotFound';
import CalcPage from './pages/editCalcPage';

function App() {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    axios.get('/pages')
      .then(res => {
        console.log(res.data);
        setPages(res.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/CalcPage" element={<CalcPage/>}></Route>
        {pages.map(page => (
          <Route
            key={page.slug}
            path={`/${page.slug}`}
            element={<Calculators slug={page.slug} />}
          />
        ))}
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
