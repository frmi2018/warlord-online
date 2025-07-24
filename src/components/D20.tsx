import React, { useEffect, useState } from "react";

interface D20Props {
  type: "normal" | "critique" | "fail";
  value: number | null;
  size?: number;
}

const lines = [
  [18, 140, 256, 97],
  [256, 97, 256, 10],
  [256, 97, 494, 140],
  [18, 372, 97, 329],
  [97, 329, 18, 140],
  [97, 329, 256, 97],
  [256, 97, 415, 329],
  [415, 329, 494, 140],
  [97, 329, 415, 329],
  [415, 329, 494, 372],
  [415, 329, 256, 502],
  [97, 329, 256, 502],
];

const getFillColor = (type: D20Props["type"]) => {
  switch (type) {
    case "critique":
      return "#007f00"; // vert
    case "fail":
      return "#aa0000"; // rouge
    default:
      return "#000000"; // noir
  }
};

export const D20: React.FC<D20Props> = ({ type, value, size = 100 }) => {
  const [showFinal, setShowFinal] = useState(false);
  const [displayedValue, setDisplayedValue] = useState<number | null>(null);

  useEffect(() => {
    if (value === null) return;
    setShowFinal(false);

    let count = 0;

    const rollingInterval = setInterval(() => {
      const random = Math.floor(Math.random() * 20) + 1;
      setDisplayedValue(random);
      count++;

      if (count > 10) {
        clearInterval(rollingInterval);
        setDisplayedValue(value);
        setShowFinal(true);
      }
    }, 50);

    return () => clearInterval(rollingInterval); // nettoyage si le composant est démonté
  }, [value]);

  const fillColor = showFinal ? getFillColor(type) : "#000000";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon
        points="256,10 494,140 494,372 256,502 18,372 18,140"
        fill={fillColor}
        stroke="white"
        strokeWidth="10"
      />

      {lines.map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1}
          y1={y1}
          x2={x2}
          y2={y2}
          stroke="white"
          strokeWidth="6"
        />
      ))}

      <text
        x="256"
        y="260"
        fontSize="100"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
        fill="white"
      >
        {displayedValue}
      </text>
    </svg>
  );
};
