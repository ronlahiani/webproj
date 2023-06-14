import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import videoURL from "../WorkerBackGround.mp4";
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
    <div className="worker-screen">
    <video autoPlay loop muted className="background-video">
      <source src={process.env.PUBLIC_URL + videoURL} type="video/mp4" />
    </video>
    <h1>Worker Screen</h1>
    <button onClick={() => handleUserClick(emailM)}>My Tasks</button>
    <div className="users-container">
      {users.map((user) => (
        <button key={user._id} onClick={() => handleUserClick(user.name)}>
          {user.name}
        </button>
      ))}
    </div>
  </div>
  


  
  );
};

export default WorkerScreen;
