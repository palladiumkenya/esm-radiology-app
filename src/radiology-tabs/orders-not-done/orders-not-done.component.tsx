import React, { useMemo, useState } from "react";
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
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";

export const OrdersNotDone: React.FC = () => {
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const { workListEntries, isLoading } = useOrdersWorklist("", "");
  const {
    goTo,
    results: paginatedResults,
    currentPage,
  } = usePagination(workListEntries, currentPageSize);

  const pageSizes = [10, 20, 30, 40, 50];

  const rows = useMemo(() => {
    return paginatedResults
      ?.filter((item) => item.action === "NEW")
      .map((entry, index) => ({
        ...entry,
        id: entry.uuid,
        date: formatDate(parseDate(entry.dateActivated)),
        patient: entry.patient.display.split("-")[1],
        orderNumber: entry.orderNumber,
        accessionNumber: entry.accessionNumber,
        procedure: entry.concept.display,
        action: entry.action,
        status: entry.fulfillerStatus ?? "--",
        orderer: entry.orderer.display,
        urgency: entry.urgency,
      }));
  }, [paginatedResults]);

  const tableColums = [
    { id: 0, header: t("date", "Date"), key: "date" },
    { id: 1, header: t("orderNumber", "Order Number"), key: "orderNumber" },
    { id: 2, header: t("patient", "Patient"), key: "patient" },
    { id: 4, header: t("procedure", "Procedure"), key: "procedure" },
    { id: 5, header: t("action", "Action"), key: "action" },
    { id: 6, header: t("status", "Status"), key: "status" },
    { id: 8, header: t("orderer", "Orderer"), key: "orderer" },
    { id: 9, header: t("urgency", "Urgency"), key: "urgency" },
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <DataTable
        rows={rows}
        headers={tableColums}
        useZebraStyles
        overflowMenuOnHover={true}
      >
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <>
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => (
                    <TableHeader {...getHeaderProps({ header })}>
                      {header.header}
                    </TableHeader>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow {...getRowProps({ row })}>
                    {row.cells.map((cell) => (
                      <TableCell key={cell.id}>{cell.value}</TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Pagination
              forwardText="Next page"
              backwardText="Previous page"
              page={currentPage}
              pageSize={currentPageSize}
              pageSizes={pageSizes}
              totalItems={workListEntries?.length}
              onChange={({ pageSize, page }) => {
                if (pageSize !== currentPageSize) {
                  setCurrentPageSize(pageSize);
                }
                if (page !== currentPage) {
                  goTo(page);
                }
              }}
            />
          </>
        )}
      </DataTable>
    </div>
  );
};
