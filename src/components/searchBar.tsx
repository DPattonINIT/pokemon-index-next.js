"use client";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [query, setQuery] = useState("");

  return (
    <div className="searchContainer flex justify-center gap-1">
      <input
        type="text"
        placeholder="Search"
        className="searchbar border p-2 rounded-md"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button
        className="searchBTN bg-black p-2 rounded-md hover:bg-red-600"
        onClick={() => onSearch(query)}
      >
        Find
      </button>
    </div>
  );
};

export default SearchBar;

