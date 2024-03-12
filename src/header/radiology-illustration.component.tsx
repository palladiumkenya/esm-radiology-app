import React from "react";
import { Microscope } from "@carbon/react/icons";
import styles from "./radiology-header.scss";

const RadiologyIllustration: React.FC = () => {
  return (
    <div className={styles.svgContainer}>
      <Microscope className={styles.iconOverrides} />
    </div>
  );
};

export default RadiologyIllustration;
