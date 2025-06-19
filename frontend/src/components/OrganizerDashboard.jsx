import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import EventForm from '../components/EventForm';

const OrganizerDashboard = () => {
  const { logout, token, organizer } = useAuth();
  console.log('Current organizer:', organizer);
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [isDeleting, setIsDeleting] = useState({});
  const [isCancelling, setIsCancelling] = useState({});
  const [editingEventId, setEditingEventId] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/events', {
            headers: { Authorization: `Bearer ${token}` }
          })
        ]);
        setEvents(eventsRes.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch data');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [token]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'scheduled': return 'bg-emerald-100 text-emerald-800 border border-emerald-200';
      case 'postponed': return 'bg-amber-100 text-amber-800 border border-amber-200';
      case 'cancelled': return 'bg-rose-100 text-rose-800 border border-rose-200';
      default: return 'bg-gray-100 text-gray-800 border border-gray-200';
    }
  };

  const handleCancelEvent = async (eventId) => {
    setIsCancelling(prev => ({ ...prev, [eventId]: true }));
    setError('');
    try {
      await axios.patch(
        `http://localhost:5000/api/events/${eventId}/status`,
        { status: 'cancelled' },
        { headers: { Authorization: `Bearer ${token}` }
       }
      );
      console.log('token',token);
      setEvents(events.map(event => 
        event._id === eventId ? { ...event, status: 'cancelled' } : event
      ));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to cancel event');
    } finally {
      setIsCancelling(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const handleDeleteEvent = async (eventId) => {
    if (!window.confirm('Are you sure you want to permanently delete this event?')) return;
    setIsDeleting(prev => ({ ...prev, [eventId]: true }));
    setError('');
    try {
      await axios.delete(
        `http://localhost:5000/api/${eventId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('token for delete event:',token);
      setEvents(events.filter(event => event._id !== eventId));
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Failed to delete event');
    } finally {
      setIsDeleting(prev => ({ ...prev, [eventId]: false }));
    }
  };

  const handleEditEvent = (event) => {
    setEditingEventId(event._id);
    setEditingEvent(event);
  };
  const handleEditClose = () => {
    setEditingEventId(null);
    setEditingEvent(null);
  };
  const handleEditSave = async (updatedEvent) => {
    // Refetch events to get the latest status/category from backend
    try {
      const res = await axios.get('http://localhost:5000/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setEvents(res.data);
    } catch (err) {
      setError('Failed to refresh events');
    }
    setEditingEventId(null);
    setEditingEvent(null);
  };

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  return (
    <div className="min-h-screen w-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      {/* Luxury Header */}
      <header className="w-full bg-white shadow-sm border-b border-gray-200">
        <div className="w-full px-8 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600 flex items-center">
            <svg className="h-8 w-8 text-indigo-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Eventify Pro
          </Link>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 bg-gray-50 rounded-full pl-1 pr-4 py-1 border border-gray-200">
              <img 
                src={organizer?.image || 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&h=100&q=80'} 
                alt="Organizer"
                className="h-10 w-10 rounded-full object-cover border-2 border-indigo-200 shadow-sm"
              />
              <div className="text-right">
                <p className="text-sm font-medium text-gray-700">{organizer?.name}</p>
                <p className="text-xs text-gray-500">{organizer?.organizationName}</p>
              </div>
            </div>
            <button 
              onClick={logout}
              className="text-gray-600 hover:text-gray-900 px-4 py-2 rounded-full text-sm font-medium hover:bg-gray-100 transition-all border border-gray-200 shadow-sm"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="flex-1 w-full flex flex-col items-center px-8 py-8 overflow-x-auto">
        {/* Dashboard Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 w-full max-w-7xl">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {organizer?.name}</h1>
            <p className="text-gray-600 mt-1">Manage your events and track performance</p>
          </div>
          <Link 
            to="/organizer/events/new"
            className="mt-4 md:mt-0 inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all transform hover:-translate-y-0.5"
          >
            <svg className="-ml-1 mr-2 h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Create New Event
          </Link>
        </div>
        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8 w-full max-w-7xl">
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-indigo-50 shadow-inner">
                <svg className="h-6 w-6 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Total Events</dt>
                <dd className="text-2xl font-semibold text-gray-900">{events.length}</dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-emerald-50 shadow-inner">
                <svg className="h-6 w-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Active Events</dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {events.filter(e => e.status === 'scheduled').length}
                </dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-amber-50 shadow-inner">
                <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Postponed</dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {events.filter(e => e.status === 'postponed').length}
                </dd>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-100 hover:shadow-lg transition-all transform hover:-translate-y-1">
            <div className="flex items-center">
              <div className="p-3 rounded-lg bg-rose-50 shadow-inner">
                <svg className="h-6 w-6 text-rose-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <div className="ml-5">
                <dt className="text-sm font-medium text-gray-500 truncate">Cancelled</dt>
                <dd className="text-2xl font-semibold text-gray-900">
                  {events.filter(e => e.status === 'cancelled').length}
                </dd>
              </div>
            </div>
          </div>
        </div>
        {/* Events Section */}
        <div className="w-full max-w-7xl mx-auto bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-indigo-50 to-purple-50">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Your Events</h3>
              <p className="mt-1 text-sm text-gray-600">All your created events</p>
            </div>
            <span className="text-sm font-medium text-gray-600 bg-white px-3 py-1 rounded-full shadow-sm">
              {events.length} {events.length === 1 ? 'event' : 'events'} found
            </span>
          </div>
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <svg className="animate-spin h-12 w-12 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            </div>
          ) : error ? (
            <div className="p-6 bg-red-50 border-l-4 border-red-500 text-red-700 rounded">
              <p>{error}</p>
            </div>
          ) : events.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="mt-4 text-lg font-medium text-gray-900">No events created yet</h3>
              <p className="mt-2 text-sm text-gray-500">Get started by creating your first event</p>
              <div className="mt-6">
                <Link
                  to="/organizer/events/new"
                  className="inline-flex items-center px-6 py-3 border border-transparent rounded-full shadow-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transform hover:-translate-y-0.5 transition-all"
                >
                  Create New Event
                </Link>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-8">
              {events.map(event => (
                <div key={event._id} className="p-6 rounded-2xl shadow-md bg-white border border-gray-100 hover:shadow-xl transition-all transform hover:-translate-y-1 flex flex-col justify-between h-full">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-xs font-semibold uppercase tracking-widest text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-100">
                        {event.category || 'General'}
                      </span>
                      <span className={`px-3 py-1 text-xs font-bold rounded-full ${getStatusColor(event.status)}`}>
                        {event.status}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold text-gray-900 mb-2">{event.title}</h4>
                    <p className="text-gray-600 text-base mb-4">{event.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-6 text-sm text-gray-500 font-medium">
                      <span className="inline-flex items-center">
                        <svg className="h-5 w-5 mr-1 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        {formatDate(event.date)}
                      </span>
                      <span className="inline-flex items-center">
                        <svg className="h-5 w-5 mr-1 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                        {event.location}
                      </span>
                    </div>
                  </div>
                  <div className="mt-6 flex space-x-3">
                    {editingEventId === event._id ? (
                      <div className="w-full max-w-xl mx-auto"><EventForm event={editingEvent} onClose={handleEditClose} onSave={handleEditSave} /></div>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEditEvent(event)}
                          className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-semibold rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleCancelEvent(event._id)}
                          disabled={event.status === 'cancelled' || isCancelling[event._id]}
                          className={`inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                            event.status === 'cancelled'
                              ? 'bg-gray-400 cursor-not-allowed'
                              : isCancelling[event._id]
                                ? 'bg-amber-500'
                                : 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
                          } transition-all`}
                        >
                          {isCancelling[event._id] ? 'Processing...' : event.status === 'cancelled' ? 'Cancelled' : 'Cancel'}
                        </button>
                        <button
                          onClick={() => handleDeleteEvent(event._id)}
                          disabled={isDeleting[event._id]}
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-semibold rounded-lg text-white bg-rose-600 hover:bg-rose-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 disabled:opacity-70 transition-all shadow-sm"
                        >
                          {isDeleting[event._id] ? 'Deleting...' : 'Delete'}
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default OrganizerDashboard;