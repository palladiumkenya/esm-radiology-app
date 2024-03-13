import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useLabTestsStats } from "../summary-tiles/radiology-summary.resource";

const ReferredTileComponent = () => {
  const { t } = useTranslation();

  const { count: testOrderedCount } = useLabTestsStats("");

  return (
    <SummaryTile
      label={t("orders", "Orders")}
      value={testOrderedCount}
      headerLabel={t("testsOrdered", "Tests ordered")}
    />
  );
};

export default ReferredTileComponent;
