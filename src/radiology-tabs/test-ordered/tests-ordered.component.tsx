import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableExpandRow,
  TableExpandedRow,
  TableExpandHeader,
  TableCell,
  DataTable,
  DataTableSkeleton,
  Pagination,
  OverflowMenu,
  OverflowMenuItem,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";

import GroupedOrdersTable from "../common/groupedOrdersTable.component";

export const TestsOrdered: React.FC = () => {
  const { t } = useTranslation();
  const { workListEntries, isLoading } = useOrdersWorklist("", "");
  const [searchString, setSearchString] = useState<string>("");

  if (isLoading) {
    return <DataTableSkeleton />;
  }
  if (workListEntries.length > 0) {
    return (
      <div>
        <GroupedOrdersTable
          orders={workListEntries}
          showStatus={true}
          showStartButton={false}
          showActions={true}
          showOrderType={false}
          actions={[
            { actionName: "add-radiology-to-worklist-dialog" },
            { actionName: "reject-radiology-order-dialog" },
          ]}
        />
      </div>
    );
  }
};
