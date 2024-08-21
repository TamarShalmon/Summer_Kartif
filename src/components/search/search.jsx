"use client";

import { useState } from 'react';

function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);

    const handleSearch = async () => {
        const response = await fetch(`/api/search?query=${searchQuery}`);
        const data = await response.json();
        setResults(data);
    };

    return (
        <div>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="חפש פוסטים"
            />
            <button onClick={handleSearch}>חפש</button>

            <ul>
                {results.map((post) => (
                    <li key={post.id}>{post.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default Search
