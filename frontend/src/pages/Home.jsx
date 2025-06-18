import { useEffect, useState } from 'react';

export default function Home() {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Assuming user info is stored in localStorage after login
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  return (
    <div className="container mx-auto p-4">
      {userName ? (
        <h1 className="text-2xl font-bold">Hello {userName}</h1>
      ) : (
        <h1 className="text-2xl font-bold">Welcome to Eventify</h1>
      )}
      {/* Rest of the home page content */}
    </div>
  );
}
