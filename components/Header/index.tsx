import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Button from "../Button";
import styles from "./header.module.scss";

const Header = () => {
  const router = useRouter()
  return (
    <>
      <div className={styles.header}>
        <Link href="/">
          <a>
            <img
              src="/images/logo.png"
              alt="erase_logo"
              className={styles.header__logo}
            />
          </a>
        </Link>
        <div className={styles.header__control}>
          <Link href="/">
            <a className={styles.icon}>
              <img src="/images/google_play.png" alt="google_play" />
            </a>
          </Link>
          <Link href="/">
            <a className={styles.icon}>
              <img src="/images/app_store.png" alt="app_store" />
            </a>
          </Link>
          <Link href="/">
            <a className={styles.header__link}>Features</a>
          </Link>
          <Link href="/">
            <a className={styles.header__link}>Blog</a>
          </Link>
          <div className={styles.header__btn}>
            <Button downLoad handClick={() => {router.push("/upload")}}>Upload Image</Button>
          </div>
        </div>
      </div>
      <Link href="/hiring">
        <a className={styles.hiring}>
          <img src="/images/hiring.png" alt="hiring_icon" />
        </a>
      </Link>
    </>
  );
};

export default Header;
