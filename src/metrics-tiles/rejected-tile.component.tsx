import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";

const RejectedTileComponent = () => {
  const { t } = useTranslation();

  return (
    <SummaryTile
      label={t("not done", "Not Done")}
      value={0}
      headerLabel={t("not done", "Not Done")}
    />
  );
};

export default RejectedTileComponent;
