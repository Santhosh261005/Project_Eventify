import { useState, useRef, useEffect } from 'react';

export default function Header({ isLoggedIn, username, onLoginClick, onLogoutClick, onOrganizeClick }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-xl font-bold text-indigo-700">Eventify</span>
        </div>

        <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="flex items-center justify-center w-10 h-10 rounded-full border border-gray-300 bg-gray-100 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-haspopup="true"
            aria-expanded={dropdownOpen}
          >
            {isLoggedIn && username ? (
              <span className="text-indigo-700 font-semibold">{username.charAt(0).toUpperCase()}</span>
            ) : (
              <span className="w-6 h-6 rounded-full bg-gray-300 block"></span>
            )}
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
              <ul className="py-1">
                {!isLoggedIn ? (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onLoginClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      >
                        Login
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          // Placeholder for settings action
                          alert('Settings clicked');
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      >
                        Settings
                      </button>
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          onLogoutClick();
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      >
                        Logout
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={() => {
                          setDropdownOpen(false);
                          // Placeholder for settings action
                          alert('Settings clicked');
                        }}
                        className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-indigo-100"
                      >
                        Settings
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </div>
          )}

          {isLoggedIn && (
            <button
              onClick={onOrganizeClick}
              className="hidden sm:inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition ml-4"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Create Event
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
