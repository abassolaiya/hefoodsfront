import React, { useState, useEffect, useRef } from "react";
import {
  Box,
  Typography,
  IconButton,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SortIcon from "@mui/icons-material/Sort";
import StarIcon from "@mui/icons-material/Star";
import Image from "next/image";
import axios from "axios";
import { useSearch } from "../context/SearchContext";
import { useCategorySearch } from "../context/CategorySearchContext";

const categories = [
  {
    name: "FREE DRINKS",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores",
  },
  {
    name: "Amala Hotspot 🔥",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=Amala Hotspot 🔥",
  },
  {
    name: "Hand Picked for you!😋",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=Hand Picked for you!😋",
  },
  {
    name: "Promos 4 You! 😍",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=Promos 4 You! 😍",
  },
  {
    name: "Finger Foods🍕🥯",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=Finger Foods🍕🥯",
  },
  {
    name: "Grocery Stores",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=Grocery Stores",
  },
  {
    name: "All Restaurants",
    url: "https://heayfoodtestb.onrender.com/api/v1/stores?category=All Restaurants",
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
  const [storeCount, setStoreCount] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  const [categorySearchResults, setCategorySearchResults] = useState([]);
  const { searchTerm } = useSearch();
  const { categorySearchTerm } = useCategorySearch();

  useEffect(() => {
    const fetchAllCategoriesData = async () => {
      const promises = categories.map((category) =>
        fetchStoresByCategory(category)
      );
      const results = await Promise.all(promises);
      const totalStores = results.reduce(
        (acc, category) => acc + category.content.length,
        0
      );
      setCategoriesData(results);
      setStoreCount(totalStores);
    };

    fetchAllCategoriesData();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm) {
        try {
          const response = await axios.get(
            `https://heayfoodtestb.onrender.com/api/v1/stores/search/${searchTerm}`
          );
          setSearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setSearchResults([]);
        }
      } else {
        setSearchResults([]);
      }
    };

    handleSearch();
  }, [searchTerm]);

  useEffect(() => {
    const handleCategorySearch = async () => {
      if (categorySearchTerm) {
        try {
          const response = await axios.get(
            `https://heayfoodtestb.onrender.com/api/v1/products/search/${categorySearchTerm}`
          );
          setCategorySearchResults(response.data);
        } catch (error) {
          console.error("Error fetching search results:", error);
          setCategorySearchResults([]);
        }
      } else {
        setCategorySearchResults([]);
      }
    };

    handleCategorySearch();
  }, [categorySearchTerm]);

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
      {!(searchResults.length > 0 || categorySearchResults.length > 0) && (
        <Box
          sx={{
            display: { xs: "none", md: "block" },
            position: "sticky",
            top: 0,
            alignSelf: "flex-start",
            width: "25%",
            padding: 2,
            paddingLeft: 8,
            backgroundColor: "white",
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Typography variant="h5" sx={{ color: "black" }}>
            All Stores
          </Typography>
          <Typography variant="h6" sx={{ color: "black" }}>
            ({storeCount} Stores)
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "black" }}
            mt={2}
            display="flex"
            alignItems="center"
          >
            <SortIcon sx={{ marginRight: 1 }} />
            Sort
          </Typography>
          <FormGroup sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            {sortingOptions.map((option) => (
              <FormControlLabel
                key={option}
                control={<Checkbox sx={{ borderRadius: "50%" }} />}
                label={option}
                sx={{ color: "black" }}
              />
            ))}
          </FormGroup>
        </Box>
      )}

      {/* Main Content */}
      <Box
        sx={{
          width: { xs: "100%", md: selectedCategory ? "100%" : "75%" },
          padding: 2,
          marginLeft: { xs: 0, md: selectedCategory ? 0 : "0px" },
        }}
      >
        {categoriesData.length > 0 ? (
          searchTerm && searchResults.length > 0 ? (
            <SearchResultsSection stores={searchResults} />
          ) : categorySearchResults.length > 0 ? (
            <CategorySearchResultsSection stores={categorySearchResults} />
          ) : selectedCategory ? (
            <CategorySection
              category={selectedCategory}
              stores={
                categoriesData.find((cat) => cat.title === selectedCategory)
                  .content
              }
              showAll={true}
              onBack={() => setSelectedCategory(null)}
              scrollLeft={scrollLeft}
              scrollRight={scrollRight}
            />
          ) : (
            categoriesData.map((categoryData, index) => (
              <CategorySection
                key={index}
                category={categoryData.title}
                stores={categoryData.content}
                onSeeAll={handleSeeAll}
                scrollLeft={scrollLeft}
                scrollRight={scrollRight}
              />
            ))
          )
        ) : (
          <Typography variant="body1" sx={{ color: "black" }}>
            Loading...
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const CategorySection = ({
  category,
  stores,
  showAll,
  onSeeAll,
  onBack,
  scrollLeft,
  scrollRight,
}) => {
  const scrollRef = useRef(null);

  return (
    <Box sx={{ marginBottom: 4, borderBottom: "1px solid #e0e0e0" }}>
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
            fontSize: { xs: "1rem", md: "1.5rem" },
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
                fontSize: { xs: "0.875rem", md: "1rem" },
              }}
              onClick={() => onSeeAll(category)}
            >
              See All
            </Typography>
            <IconButton
              onClick={() => scrollLeft(scrollRef)}
              sx={{
                backgroundColor: "#f0f0f0",
                color: "black",
                borderRadius: "50%",
                marginRight: 1,
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={() => scrollRight(scrollRef)}
              sx={{
                backgroundColor: "#f0f0f0",
                color: "black",
                borderRadius: "50%",
                "&:hover": { backgroundColor: "#e0e0e0" },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography
            variant="h6"
            sx={{
              color: "black",
              cursor: "pointer",
              fontSize: { xs: "0.875rem", md: "1rem" },
            }}
            onClick={onBack}
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
            gap: 2,
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
            gap: 2,
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
        md: "0 0 calc(30%)",
      },
      height: {
        xs: "calc((100vw / 2.5) * (240 / 220))",
        md: "calc((100vw / 5) * (120 / 220))",
      },
      borderRadius: 1.5,
      overflow: "hidden",
      scrollSnapAlign: "center",
      cursor: "pointer",
      marginBottom: 1,
      marginRight: 2,
      display: "flex",
      flexDirection: "column",
    }}
  >
    <Box
      sx={{
        position: "relative",
        height: "100%",
      }}
    >
      <Image
        src={store.image}
        alt={store.name}
        layout="fill"
        objectFit="cover"
      />
      <Box
        sx={{
          position: "absolute",
          bottom: 10,
          left: 15,
          backgroundColor: "orange",
          color: "white",
          padding: "2px 8px",
          borderRadius: 1,
        }}
      >
        <Typography variant="caption">{`Opens at ${store.openingTime}`}</Typography>
      </Box>
    </Box>
    <Box sx={{ padding: 0, color: "black" }}>
      <Typography variant="body1" sx={{ fontWeight: "bold" }}>
        {store.name}
      </Typography>
      <Typography
        variant="body2"
        sx={{ color: "text.secondary", marginTop: 0.2 }}
      >
        {store.description.slice(0, 20)}
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", marginTop: 0.2 }}>
        <Typography
          variant="body2"
          sx={{ display: "flex", alignItems: "center", marginLeft: 0.2 }}
        >
          <StarIcon
            sx={{ color: "green", fontSize: "medium", marginRight: 0.2 }}
          />
          3.5
        </Typography>
        <Typography variant="body2" sx={{ marginLeft: 2 }}>
          19+ ratings
        </Typography>
      </Box>
    </Box>
  </Box>
);

const SearchResultsSection = ({ stores }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
      gap: 2,
    }}
  >
    {stores.map((store) => (
      <StoreCard key={store._id} store={store} />
    ))}
  </Box>
);

const CategorySearchResultsSection = ({ stores }) => (
  <Box
    sx={{
      display: "grid",
      gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(4, 1fr)" },
      gap: 2,
    }}
  >
    {stores.map((store) => (
      <StoreCard key={store._id} store={store} />
    ))}
  </Box>
);

export default StoresPage;
