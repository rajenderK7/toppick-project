import React from "react";
// import HomeBannerImg from "../../assets/HomeBanner.jpg";
import BookBanner from "../../assets/BookUnsplash.jpg";
import styles from "./HomeBanner.module.css";

const HomeBanner = () => {
  return (
    <img
      className={styles["home-banner"]}
      src={BookBanner}
      alt="Home banner.."
    />
  );
};

export default HomeBanner;
