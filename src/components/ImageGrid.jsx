import React, { useState, useRef } from "react";
import "./ImageGrid.css";

const images = [
  "/dx boosts/watermelonmetal2.png",
  "/dx boosts/peachmetal2.png",
  "/dx boosts/orangemetal2.png",
  "/dx boosts/raspberry2.png",
  "/dx boosts/orangemetal2.png",
  "/dx boosts/punchmetal2.png",
];

const flavorNames = [
  "Watermelon",
  "Peach",
  "Tropical",
  "Dragon Fruit",
  "Orange Mango",
  "Fruit Punch",
];

export default function ImageGrid() {
  const [selected, setSelected] = useState(null);
  const gridRef = useRef(null);

  function handleSelect(index) {
    setSelected(index);
  }

  function handleKeyDown(e) {
    if (!gridRef.current) return;
    const focusable = Array.from(
      gridRef.current.querySelectorAll(".image-cell[tabindex]")
    );
    const currentIndex = focusable.indexOf(document.activeElement);

    if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.min(currentIndex + 2, focusable.length - 1);
      focusable[next]?.focus();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const prev = Math.max(currentIndex - 2, 0);
      focusable[prev]?.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      const next = Math.min(currentIndex + 1, focusable.length - 1);
      focusable[next]?.focus();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      const prev = Math.max(currentIndex - 1, 0);
      focusable[prev]?.focus();
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      const idx = focusable.indexOf(document.activeElement);
      if (idx >= 0) setSelected(idx);
    }
  }

  return (
    <div className="vending-frame">
      <div className="vending-title">Choose a boost</div>
      <div
        className="image-grid"
        aria-label="dx boosts gallery"
        ref={gridRef}
        onKeyDown={handleKeyDown}
      >
        {images.map((src, i) => (
          <div
            className={`image-cell ${selected === i ? "selected" : ""}`}
            key={i}
            role="button"
            tabIndex={0}
            aria-pressed={selected === i}
            onClick={() => handleSelect(i)}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleSelect(i);
              }
            }}
          >
            <div className="content-wrapper">
              <img src={src} alt={`boost ${i + 1}`} />
              <span className="flavor-name">{flavorNames[i]}</span>
            </div>
            <div className="overlay"></div>
          </div>
        ))}
      </div>

      <div className="vending-footer" aria-live="polite">
        {selected === null ? (
          <div className="placeholder">Choose a boost</div>
        ) : (
          <div className="selected-info">
            Selected: <strong>{`Item ${selected + 1}`}</strong>
          </div>
        )}
      </div>
    </div>
  );
}
