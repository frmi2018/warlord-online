import React from "react";

interface D20Props {
  type: "normal" | "critique" | "fail";
  value: number | null;
  size?: number;
}

export const D20: React.FC<D20Props> = ({ type, value, size = 100 }) => {
  const fillColor = {
    normal: "#000000",
    critique: "#007f00",
    fail: "#aa0000",
  }[type];

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Contour général du D20 en forme de pentagone stylisé */}
      <polygon
        points="256,10 494,140 494,372 256,502 18,372 18,140"
        fill="none"
        stroke="black"
        strokeWidth="10"
      />

      {/* Traits internes simplifiés */}
      <line x1="256" y1="10" x2="256" y2="502" stroke="black" strokeWidth="6" />
      <line x1="18" y1="140" x2="494" y2="372" stroke="black" strokeWidth="6" />
      <line x1="494" y1="140" x2="18" y2="372" stroke="black" strokeWidth="6" />
      <line x1="18" y1="140" x2="256" y2="502" stroke="black" strokeWidth="6" />
      <line
        x1="494"
        y1="140"
        x2="256"
        y2="502"
        stroke="black"
        strokeWidth="6"
      />

      {/* Fond intérieur */}
      <polygon
        points="256,10 494,140 494,372 256,502 18,372 18,140"
        fill={fillColor}
        opacity="1"
      />

      {/* Numéro central */}
      <text
        x="256"
        y="290"
        fontSize="160"
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        fontFamily="sans-serif"
        fontWeight="bold"
      >
        {value}
      </text>
    </svg>
  );
};
