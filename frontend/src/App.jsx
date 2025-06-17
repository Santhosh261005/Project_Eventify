import { useState } from 'react';
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
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [filters, setFilters] = useState({
    categories: [],
    eventTypes: [],
    priceRange: 'all'
  });

  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Tech Innovators Conference 2024',
      description: 'Annual gathering of tech leaders and innovators showcasing the latest advancements',
      date: '2024-12-28T10:00:00',
      location: 'San Francisco, CA',
      category: 'technology',
      eventType: 'in-person',
      price: 0,
      attendees: 245,
      organizer: 'TechCorp',
      image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 2,
      title: 'Startup Networking Mixer',
      description: 'Connect with fellow entrepreneurs and investors in a casual setting',
      date: '2024-12-30T18:00:00',
      location: 'Austin, TX',
      category: 'networking',
      eventType: 'in-person',
      price: 20,
      attendees: 89,
      organizer: 'StartupHub',
      image: 'https://images.unsplash.com/photo-1521737711867-e3b97375f902?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 3,
      title: 'Digital Marketing Masterclass',
      description: 'Learn advanced digital marketing strategies from industry experts',
      date: '2025-01-05T14:00:00',
      location: 'Virtual Event',
      category: 'education',
      eventType: 'virtual',
      price: 49,
      attendees: 156,
      organizer: 'MarketPro',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 4,
      title: 'Community Volunteer Day',
      description: 'Join us for a day of giving back to our local community',
      date: '2025-01-10T09:00:00',
      location: 'Central Park, NY',
      category: 'community',
      eventType: 'in-person',
      price: 0,
      attendees: 320,
      organizer: 'City Volunteers',
      image: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 5,
      title: 'Gaming Tournament Finals',
      description: 'Watch the finals of our annual gaming championship',
      date: '2025-01-15T12:00:00',
      location: 'Los Angeles, CA',
      category: 'gaming',
      eventType: 'hybrid',
      price: 25,
      attendees: 180,
      organizer: 'GameZone',
      image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    },
    {
      id: 6,
      title: 'Travel Photography Workshop',
      description: 'Learn how to capture stunning travel photos from professionals',
      date: '2025-01-20T11:00:00',
      location: 'Miami, FL',
      category: 'travel',
      eventType: 'in-person',
      price: 75,
      attendees: 42,
      organizer: 'WanderLens',
      image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
    }
  ]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleAddEvent = (newEvent) => {
    setEvents([...events, {
      ...newEvent,
      id: events.length + 1,
      attendees: 0,
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'
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
          onLogin={handleLogin}
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