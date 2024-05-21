import React from "react";
import styles from "./Header.module.css";

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
  return (
    <header className={styles.header}>
      <img className={styles.image} src={logo.src} alt="logo" />
      <div>
        <h1>Welcome To Questions - Answers</h1>
      </div>
      <nav>
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
    </header>
  );
};

export default Header;
