import React from 'react';
import { useAuth } from '../components/Authentication/authContext';
import '../css/account.css';

const Account = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <div>Please log in to view your account details.</div>;
  }

  return (
    <div className='accountPage'>
      <div className='leftP'></div>
      <div className='centerP'>
        <h2>Account Details</h2>
        <p>Username: {user.username}</p>
        <p>Email: {user.email}</p>
        <p>User Type: {user.userType}</p>
      </div>
      <div className='rightP'></div>
    </div>
  );
};

export default Account;