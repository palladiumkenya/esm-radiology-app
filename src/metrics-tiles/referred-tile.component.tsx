import React from "react";
import { useTranslation } from "react-i18next";
import SummaryTile from "../summary-tiles/summary-tile.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";

const ReferredRadiologyTileComponent = () => {
  const { t } = useTranslation();
  const { count: referredOutCount } = useProcedureOrderStats("EXCEPTION");

  return (
    <SummaryTile
      label={t("transferred", "Transferred")}
      value={referredOutCount}
      headerLabel={t("referredTests", "Referred tests")}
    />
  );
};

export default ReferredRadiologyTileComponent;
