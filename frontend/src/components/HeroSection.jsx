export default function HeroSection({ onSearch, onOrganizeClick }) {
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Amazing Events</h1>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Find events that match your interests, connect with like-minded people, and create unforgettable experiences.
        </p>
        
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-8">
          <button 
            onClick={onOrganizeClick}
            className="px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg hover:bg-gray-100 transition"
          >
            Create Your Event
          </button>
          <button className="px-6 py-3 border-2 border-white font-semibold rounded-lg hover:bg-white hover:bg-opacity-10 transition">
            Browse Events
          </button>
        </div>
        
        <div className="max-w-2xl mx-auto">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for events, categories, or locations..."
              className="w-full px-6 py-4 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              onChange={(e) => onSearch(e.target.value)}
            />
            <button className="absolute right-2 top-2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}