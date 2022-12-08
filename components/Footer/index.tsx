import Link from 'next/link'
import React from 'react'
import styles from './footer.module.scss'

const Footer = () => {
  return (
    <div className={styles.footer}>
        <Link href="/">
            <a>
                <img src="/images/logo.png" alt="logo" className={styles.footer__logo} />
            </a>
        </Link>
        <p className={styles.footer__para}>
        Erase.bg is a smart AI background removal and image editor tool that lets you edit single or bulk images with precision. It enables users to edit their background for profile pictures, resize images by different aspect ratios and save images in all formats.
        </p>
        <ul className={styles.footer__links}>
            <li>
            <Link href="/privacy">
                <a className={styles.footer__link}>Privacy</a>
            </Link>
            </li>
            <li>
            <Link href="/terms">
                <a className={styles.footer__link}>Terms</a>
            </Link>
            </li>
            <li>
            <Link href="/blog">
                <a className={styles.footer__link}>Blog</a>
            </Link>
            </li>
            <li>
            <Link href="/careers">
                <a className={styles.footer__link}>Careers</a>
            </Link>
            </li>
            <li>
            <Link href="/about">
                <a className={styles.footer__link}>About Us</a>
            </Link>
            </li>
        </ul>
        <h5>Find Us On</h5>
        <ul className={styles.footer__social}>
            <li>
            <Link href="/">
                <a><img src="/images/facebook.svg" alt="icon" /></a>
            </Link>
            </li>
            <li>
            <Link href="/">
                <a><img src="/images/twitter.svg" alt="icon" /></a>
            </Link>
            </li>
            <li>
            <Link href="/">
                <a><img src="/images/instagram.svg" alt="icon" /></a>
            </Link>
            </li>
            <li>
            <Link href="/">
                <a><img src="/images/linkedin.svg" alt="icon" /></a>
            </Link>
            </li>
            <li>
            <Link href="/">
                <a><img src="/images/reddit.svg" alt="icon" /></a>
            </Link>
            </li>
        </ul>
        <p className={styles.footer__copyright}>
            #MadeInIndia | ©2022 Shopsense Retail Technologies
        </p>
    </div>
  )
}

export default Footer
