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
        <h2>Username: {user.username}</h2>
        <p>Email: {user.email}</p>
        <p>User Type: {user.userType}</p>
    </div>
  );
};

export default Account;