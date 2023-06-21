import React from 'react';
import { auth } from 'C:\\Users\\Pc\\Desktop\\CH\\Lebanese University\\CS M1\\Semester 8\\info438 - android\\Prject\\NQueen\\nqueens\\firebase.js';

const Signout = () => {
  const handleSignOut = () => {
    try {
      auth.signOut();
      console.log('Logged out successfully!');
    } catch (error) {
      console.error('Error occurred during sign out:', error);
    }
  };

  handleSignOut();

  return null; // Render null or any other minimal content if required
};

export default Signout;
