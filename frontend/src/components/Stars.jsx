// src/components/Stars.jsx
import React from "react";

export default function Stars({ rating }) {
  // un número entre 0 y 5
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

  return (
    <span>
      {"⭐".repeat(fullStars)}
      {halfStar && "✩"}
      {"☆".repeat(emptyStars)}
    </span>
  );
}
