import React from "react";
import { DataTableSkeleton } from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";

import GroupedOrdersTable from "../common/groupedOrdersTable.component";

export const TestsOrdered: React.FC = () => {
  const { workListEntries, isLoading } = useOrdersWorklist("", "");

  if (isLoading) {
    return <DataTableSkeleton />;
  }
  return (
    <div>
      <GroupedOrdersTable
        orders={workListEntries}
        showStatus={true}
        showStartButton={false}
        showActions={true}
        showOrderType={false}
        actions={[
          {
            actionName: "add-radiology-to-worklist-dialog",
            order: 1,
          },
          { actionName: "reject-radiology-order-dialog", order: 2 },
        ]}
      />
    </div>
  );
};
