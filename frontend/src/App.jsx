<<<<<<< HEAD
import { useState, useEffect } from 'react';

import Header from './components/Header';
import HeroSection from './components/HeroSection';
import EventCard from './components/EventCard';
import FilterSection from './components/FilterSection';
import LoginModal from './components/LoginModal';
import OrganizeEventModal from './components/OrganizeEventModal';

function App() {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showOrganizeModal, setShowOrganizeModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    categories: [],
    eventTypes: [],
    priceRange: 'all'
  });

  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/events');
        if (!response.ok) {
          throw new Error('Failed to fetch events');
        }
        const data = await response.json();

        // Helper function to get image URL based on event description keywords
        const getImageUrl = (description) => {
          const desc = description.toLowerCase();
          if (desc.includes('tech') || desc.includes('developer') || desc.includes('startup')) {
            return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80';
          } else if (desc.includes('marketing') || desc.includes('business')) {
            return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80';
          } else if (desc.includes('community') || desc.includes('volunteer')) {
            return 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1350&q=80';
          } else if (desc.includes('gaming') || desc.includes('tournament')) {
            return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1350&q=80';
          } else if (desc.includes('travel') || desc.includes('photography')) {
            return 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1350&q=80';
          } else {
            return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1350&q=80';
          }
        };

        // Map events to add dynamic image URLs
        const eventsWithImages = data.map(event => ({
          ...event,
          image: getImageUrl(event.description)
        }));

        setEvents(eventsWithImages);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };

    fetchEvents();

    // Initialize user from localStorage
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, {
      ...newEvent,
      id: events.length + 1,
      attendees: 0,
      image: (() => {
        const desc = newEvent.description.toLowerCase();
        if (desc.includes('tech') || desc.includes('developer') || desc.includes('startup')) {
          return 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1350&q=80';
        } else if (desc.includes('marketing') || desc.includes('business')) {
          return 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1350&q=80';
        } else if (desc.includes('community') || desc.includes('volunteer')) {
          return 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1350&q=80';
        } else if (desc.includes('gaming') || desc.includes('tournament')) {
          return 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=1350&q=80';
        } else if (desc.includes('travel') || desc.includes('photography')) {
          return 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=1350&q=80';
        } else {
          return 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=1350&q=80';
        }
      })()
    }]);
    setShowOrganizeModal(false);
  };

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const handlePriceRangeChange = (range) => {
    setFilters(prev => ({ ...prev, priceRange: range }));
  };

  const filteredEvents = events.filter(event => {
    // Search filter
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Category filter
    const matchesCategory = filters.categories.length === 0 || 
      filters.categories.includes(event.category);
    
    // Event type filter
    const matchesEventType = filters.eventTypes.length === 0 || 
      filters.eventTypes.includes(event.eventType);
    
    // Price range filter
    let matchesPrice = true;
    if (filters.priceRange === 'free') {
      matchesPrice = event.price === 0;
    } else if (filters.priceRange === 'paid') {
      matchesPrice = event.price > 0;
    }
    
    return matchesSearch && matchesCategory && matchesEventType && matchesPrice;
  });

  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(a.date) - new Date(b.date);
    } else if (sortBy === 'attendees') {
      return b.attendees - a.attendees;
    } else if (sortBy === 'price') {
      return a.price - b.price;
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        isLoggedIn={isLoggedIn} 
        username={user ? user.name : ''}
        onLoginClick={() => setShowLoginModal(true)} 
        onLogoutClick={handleLogout}
        onOrganizeClick={() => setShowOrganizeModal(true)}
      />
      
      <HeroSection 
        onSearch={setSearchQuery}
        onOrganizeClick={() => setShowOrganizeModal(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <FilterSection 
              filters={filters}
              onFilterChange={handleFilterChange}
              onPriceRangeChange={handlePriceRangeChange}
              onSortChange={setSortBy}
              sortBy={sortBy}
            />
          </div>
          
          <div className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                Upcoming Events <span className="text-gray-500 text-lg">({sortedEvents.length} events found)</span>
              </h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>
        </div>
      </main>

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          setUser={(user) => {
            handleLogin();
            setUser(user);
            if (user.role === 'organiser') {
              // Redirect organiser to organiser dashboard
              window.location.href = '/organizerDashboard';
            } else {
              // For user, stay on home page and store user info
              localStorage.setItem('user', JSON.stringify(user));
            }
          }}
        />
      )}

      {showOrganizeModal && (
        <OrganizeEventModal 
          onClose={() => setShowOrganizeModal(false)} 
          onSubmit={handleAddEvent}
        />
      )}
    </div>
  );
}

export default App;
=======
import { Routes, Route, Navigate } from 'react-router-dom';
import OrganizerSignup from './components/OrganizerSignup';
import OrganizerSignin from './components/OrganizerSignin';
import OrganizerDashboard from './components/OrganizerDashboard';
import Home from './components/Home';
import EventForm from './components/EventForm';
import { useAuth } from './context/AuthContext';

function App() {
  const { token } = useAuth();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/organizer/signup" element={<OrganizerSignup />} />
      <Route path="/organizer/signin" element={<OrganizerSignin />} />
      <Route
        path="/organizer/dashboard"
        element={token ? <OrganizerDashboard /> : <Navigate to="/organizer/signin" />}
      />
        <Route path="/organizer/events/new" element={<EventForm />} />
          <Route path="/organizer/events/:id" element={<EventForm />} />
    </Routes>
  );
}

export default App;
>>>>>>> organizer
