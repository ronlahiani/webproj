import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const WorkerScreen = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

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

  const handleUserClick = (userId) => {
    navigate(`/home/${userId}`);
  };

  return (
    <div>
      <h1>Worker Screen</h1>
      {users.map((user) => (
        <button key={user._id} onClick={() => handleUserClick(user._id)}>
          {user.name}
        </button>
      ))}
    </div>
  );
};

export default WorkerScreen;
