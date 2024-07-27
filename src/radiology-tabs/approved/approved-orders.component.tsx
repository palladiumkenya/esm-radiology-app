import React, { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { DataTableSkeleton } from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";

export const ApprovedOrders: React.FC = () => {
  const { t } = useTranslation();
  const { workListEntries, isLoading } = useOrdersWorklist("", "ON_HOLD");

  if (isLoading) {
    return <DataTableSkeleton />;
  }

  return (
    <div>
      <GroupedOrdersTable
        orders={workListEntries}
        showStatus={false}
        showStartButton={false}
        showActions={false}
        showOrderType={true}
        actions={[]}
      />
    </div>
  );
};
