import React, { ReactNode } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { links } from "../../constance/links";
import styles from "./PageTemplate.module.css";
import Logo from "../../assets/logo.svg";

type PageTemplateProps = {
  children: ReactNode;
  className?: string;
};

const PageTemplate = ({ children, className }: PageTemplateProps) => {
  return (
    <div className={styles.wrapper}>
      <Header logo={Logo} links={links} />
      <div className={styles.content}>{children}</div>
      <Footer />
    </div>
  );
};

export default PageTemplate;
