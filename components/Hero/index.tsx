import React, { useRef, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../Button";
import styles from "./hero.module.scss";

const Hero = () => {
  const vidRef = useRef<any>();
  const router = useRouter();
  
  useEffect(() => {
    vidRef.current.play();
  }, []);

  return (
    <div className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.hero__content}>
          <h1>
            Remove Background From Images For{" "}
            <span className={styles.hightlight}>Free</span>
          </h1>
          <p className={styles.para}>
            Remove background from images of humans, animals or objects and
            download high-resolution images for free
          </p>
          <Link href="/">
            <a style={{ marginTop: "32px", display: "inline-block" }}>
              <img
                src="https://api.producthunt.com/widgets/embed-image/v1/top-post-badge.svg?post_id=316752&amp;theme=dark&amp;period=weekly"
                alt="Product Hunt"
              />
            </a>
          </Link>
          <div className={styles.hero__upload}>
            <Button size="large" downLoad handClick={() => {router.push("/upload")}}>
              <img
                src="/images/upload.svg"
                alt="icon"
                className={styles.btn_icon}
              />
              Upload Image
            </Button>
            <p>
              Drop an image or paste <span>URL</span> (upto resolution 5,000 x
              5,000 px)
            </p>
            <p className={styles.support}>
              Supported formats:
              <span>png</span>
              <span>jpeg</span>
              <span>jpg</span>
              <span>webp</span>
            </p>
          </div>
        </div>
        <div className={styles.hero__animation}>
          <video
            src="/videos/hero_video.m4v"
            ref={vidRef}
            muted
            autoPlay
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default Hero;
