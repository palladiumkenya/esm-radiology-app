import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";
import { DataTableSkeleton } from "@carbon/react";

export const Review: React.FC = () => {
  const { t } = useTranslation();
  const { workListEntries, isLoading } = useOrdersWorklist("", "COMPLETED");

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <GroupedOrdersTable
        orders={workListEntries}
        showStatus={false}
        showStartButton={false}
        showActions={true}
        showOrderType={true}
        actions={[{ actionName: "review-radilogy-report-dialog" }]}
      />
    </div>
  );
};
