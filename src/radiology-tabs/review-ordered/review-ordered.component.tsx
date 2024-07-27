import React, { useCallback, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  DataTable,
  DataTableSkeleton,
  Pagination,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Button,
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import {
  formatDate,
  parseDate,
  showModal,
  usePagination,
} from "@openmrs/esm-framework";
import { useSearchResults } from "../../hooks/useSearchResults";
import styles from "../test-ordered/tests-ordered.scss";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";

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
            actions={[{actionName:'review-radilogy-report-dialog'}]}
          />
    </div>
  );
};
