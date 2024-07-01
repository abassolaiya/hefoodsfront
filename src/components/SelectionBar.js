"use client";

import React, { useState } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import BakeryDiningIcon from "@mui/icons-material/BakeryDining";

const SelectionBar = () => {
  const [selected, setSelected] = useState("restaurant");

  return (
    <Box
      sx={{
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
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: selected === "restaurant" ? "black" : "transparent",
          borderRadius: "40px",
          padding: "16px 32px", // Increased padding
          color: selected === "restaurant" ? "white" : "black",
          marginRight: "16px",
          "&:hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
        aria-label="Restaurant category"
      >
        <RestaurantMenuIcon />
        <Typography variant="body1" sx={{ marginLeft: "8px" }}>
          Restaurant
        </Typography>
      </IconButton>
      <IconButton
        onClick={() => setSelected("groceries")}
        sx={{
          display: "flex",
          alignItems: "center",
          bgcolor: selected === "groceries" ? "black" : "transparent",
          borderRadius: "40px",
          padding: "16px 32px", // Increased padding
          color: selected === "groceries" ? "white" : "black",
          "&:hover": {
            bgcolor: "black",
            color: "white",
          },
        }}
        aria-label="Groceries category"
      >
        <BakeryDiningIcon />
        <Typography variant="body1" sx={{ marginLeft: "8px" }}>
          Groceries
        </Typography>
      </IconButton>
    </Box>
  );
};

export default SelectionBar;
