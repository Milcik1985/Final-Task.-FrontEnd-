import React, { useState } from "react";
import styles from "./Header.module.css";
import Image from "next/image";
import BurgerBtn from "../../assets/burger-menu.svg";

type LinkType = {
  id: number;
  title: string;
  href: string;
};

type HeaderProps = {
  logo: string;
  links: LinkType[];
};

const Header = ({ links, logo }: HeaderProps) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className={styles.header}>
      <div>
        <Image className={styles.image} src={logo} alt="logo" />
      </div>
      <div className={styles.headerNameAndNav}>
        <div>
          <h1 className={styles.welcome}>Welcome To Questions - Answers</h1>
        </div>
        <nav className={`${styles.nav} ${isMobileMenuOpen ? styles.open : ""}`}>
          <ul className={styles.links}>
            {links.map((link) => {
              return (
                <a href={link.href} key={link.id}>
                  {link.title}
                </a>
              );
            })}
          </ul>
        </nav>
      </div>
      <button className={styles.burgerMenu} onClick={toggleMobileMenu}>
        <Image
          className={styles.burgerBtn}
          src={BurgerBtn}
          alt="Burger button"
        />
      </button>

      <div>
        <Image className={styles.image2} src={logo} alt="logo" />
      </div>

      <div
        className={`${styles.mobileMenu} ${
          isMobileMenuOpen && styles.mobileMenuOpen
        }`}
      >
        <ul className={styles.mobileLinks}>
          {links.map((link) => {
            return (
              <a href={link.href} key={link.id}>
                {link.title}
              </a>
            );
          })}
        </ul>
      </div>
    </header>
  );
};

export default Header;
