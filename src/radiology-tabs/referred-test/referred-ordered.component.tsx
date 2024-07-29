import React from "react";
import { useTranslation } from "react-i18next";
import { DataTableSkeleton } from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";

export const ReferredTests: React.FC = () => {
  const { workListEntries, isLoading } = useOrdersWorklist("", "EXCEPTION");

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <GroupedOrdersTable
        orders={workListEntries}
        showStatus={false}
        showStartButton={false}
        showActions={false}
        showOrderType={false}
        actions={[]}
      />
    </div>
  );
};
