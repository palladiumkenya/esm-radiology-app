import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";

const ProcedureOrderedTileComponent = () => {
  const { t } = useTranslation();

  const { count: testOrderedCount } = useProcedureOrderStats("");

  return (
    <SummaryTile
      label={t("orders", "Procedures")}
      value={testOrderedCount}
      headerLabel={t("procedureOrdered", "Pending Procedures")}
    />
  );
};

export default ProcedureOrderedTileComponent;
