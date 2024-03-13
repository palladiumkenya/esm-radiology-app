import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";

const ReviewTileComponent = () => {
  const { t } = useTranslation();

  return (
    <SummaryTile
      label={t("review", "Review")}
      value={0}
      headerLabel={t("review", "Review")}
    />
  );
};

export default ReviewTileComponent;