import React from "react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";
import { DataTableSkeleton } from "@carbon/react";

export const Review: React.FC = () => {
  const { workListEntries, isLoading } = useOrdersWorklist("", "COMPLETED");
  const pendingReview = workListEntries.filter((item) =>
    item.procedures?.some((procedure) => procedure.outcome !== "SUCCESSFUL")
  );
  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <GroupedOrdersTable
        orders={pendingReview}
        showStatus={false}
        showStartButton={false}
        showActions={true}
        showOrderType={true}
        actions={[{ actionName: "review-radilogy-report-dialog", order: 1 }]}
      />
    </div>
  );
};
