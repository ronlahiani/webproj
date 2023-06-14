import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
const WorkerScreen = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;
  const emailM=data.key;
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const response = await fetch('/api/users');
      const responseData = await response.json();
      const usersData = responseData.filter(user => user.type === 'Worker'); // Filter users by type "Worker"
      setUsers(usersData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUserClick = ( email) => {
    console.log(email);
    const data = { key: email };
    navigate('/home',  { state: data });
  };

  return (
    <div>
      <h1>Worker Screen</h1>
      <button onClick={() => handleUserClick(emailM)}>
       my Tasks
        </button>
      {users.map((user) => (
        <button key={user._id} onClick={() => handleUserClick(user.name)}>
        {user.name}
      </button>
      
      ))}
    </div>
  );
};

export default WorkerScreen;
