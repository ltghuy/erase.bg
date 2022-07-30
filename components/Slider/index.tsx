import React, { useRef } from "react";
import Head from "next/head";
import Draggable from "react-draggable";
import styles from "./slider.module.scss";

const Slider = () => {
  const removeRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  const setPostion = () => {
    if (sliderRef.current && lineRef.current && removeRef.current) {
      let ralativePos =
        lineRef.current.getBoundingClientRect().left -
        sliderRef.current.getBoundingClientRect().left;
      removeRef.current.style.width = `${ralativePos}px`;
    }
  };
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css"
        />
      </Head>
      <div className={styles.slider} ref={sliderRef} id="slider">
        <div className={styles.before} ref={removeRef}>
          <img src="/images/slider_before.jpeg" alt="slider_before" />
        </div>
        <img
          src="./images/slider_after.png"
          alt="slider_after"
          className={styles.slider__after}
        />
        <Draggable axis="x" bounds="#slider" onDrag={setPostion}>
          <div className={styles.line} ref={lineRef}>
            <div className={styles.icon}>
              <i className="fa-solid fa-angle-left"></i>
              <i className="fa-solid fa-angle-right"></i>
            </div>
          </div>
        </Draggable>
      </div>
    </>
  );
};

export default Slider;
