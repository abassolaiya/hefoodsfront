"use client";

import React from "react";
import Header from "../components/Header";
import SelectionBar from "../components/SelectionBar";
import CategoryList from "../components/CategoryList";
import ImageCarousel from "../components/ImageCarousel";
import StoresPage from "../components/StoresPage";
import { useSearch } from "../context/SearchContext";
import { useCategorySearch } from "../context/CategorySearchContext";

export default function Home() {
  const { searchTerm } = useSearch();
  const { categorySearchTerm } = useCategorySearch();

  return (
    <div>
      <Header />
      {!searchTerm && <SelectionBar />}
      {!searchTerm && <CategoryList />}
      {!searchTerm && !categorySearchTerm && <ImageCarousel />}
      <StoresPage />
    </div>
  );
}
