import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";

const ApprovedRadiologyTileComponent = () => {
  const { t } = useTranslation();
  const { count: approvedCount } = useProcedureOrderStats("ON_HOLD");
  return (
    <SummaryTile
      label={t("approved", "Approved")}
      value={approvedCount}
      headerLabel={t("approved", "Approved")}
    />
  );
};

export default ApprovedRadiologyTileComponent;
