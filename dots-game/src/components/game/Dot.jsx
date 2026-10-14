import React from "react";
import { useSpring, animated } from "react-spring";
import styles from "./Dot.module.css";

function Dot({ dot, prevDot, onSelectDot, onExecute, label }) {
		// The browser board has no previous position when a dot first appears.
		const yOffset = prevDot ? prevDot.y - dot.y : 0;

		const animation = useSpring({
				from: { transform: `translateY(${yOffset * 100}%)` },
				to: { transform: "translateY(0%)" },
				config: { duration: 500 },
		});

		let dotImage;

		if ("BLUE".localeCompare(dot?.color) === 0) {
				dotImage = dot.selected ? 'images/dots/blue_selected.webp' : 'images/dots/blue.webp';
		} else if ("RED".localeCompare(dot?.color) === 0) {
				dotImage = dot.selected ? 'images/dots/red_selected.webp' : 'images/dots/red.webp';
		} else if ("GREEN".localeCompare(dot?.color) === 0) {
				dotImage = dot.selected ? 'images/dots/green_selected.webp' : 'images/dots/green.webp';
		} else if ("YELLOW".localeCompare(dot?.color) === 0) {
				dotImage = dot.selected ? 'images/dots/yellow_selected.webp' : 'images/dots/yellow.webp';
		}

		const handleDotClicked = () => {
				if ("SELECTED".localeCompare(dot?.state) === 0) {
						return;
				}
				onSelectDot();
		};

		const handleDotRightClick = (event) => {
				event.preventDefault();
				onExecute();
		};

		return (

      <button type="button" aria-label={label || dot?.color} aria-pressed={dot.selected}
		      className={`${styles.dotWrapper} dot-button`}
		      onClick={handleDotClicked}
		      onContextMenu={handleDotRightClick}
      >
        <animated.img
		        style={animation}
		        src={`${process.env.PUBLIC_URL}/${dotImage}`}
		        alt={dot?.color}
		        width="50"
        />
      </button>

		);
}

export default Dot;
