import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";

const RejectedTileComponent = () => {
  const { t } = useTranslation();

  const { count: completedCount } = useProcedureOrderStats("DECLINED");

  return (
    <SummaryTile
      label={t("not done", "Not Done")}
      value={completedCount}
      headerLabel={t("not done", "Not Done")}
    />
  );
};

export default RejectedTileComponent;
