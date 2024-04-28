
'use client'
import { useState, useEffect } from 'react';
import axios from 'axios';

const UsersPage = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8000/users');
      setUsers(response.data);
    } catch (error) {
      console.error('You Dumb *** nigga!! there were errors while you fetching :', error);
    }
  };

  return (
    <div>
      <h1>Users</h1>
     
    </div>
  );
};

export default UsersPage;