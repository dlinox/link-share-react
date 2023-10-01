import React, { useState } from "react";

const StarRating = ({
  initialRating,
  maxRating,
  onRatingChange,
  isDisabled
}) => {
  const [rating, setRating] = useState(initialRating);

  const handleClick =async (newRating) => {
    // setRating(newRating);
    if (onRatingChange) {
      let res = await onRatingChange(newRating);
      console.log('-->', res);

      setRating(res);
    }
  };

  const stars = [];
  for (let i = 1; i <= maxRating; i += 1) {
    const starClassName = i <= rating ? "text-yellow-500" : "text-gray-300";
    stars.push(
      <span
        key={i}
        className={`cursor-pointer text-2xl self-center hover:text-yellow-300 ${starClassName}`}
        onClick={() => handleClick(i)}
      >
        &#9733; 
      </span>
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
};

export default StarRating;
