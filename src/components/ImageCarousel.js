"use client";

import React, { useRef } from "react";
import { Box, IconButton } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Image from "next/image";

const images = [
  "/images/image1.jpg",
  "/images/image2.jpg",
  "/images/image3.jpg",
  "/images/image4.jpg",
];

const ImageCarousel = () => {
  const carouselRef = useRef(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.offsetWidth,
        behavior: "smooth",
      });
    }
  };

  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "white",
        height: "calc((100vw / 3) * (100 / 220))",
        padding: "0 40px",
      }}
    >
      <IconButton
        onClick={scrollLeft}
        sx={{
          position: "absolute",
          left: 10,
          zIndex: 1,
          backgroundColor: "lightgray",
          color: "black",
          "&:hover": { backgroundColor: "gray" },
        }}
      >
        <ArrowBackIosIcon />
      </IconButton>
      <Box
        ref={carouselRef}
        sx={{
          display: "flex",
          overflowX: "scroll",
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": {
            display: "none",
          },
          gap: 4,
          width: "100%",
          paddingLeft: "20px",
        }}
      >
        {images.map((src, index) => (
          <Box
            key={index}
            sx={{
              flex: "0 0 30%",
              height: "calc((100vw / 3) * (80 / 220))",
              borderRadius: 2,
              overflow: "hidden",
              scrollSnapAlign: "center",
              position: "relative",
              cursor: "pointer",
            }}
            onClick={() => {
              console.log(`Clicked on image ${index}`);
            }}
          >
            <Image
              src={src}
              alt={`Carousel image ${index + 1}`}
              layout="fill"
              objectFit="cover"
            />
          </Box>
        ))}
      </Box>
      <IconButton
        onClick={scrollRight}
        sx={{
          position: "absolute",
          right: 10,
          zIndex: 1,
          backgroundColor: "lightgray",
          color: "black",
          "&:hover": { backgroundColor: "gray" },
        }}
      >
        <ArrowForwardIosIcon />
      </IconButton>
    </Box>
  );
};

export default ImageCarousel;
