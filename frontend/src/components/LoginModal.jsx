
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userLogin, userSignup, organiserLogin, organiserSignup } from '../api/authApi';

export default function LoginModal({ onClose, setUser }) {
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  // Login form states
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');

  // Signup form states
  const [name, setName] = useState('');
  const [signupMobileNumber, setSignupMobileNumber] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupInterests, setSignupInterests] = useState([]);
  const [signupRole, setSignupRole] = useState('user');

  const interestOptions = [
    'technology',
    'music',
    'art',
    'food',
    'business',
    'health'
  ];

  const handleInterestToggle = (interest) => {
    if (signupInterests.includes(interest)) {
      setSignupInterests(signupInterests.filter(i => i !== interest));
    } else {
      setSignupInterests([...signupInterests, interest]);
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (role === 'user') {
        data = await userLogin({ mobileNumber, password, role });
      } else {
        data = await organiserLogin({ email: mobileNumber, password }); // Assuming organiser login uses email field, but mobileNumber is used here, may need adjustment
      }
      console.log('Login successful:', data);
      // You can add further actions like storing token, redirecting, etc.
      onClose();
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      alert('Login failed: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (signupRole === 'user') {
        data = await userSignup({ name, mobileNumber: signupMobileNumber, password: signupPassword, interests: signupInterests, role: signupRole });
      } else {
        data = await organiserSignup({ name, email: signupMobileNumber, password: signupPassword }); // Assuming organiser signup uses email field, but mobile number is used here, may need adjustment
      }
      console.log('Signup successful:', data);
      // You can add further actions like storing token, redirecting, etc.
      onClose();
    } catch (error) {
      console.error('Signup failed:', error.response?.data || error.message);
      alert('Signup failed: ' + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">{isLogin ? 'Login to Eventify' : 'Sign Up for Eventify'}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {isLogin ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="mobileNumber">
                Mobile Number
              </label>
              <input
                id="mobileNumber"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="role">
                Role
              </label>
              <select
                id="role"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="organiser">Organiser</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 rounded-md text-white font-medium bg-indigo-600 hover:bg-indigo-700"
            >
              Login
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(false)}
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Don't have an account? Sign Up
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleSignupSubmit}>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="signupMobileNumber">
                Mobile Number
              </label>
              <input
                id="signupMobileNumber"
                type="tel"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupMobileNumber}
                onChange={(e) => setSignupMobileNumber(e.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="signupPassword">
                Password
              </label>
              <input
                id="signupPassword"
                type="password"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupPassword}
                onChange={(e) => setSignupPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">
                Your Interests (Select at least one)
              </label>
              <div className="flex flex-wrap gap-2">
                {interestOptions.map(interest => (
                  <button
                    key={interest}
                    type="button"
                    onClick={() => handleInterestToggle(interest)}
                    className={`px-3 py-1 rounded-full text-sm capitalize ${
                      signupInterests.includes(interest)
                        ? 'bg-indigo-600 text-white'
                        : 'bg-gray-200 text-gray-700'
                    }`}
                  >
                    {interest}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="signupRole">
                Role
              </label>
              <select
                id="signupRole"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                value={signupRole}
                onChange={(e) => setSignupRole(e.target.value)}
              >
                <option value="user">User</option>
                <option value="organiser">Organiser</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={signupInterests.length === 0}
              className={`w-full py-2 px-4 rounded-md text-white font-medium ${
                signupInterests.length === 0
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-indigo-600 hover:bg-indigo-700'
              }`}
            >
              Sign Up
            </button>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(true)}
                className="text-indigo-600 hover:text-indigo-800 underline"
              >
                Already have an account? Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
