"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import SelectionBar from "../components/SelectionBar";
import CategoryList from "../components/CategoryList";
import ImageCarousel from "@/components/ImageCarousel";
import StoresPage from "@/components/StoresPage";
import axios from "axios";

export default function Home() {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (term) => {
    setSearchTerm(term);
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/stores/search/${term}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <div>
      <Header />
      {!searchTerm && (
        <>
          <SelectionBar />
          <CategoryList />
          <ImageCarousel />
        </>
      )}
      <StoresPage />
      
    </div>
  );
}
