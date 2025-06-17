export default function FilterSection({ 
  filters, 
  onFilterChange, 
  onPriceRangeChange, 
  onSortChange, 
  sortBy 
}) {
  const categories = [
    { id: 'music', name: 'Music' },
    { id: 'networking', name: 'Networking' },
    { id: 'education', name: 'Education' },
    { id: 'community', name: 'Community' },
    { id: 'travel', name: 'Travel' },
    { id: 'gaming', name: 'Gaming' },
    { id: 'technology', name: 'Technology' }
  ];

  const eventTypes = [
    { id: 'in-person', name: 'In-person' },
    { id: 'virtual', name: 'Virtual' },
    { id: 'hybrid', name: 'Hybrid' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow sticky top-4">
      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Sort by</h3>
        <select
          value={sortBy}
          onChange={(e) => onSortChange(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="date">Date</option>
          <option value="attendees">Most Popular</option>
          <option value="price">Price</option>
        </select>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Categories</h3>
        <div className="space-y-2">
          {categories.map(category => (
            <div key={category.id} className="flex items-center">
              <input
                id={`cat-${category.id}`}
                type="checkbox"
                checked={filters.categories.includes(category.id)}
                onChange={() => onFilterChange('categories', category.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={`cat-${category.id}`} className="ml-2 text-gray-700 capitalize">
                {category.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-4">Event Type</h3>
        <div className="space-y-2">
          {eventTypes.map(type => (
            <div key={type.id} className="flex items-center">
              <input
                id={`type-${type.id}`}
                type="checkbox"
                checked={filters.eventTypes.includes(type.id)}
                onChange={() => onFilterChange('eventTypes', type.id)}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label htmlFor={`type-${type.id}`} className="ml-2 text-gray-700">
                {type.name}
              </label>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              id="price-all"
              type="radio"
              name="price-range"
              checked={filters.priceRange === 'all'}
              onChange={() => onPriceRangeChange('all')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="price-all" className="ml-2 text-gray-700">All Prices</label>
          </div>
          <div className="flex items-center">
            <input
              id="price-free"
              type="radio"
              name="price-range"
              checked={filters.priceRange === 'free'}
              onChange={() => onPriceRangeChange('free')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="price-free" className="ml-2 text-gray-700">Free Only</label>
          </div>
          <div className="flex items-center">
            <input
              id="price-paid"
              type="radio"
              name="price-range"
              checked={filters.priceRange === 'paid'}
              onChange={() => onPriceRangeChange('paid')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
            />
            <label htmlFor="price-paid" className="ml-2 text-gray-700">Paid Only</label>
          </div>
        </div>
      </div>
    </div>
  );
}