"use client";

import React, { useState } from "react";
import Header from "../components/Header";
import SelectionBar from "../components/SelectionBar";
import CategoryList from "../components/CategoryList";
import ImageCarousel from "../components/ImageCarousel"; // Adjusted import path
import StoresPage from "../components/StoresPage"; // Adjusted import path
import axios from "axios";

export default function Home() {
  return (
    <div>
      <Header />
      <SelectionBar />
      <CategoryList />
      <ImageCarousel />
      <StoresPage />
    </div>
  );
}
