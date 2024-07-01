"use client";

import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining"; // Assuming this icon is more representative of a loaf coming out of a bag

const SelectionBar = () => {
  const [selected, setSelected] = useState("restaurant");

  return (
    <Box
      style={{
        backgroundColor: "#f8f8f8",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        padding: "16px 64px",
        display: "flex",
        alignItems: "center",
        borderBottom: "1px solid #e0e0e0",
        height: "100px",
      }}
    >
      <IconButton
        onClick={() => setSelected("restaurant")}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: selected === "restaurant" ? "black" : "transparent",
          borderRadius: "40px",
          padding: "16px 32px", // Increased padding
          color: selected === "restaurant" ? "white" : "black",
          marginRight: "16px",
        }}
      >
        <RestaurantMenuIcon />
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          Restaurant
        </Typography>
      </IconButton>
      <IconButton
        onClick={() => setSelected("groceries")}
        style={{
          display: "flex",
          alignItems: "center",
          backgroundColor: selected === "groceries" ? "black" : "transparent",
          borderRadius: "40px",
          padding: "16px 32px", // Increased padding
          color: selected === "groceries" ? "white" : "black",
        }}
      >
        <BakeryDiningIcon />
        <Typography variant="body1" style={{ marginLeft: "8px" }}>
          Groceries
        </Typography>
      </IconButton>
    </Box>
  );
};

export default SelectionBar;
