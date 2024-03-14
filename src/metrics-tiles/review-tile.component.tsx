import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";

const ReviewTileComponent = () => {
  const { t } = useTranslation();

  const { count: completedCount } = useProcedureOrderStats("");
  return (
    <SummaryTile
      label={t("review", "Review")}
      value={completedCount}
      headerLabel={t("review", "Review")}
    />
  );
};

export default ReviewTileComponent;
