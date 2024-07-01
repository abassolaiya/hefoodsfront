"use client";

import React, { useState, useCallback } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  LocationOn as LocationOnIcon,
  ShoppingCart as ShoppingCartIcon,
} from "@mui/icons-material";
import Image from "next/image";
import logo from "../../public/images/logo-circle-green.svg";
import _ from "lodash";

const Header = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = useCallback(
    _.debounce((query) => {
      onSearch(query);
    }, 300),
    []
  );

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value.trim());
  };
  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        backgroundColor: "#f8f8f8",
        borderBottom: "2px solid #e0e0e0",
        padding: { xs: "0 16px", sm: "0 32px", md: "0 64px" },
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", flexWrap: "wrap" }}>
        <Box display="flex" alignItems="center">
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ color: "black" }}
          >
            <MenuIcon />
          </IconButton>
          <Image src={logo} alt="Logo" height={30} />
          <Box
            display="flex"
            alignItems="center"
            ml={2}
            sx={{ color: "black", display: { xs: "none", md: "flex" } }}
          >
            <LocationOnIcon />
            <Typography variant="body1" ml={1}>
              Ibadan
            </Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: "relative",
            borderRadius: "25px",
            backgroundColor: "#f1f1f1",
            width: { xs: "100%", sm: "auto" },
            maxWidth: "500px",
            height: "40px",
            mt: { xs: 2, sm: 0 },
            mb: { xs: 2, sm: 0 },
            flexGrow: 1,
          }}
        >
          <div
            style={{
              padding: "0 10px",
              height: "100%",
              position: "absolute",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "gray",
            }}
          >
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search restaurant or food"
            inputProps={{ "aria-label": "search" }}
            sx={{
              paddingLeft: "40px",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
            }}
            value={searchTerm}
            onChange={handleChange}
          />
        </Box>

        <Box display="flex" alignItems="center">
          <IconButton
            color="inherit"
            sx={{ color: "black", padding: "3px 28px", borderRadius: "5px" }}
          >
            <Typography variant="body1">SIGN IN</Typography>
          </IconButton>
          <Box
            display="flex"
            alignItems="center"
            bgcolor="black"
            borderRadius="25px"
            px={2}
            py={1}
            sx={{ color: "white", marginLeft: 2 }}
          >
            <ShoppingCartIcon />
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              Cart
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: 1, marginRight: 1 }}>
              .
            </Typography>
            <Typography variant="body1" sx={{ marginLeft: 1 }}>
              4
            </Typography>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
