import React, { useState } from 'react';

export default function ShelfSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const response = await fetch(
        `https://api.discogs.com/database/search?q=${encodeURIComponent(query)}&type=release&token=vyocBCvdhzngEvJrcrzxskfvAOSZZJYIoXpQGqhT
`
      );
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching from Discogs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white p-10 text-black">
      <h1 className="text-3xl font-bold mb-6">Add records to your <i>shelf.</i></h1>
      <div className="flex gap-2 mb-6">
        <input
          className="border border-gray-300 px-4 py-2 w-full"
          type="text"
          placeholder="Search for vinyl..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="bg-black text-white px-4 py-2"
        >
          Search
        </button>
      </div>

      {loading && <p>Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((record) => (
          <div key={record.id} className="border p-4">
            <img src={record.cover_image} alt={record.title} className="w-full h-auto mb-2" />
            <h2 className="text-lg font-semibold">{record.title}</h2>
            <p className="text-sm text-gray-600">{record.year} • {record.country}</p>
            <p className="text-sm text-gray-600">{record.label?.[0]}</p>
            <button className="mt-2 underline">add to shelf</button>
          </div>
        ))}
      </div>
    </div>
  );
}
