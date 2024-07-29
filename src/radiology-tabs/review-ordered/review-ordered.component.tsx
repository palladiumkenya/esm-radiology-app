import React from "react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";
import { DataTableSkeleton } from "@carbon/react";

export const Review: React.FC = () => {
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
        actions={[
          { actionName: "review-radilogy-report-dialog", displayPosition: 1 },
        ]}
      />
    </div>
  );
};
