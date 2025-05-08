import React, { useState } from 'react';

function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  
  const handleSearch = async () => {
    const res = await fetch(
      `https://api.discogs.com/database/search?q=${query}&type=release&token=vyocBCvdhzngEvJrcrzxskfvAOSZZJYIoXpQGqhT`
    );
    const data = await res.json();

    if (data.results && data.results.length > 0) {
      const withRatings = data.results.filter(r => r.community && r.community.have);
      const sorted = withRatings.sort((a, b) => b.community.have - a.community.have);
      setResults(sorted.slice(0, 1)); // only top-rated
    } else {
      setResults([]);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div style={{ padding: '40px', fontFamily: "'IBM Plex Mono', monospace", textAlign: 'center' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: 'ShelfFont', fontSize: '23px', fontStyle: 'italic' }}>shelf.</span>
        <div style={{ width: '24px', height: '24px', borderRadius: '50%', border: '1px solid black' }} />
      </div>

      {/* Search Bar */}
      <div style={{ marginTop: '80px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <input
          type="text"
          placeholder="add records to your snelf."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          style={{
            padding: '16px',
            fontSize: '18px',
            width: '400px',
            fontFamily: "'IBM Plex Mono', monospace",
            border: '1px solid #999',
          }}
        />
        <button onClick={handleSearch} style={{ marginLeft: '8px', cursor: 'pointer' }}>🔍</button>
      </div>

      {/* Result */}
      {results.length > 0 && (
        <div style={{ marginTop: '60px' }}>
          <img
            src={results[0].cover_image}
            alt={results[0].title}
            style={{ width: '250px', border: '8px solid yellow', marginBottom: '20px' }}
          />
          <div style={{ fontWeight: 'bold' }}>{results[0].title}</div>
          <div style={{ color: '#666' }}>{results[0].year} • {results[0].country}</div>
          <div style={{ marginTop: '12px' }}>
            <a href="#" style={{ marginRight: '24px', fontSize: '12px' }}>add to your snelf</a>
            <a href="#" style={{ fontSize: '12px' }}>add to wishlist</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
