import Image from "next/image";
import { useEffect, useState } from "react";
import styles from "./ScreenshotCarousel.module.css";

const screenshots = [
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg",
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg", // Replace with other screenshots
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg",
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg",
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg",
  "/assets/images/screenshots/mobile/mobile-home-en.jpeg",
];

export const ScreenshotCarousel: React.FC = () => {
  // Split screenshots into two columns
  const leftColumnScreenshots = screenshots.slice(0, Math.ceil(screenshots.length / 2));
  const rightColumnScreenshots = screenshots.slice(Math.ceil(screenshots.length / 2));
  
  // Duplicate images to create seamless loop effect
  const duplicatedLeft = [...leftColumnScreenshots, ...leftColumnScreenshots];
  const duplicatedRight = [...rightColumnScreenshots, ...rightColumnScreenshots];

  return (
    <div className={styles.carouselContainer}>
      {/* First column - slides top to bottom */}
      <div className={styles.carouselColumn}>
        <div className={styles.slideDown}>
          {duplicatedLeft.map((src, index) => (
            <article key={`left-${index}`} className="rounded-lg overflow-hidden w-[180px] h-[390px] my-4">
              <Image
                alt={`Coffi app screenshot ${index + 1}`}
                src={src}
                width={180}
                height={390}
              />
            </article>
          ))}
        </div>
      </div>

      {/* Second column - slides bottom to top */}
      <div className={styles.carouselColumn}>
        <div className={styles.slideUp}>
          {duplicatedRight.map((src, index) => (
            <article key={`right-${index}`} className="rounded-lg overflow-hidden w-[180px] h-[390px] my-4">
              <Image
                alt={`Coffi app screenshot ${index + screenshots.length/2 + 1}`}
                src={src}
                width={180}
                height={390}
              />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
