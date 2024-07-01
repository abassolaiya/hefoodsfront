"use client";

import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import Image from "next/image";

const CategoryCard = ({ category }) => (
  <Box
    sx={{
      minWidth: 100,
      height: 100,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      margin: 2,
      backgroundColor: "white",
      borderRadius: 1,
      flexShrink: 0, // Prevent shrinking
    }}
  >
    <Box
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // backgroundColor: "#f1f1f1",
      }}
    >
      <Image
        src={category.image}
        alt={category.name}
        layout="intrinsic"
        width={60}
        height={60}
        style={{ objectFit: "contain" }}
      />
    </Box>
    <Typography
      variant="body1"
      sx={{
        marginTop: 1,
        textAlign: "center",
        color: "black",
        width: "100%",
      }}
    >
      {category.name}
    </Typography>
  </Box>
);

const CategoryList = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/v1/category")
      .then((response) => response.json())
      .then((data) => setCategories(data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  return (
    <Box
      sx={{
        display: "flex",
        overflowX: "auto", // Use auto instead of scroll for better experience
        padding: 2,
        backgroundColor: "white",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      {categories.map((category) => (
        <CategoryCard key={category._id} category={category} />
      ))}
    </Box>
  );
};

export default CategoryList;
