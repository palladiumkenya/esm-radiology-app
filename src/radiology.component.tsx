import React from "react";
import { RadiologyHeader } from "./header/radiology-header.component";

const Radiology: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <RadiologyHeader />
    </div>
  );
};

export default Radiology;
