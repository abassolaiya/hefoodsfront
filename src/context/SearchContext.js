import React, { createContext, useContext, useState } from "react";

// Create a new context object
const SearchContext = createContext();

// Custom hook to access search context
export const useSearch = () => {
  return useContext(SearchContext);
};

// Provider component for managing search state
export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState(""); // Initialize searchTerm with an empty string

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </SearchContext.Provider>
  );
};
