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

      {/* Search Bar */}
      <div style={{ marginTop: '80px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ position: 'relative', display: 'inline-block' }}>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              padding: '16px',
              fontSize: '18px',
              width: '400px',
              fontFamily: "'IBM Plex Mono', monospace",
              border: '1px solid #999',
              position: 'relative',
              zIndex: 2,
              background: 'transparent',
            }}
          />
          {query === '' && (
            <div
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '16px',
                fontFamily: "'IBM Plex Mono', monospace",
                color: '#888',
                pointerEvents: 'none',
                zIndex: 1,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <span>add records to your&nbsp;</span>
              <span style={{ fontFamily: 'ShelfFont', fontStyle: 'italic', fontSize: '18px', color: '#000' }}>shelf.</span>
            </div>
          )}
          <img
            src="/search-icon-2048x2048-cmujl7en.png"
            alt="Search"
            onClick={handleSearch}
            style={{
              position: 'absolute',
              right: '16px',
              top: '50%',
              transform: 'translateY(-50%) scaleX(-1)',
              width: '10px',
              opacity: 0.5,
              cursor: 'pointer',
              zIndex: 2
            }}
          />
        </div>
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
            <a href="#" style={{ marginRight: '24px', fontSize: '12px' }}>add to your shelf</a>
            <a href="#" style={{ fontSize: '12px' }}>add to wishlist</a>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
