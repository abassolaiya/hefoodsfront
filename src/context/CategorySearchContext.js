"use client";

import React, { createContext, useContext, useState } from "react";

const CategorySearchContext = createContext();

export const CategorySearchProvider = ({ children }) => {
  const [categorySearchTerm, setCategorySearchTerm] = useState("");

  return (
    <CategorySearchContext.Provider
      value={{ categorySearchTerm, setCategorySearchTerm }}
    >
      {children}
    </CategorySearchContext.Provider>
  );
};

export const useCategorySearch = () => {
  const context = useContext(CategorySearchContext);
  return context;
};