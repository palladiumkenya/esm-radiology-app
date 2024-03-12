import React from "react";
import { RadiologyHeader } from "./header/radiology-header.component";
import { RadiologyTabs } from "./radiology-tabs/radiology-tabs.component";

const Radiology: React.FC = () => {
  return (
    <div className={`omrs-main-content`}>
      <RadiologyHeader />
      <RadiologyTabs />
    </div>
  );
};

export default Radiology;
