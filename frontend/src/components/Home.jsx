//reference homepage
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 to-purple-800 flex flex-col items-center justify-center p-6 text-white">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">Welcome to Eventify</h1>
        <p className="text-xl mb-10 text-gray-200">
          The premier platform for event organizers to create and manage amazing events
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-6">
          <Link 
            to="/organizer/signin" 
            className="bg-white text-indigo-900 px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Organizer Sign In
          </Link>
          <Link 
            to="/organizer/signup" 
            className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-indigo-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Become an Organizer
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl">
        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20">
          <h3 className="text-xl font-bold mb-3">Create Events</h3>
          <p className="text-gray-200">Easily create and manage your events with our intuitive dashboard</p>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20">
          <h3 className="text-xl font-bold mb-3">Track Registrations</h3>
          <p className="text-gray-200">Monitor attendee registrations and engagement in real-time</p>
        </div>
        <div className="bg-white bg-opacity-10 p-6 rounded-xl backdrop-blur-sm border border-white border-opacity-20">
          <h3 className="text-xl font-bold mb-3">Analytics</h3>
          <p className="text-gray-200">Get detailed insights into your event performance</p>
        </div>
      </div>
    </div>
  );
};

export default Home;