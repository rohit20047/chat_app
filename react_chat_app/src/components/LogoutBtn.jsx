import React from 'react';
import authService from '../appwrite/auth';
import { useDispatch } from 'react-redux';
import { logout } from '../store/authSlice';
import { useNavigate } from 'react-router-dom';
import { LogOut } from 'react-feather'
function LogoutBtn() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use the useNavigate hook

  const logout_ = async () => {
    try {
      await authService.logout();
      localStorage.clear();
      dispatch(logout());
      navigate('/signup'); // Use the navigate function to redirect
    } catch (error) {
      console.log("Appwrite service :: logout :: error", error);
    }
  };

  return (
    <div>
      <LogOut className=' text-yellow-500 cursor-pointer' onClick={logout_}>Logout</LogOut>
    </div>
  );
}

export default LogoutBtn;
