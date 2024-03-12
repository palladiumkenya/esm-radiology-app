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
  InlineLoading,
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";

interface OrdersNotDoneProps {}

export const OrdersNotDone: React.FC<OrdersNotDoneProps> = () => {
  const { t } = useTranslation();
  const [currenntPageSize, setCurrentPageSize] = useState<number>(10);
  const { workListEntries, isLoading } = useOrdersWorklist("", "");
  const { results: paginatedResults } = usePagination(
    workListEntries,
    currenntPageSize
  ); //pagination for the first ten entries

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
        test: entry.concept.display,
        action: entry.action,
        status: entry.fulfillerStatus ?? "--",
        orderer: entry.orderer.display,
        urgency: entry.urgency,
      }));
  }, [paginatedResults]);

  console.log(paginatedResults);
  const tableColums = [
    { id: 0, header: t("date", "Date"), key: "date" },
    { id: 1, header: t("orderNumber", "Order Number"), key: "orderNumber" },
    { id: 2, header: t("patient", "Patient"), key: "patient" },
    { id: 4, header: t("test", "Test"), key: "test" },
    { id: 5, header: t("action", "Action"), key: "action" },
    { id: 6, header: t("status", "Status"), key: "status" },
    { id: 8, header: t("orderer", "Orderer"), key: "orderer" },
    { id: 9, header: t("urgency", "Urgency"), key: "urgency" },
  ];

  return isLoading ? (
    <InlineLoading />
  ) : (
    <div>
      <DataTable
        rows={rows}
        headers={tableColums}
        useZebraStyles
        overflowMenuOnHover={true}
      >
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
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
        )}
      </DataTable>
    </div>
  );
};
