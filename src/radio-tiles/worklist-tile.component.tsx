import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useLabTestsStats } from "../summary-tiles/radiology-summary.resource";

const WorklistTileComponent = () => {
  const { t } = useTranslation();

  const { count: worklistCount } = useLabTestsStats("IN_PROGRESS");

  return (
    <SummaryTile
      label={t("inProgress", "In progress")}
      value={worklistCount}
      headerLabel={t("worklist", "Ex-Worklist")}
    />
  );
};

export default WorklistTileComponent;
