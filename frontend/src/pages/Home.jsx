import React from 'react';
import Hero from '../components/Hero';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div>
      <Hero />
      <SearchBar />
      <div className="flex flex-col sm:flex-row gap-4 px-6 py-10">
        <Filters />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-4">Upcoming Events</h2>
          <EventList />
        </div>
      </div>
    </div>
  );
};

export default Home;
