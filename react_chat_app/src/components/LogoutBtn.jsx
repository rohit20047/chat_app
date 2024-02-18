import React from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';

function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook

  const logout_ = async () => {
    try {
      await authService.logout();
      dispatch(logout());
      navigate('/signup'); // Use the navigate function to redirect
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  };

  return (
    <div>
      <button onClick={logout_}>Logout</button>
    </div>
  );
}

export default LogoutBtn;
