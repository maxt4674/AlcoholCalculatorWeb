import React from 'react';
import Navbar from '../navbar/navbarElements';
import Footer from '../footer/footer';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;