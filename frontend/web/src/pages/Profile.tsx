import React, { useEffect, useState } from 'react';
import '../../styles/Profile.css';

interface User {
  name: string;
  email: string;
  image_url: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) setUser(JSON.parse(userData));
  }, []);

  if (!user) {
    return (
      <div className="profile-page">
        <h2>Profile</h2>
        <p>You are not signed in.</p>
        <a href="/auth" className="btn-signin">Sign In</a>
      </div>
    );
  }

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.image_url} alt="Profile" className="profile-pic" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
      <div className="profile-actions">
        <a href="/forum" className="btn-forum">Go to Forum</a>
        <a href="/chatbot" className="btn-chatbot">Try Chatbot</a>
        <button className="btn-signout" onClick={() => {
          localStorage.removeItem('user');
          window.location.reload();
        }}>Sign Out</button>
      </div>
    </div>
  );
};

export default Profile;
