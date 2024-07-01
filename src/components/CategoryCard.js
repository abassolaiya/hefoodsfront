"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  Divider,
  IconButton,
} from "@mui/material";
import Image from "next/image";
import axios from "axios";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const categories = [
  { name: "FREE DRINKS", url: "http://127.0.0.1:5000/api/v1/stores" },
  {
    name: "Amala Hotspot 🔥",
    url: "http://127.0.0.1:5000/api/v1/stores?category=Amala Hotspot 🔥",
  },
  {
    name: "Hand Picked for you!😋",
    url: "http://127.0.0.1:5000/api/v1/stores?category=Hand Picked for you!😋",
  },
  {
    name: "Promos 4 You! 😍",
    url: "http://127.0.0.1:5000/api/v1/stores?category=Promos 4 You! 😍",
  },
  {
    name: "Finger Foods🍕🥯",
    url: "http://127.0.0.1:5000/api/v1/stores?category=Finger Foods🍕🥯",
  },
  {
    name: "Grocery Stores",
    url: "http://127.0.0.1:5000/api/v1/stores?category=Grocery Stores",
  },
  {
    name: "All Restaurants",
    url: "http://127.0.0.1:5000/api/v1/stores?category=All Restaurants",
  },
];

const sortingOptions = [
  "Most Popular",
  "Nearest",
  "Highest rated",
  "Newest",
  "Most Rated",
];

const StoresPage = () => {
  const [categoriesData, setCategoriesData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
      const promises = categories.map((category) =>
        fetchStoresByCategory(category)
      );
      const results = await Promise.all(promises);
      setCategoriesData(results);
    };

    fetchAllCategoriesData();
  }, []);

  const fetchStoresByCategory = async (category) => {
    try {
      const response = await axios.get(category.url);
      return { title: category.name, content: response.data };
    } catch (error) {
      console.error(`Error fetching stores for ${category.name}:`, error);
      return { title: category.name, content: [] };
    }
  };

  const handleSeeAll = (category) => {
    setSelectedCategory(category);
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:5000/api/v1/stores?search=${searchTerm}`
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error fetching search results:", error);
      setSearchResults([]);
    }
  };

  const scrollLeft = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: -ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = (ref) => {
    if (ref.current) {
      ref.current.scrollBy({
        left: ref.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "white",
      }}
    >
      {/* Sidebar */}
      <Box
        sx={{
          display: { xs: "none", md: "block" }, // Hide sidebar on mobile view
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          width: "25%", // Increase width for sidebar
          padding: 2,
          borderRight: "1px solid #ccc",
          backgroundColor: "white",
          height: "100vh", // Ensures the sidebar takes the full viewport height
          overflowY: "auto", // Allows the sidebar to scroll if content overflows
        }}
      >
        <Typography variant="h5" sx={{ color: "black" }}>
          All Stores
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }}>
          ({categoriesData.length} Categories)
        </Typography>
        <Typography variant="h6" sx={{ color: "black" }} mt={2}>
          Sort
        </Typography>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          {sortingOptions.map((option) => (
            <FormControlLabel
              key={option}
              control={<Checkbox />}
              label={option}
              sx={{ color: "black" }}
            />
          ))}
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          width: { xs: "100%", md: selectedCategory ? "100%" : "75%" }, // Adjusted width for main content when showing all stores
          padding: 2,
          marginLeft: { xs: 0, md: selectedCategory ? 0 : "10px" }, // Adjusted left margin for main content
        }}
      >
        Search Bar
        <Box mb={2}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search stores..."
            style={{ padding: "10px", width: "100%", fontSize: "16px" }}
          />
          <button
            onClick={handleSearch}
            style={{ padding: "10px", fontSize: "16px", cursor: "pointer" }}
          >
            Search
          </button>
        </Box>
        {searchResults.length > 0 ? (
          <>
            <Typography variant="h5" sx={{ color: "black" }}>
              Search Results for "{searchTerm}"
            </Typography>
            {searchResults.map((store) => (
              <Box key={store._id} mb={2}>
                <Typography variant="h6" sx={{ color: "black" }}>
                  {store.name}
                </Typography>
                <Image
                  src={store.image}
                  alt={store.name}
                  width={150}
                  height={150}
                />
                <Typography variant="body1">{store.description}</Typography>
              </Box>
            ))}
          </>
        ) : (
          <>
            {categoriesData.map((categoryData, index) => (
              <CategorySection
                key={index}
                category={categoryData.title}
                stores={categoryData.content}
                onSeeAll={handleSeeAll}
                showAll={selectedCategory === categoryData.title}
              />
            ))}
          </>
        )}
      </Box>
    </Box>
  );
};

const CategorySection = ({ category, stores, showAll, onSeeAll }) => {
  const scrollRef = useRef(null);

  return (
    <Box sx={{ marginBottom: 4 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingBottom: 2,
        }}
      >
        <Typography
          variant="h6"
          sx={{
            color: "black",
            fontSize: { xs: "1rem", md: "1.5rem" }, // Adjusted font size
          }}
        >
          {category}
        </Typography>
        {!showAll ? (
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography
              variant="h6"
              sx={{
                marginRight: 2,
                color: "black",
                cursor: "pointer",
                fontSize: { xs: "0.875rem", md: "1rem" }, // Adjusted font size
              }}
              onClick={() => onSeeAll(category)}
            >
              See All
            </Typography>
            <IconButton
              onClick={() => scrollLeft(scrollRef)}
              sx={{
                backgroundColor: "#f0f0f0", // Lighter shade of grey
                color: "black",
                borderRadius: "50%",
                marginRight: 1,
                "&:hover": { backgroundColor: "#e0e0e0" }, // Darker shade on hover
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={() => scrollRight(scrollRef)}
              sx={{
                backgroundColor: "#f0f0f0", // Lighter shade of grey
                color: "black",
                borderRadius: "50%",
                "&:hover": { backgroundColor: "#e0e0e0" }, // Darker shade on hover
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              marginRight: 2,
              color: "black",
              cursor: "pointer",
              fontSize: { xs: "0.875rem", md: "1rem" }, // Adjusted font size
            }}
            onClick={() => onSeeAll(null)}
          >
            Back
          </Typography>
        )}
      </Box>
      {showAll ? (
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
            gap: 2, // Adjusted gap between grid items
          }}
        >
          {stores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </Box>
      ) : (
        <Box
          ref={scrollRef}
          sx={{
            display: "flex",
            overflowX: "scroll",
            scrollSnapType: "x mandatory",
            paddingBottom: 2,
            gap: 2, // Adjusted gap between store cards
          }}
        >
          {stores.map((store) => (
            <StoreCard key={store._id} store={store} />
          ))}
        </Box>
      )}
    </Box>
  );
};

const StoreCard = ({ store }) => (
  <Box
    sx={{
      position: "relative",
      flex: {
        xs: "0 0 calc(50% - 8px)",
        md: "0 0 calc(25% - 8px)",
      },
      height: {
        xs: "calc((100vw / 4) * (240 / 220))",
        md: "calc((100vw / 4) * (120 / 220))",
      },
      borderRadius: 2, // Added border radius
      overflow: "hidden",
      scrollSnapAlign: "center",
      cursor: "pointer", // Added cursor pointer for better UX
      marginBottom: 2, // Added margin bottom for spacing
      marginRight: 2, // Added margin right for spacing
    }}
  >
    <Image
      src={store.image}
      alt={store.name}
      layout="fill"
      objectFit="cover" // Cut the image when necessary
    />
    <Box
      sx={{
        position: "absolute",
        bottom: 35,
        left: 15,
        backgroundColor: "orange",
        color: "white",
        padding: "2px 8px",
        borderRadius: 1,
      }}
    >
      <Typography variant="caption">{`Opens at ${store.openingTime}`}</Typography>
    </Box>
    <Typography
      variant="body2"
      sx={{
        position: "absolute",
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        color: "white",
        width: "100%",
        textAlign: "center",
        padding: "4px 0",
      }}
    >
      {store.name}
    </Typography>
  </Box>
);

export default StoresPage;
