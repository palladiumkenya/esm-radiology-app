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
  OverflowMenu,
  OverflowMenuItem,
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";

export const TestsOrdered: React.FC = () => {
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const { workListEntries, isLoading } = useOrdersWorklist("", "");
  const {
    goTo,
    results: paginatedResults,
    currentPage,
  } = usePagination(workListEntries, currentPageSize);

  const pageSizes = [10, 20, 30, 40, 50];
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  const toggleRowExpansion = (rowId: string) => {
    const newExpandedRows = new Set(expandedRows);
    if (expandedRows.has(rowId)) {
      newExpandedRows.delete(rowId);
    } else {
      newExpandedRows.add(rowId);
    }
    setExpandedRows(newExpandedRows);
  };

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
        actions: (
          <OverflowMenu flipped={true}>
            <OverflowMenuItem
              itemText="Pick Request"
              onClick={() => "Pick Request"}
            />
            <OverflowMenuItem
              itemText="Rejected Order"
              onClick={() => "Rejected Order"}
            />
          </OverflowMenu>
        ),
      }));
  }, [paginatedResults]);

  const tableColumns = [
    { id: 0, header: t("date", "Date"), key: "date" },
    { id: 1, header: t("orderNumber", "Order Number"), key: "orderNumber" },
    { id: 2, header: t("patient", "Patient"), key: "patient" },
    { id: 4, header: t("procedure", "Procedure"), key: "procedure" },
    { id: 5, header: t("action", "Action"), key: "action" },
    { id: 6, header: t("status", "Status"), key: "status" },
    { id: 8, header: t("orderer", "Orderer"), key: "orderer" },
    { id: 9, header: t("urgency", "Urgency"), key: "urgency" },
    { id: 10, header: t("actions", "Actions"), key: "actions" },
  ];

  return isLoading ? (
    <DataTableSkeleton />
  ) : (
    <div>
      <DataTable
        rows={rows}
        headers={tableColumns}
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
                  <React.Fragment key={row.id}>
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                    {expandedRows.has(row.id) && (
                      <TableRow>
                        <TableCell
                          colSpan={tableColumns.length + 1}
                        ></TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
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
