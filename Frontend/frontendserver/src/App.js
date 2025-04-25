import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/homepage';
import Calculators from './pages/calculatorsPage';
import NotFound from './pages/NotFound';
import CalcPage from './pages/editCalcPage';
import PrivateRoute from './components/Authentication/privateRoute';
import Login from './pages/login';
import Layout from './components/Layout/layout';
import Register from './pages/register';
import Account from './pages/account';
import AdminRoute from './components/Authentication/adminRoute';
import { useAuth } from './components/Authentication/authContext';

function App() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    axios.get('/pages')
      .then(res => {
        setPages(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/register" element={<Register />} />
        <Route element={<Layout/>}>
          <Route path="/" element={<Home />} />

          <Route
            path="/CalcPage"
            element={<AdminRoute element={<CalcPage />} />}
          />
          <Route
            path="/account"
            element={<PrivateRoute element={<Account/>}/>}
          />

          {loading ? (
            <Route path="*" element={<p>Loading pages...</p>} />
          ) : (
            pages.map(page => (
              <Route
                key={page.slug}
                path={`/${page.slug}`}
                element={<Calculators slug={page.slug} />}
              />
            ))
          )}
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
