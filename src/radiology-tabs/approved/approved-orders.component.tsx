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
  Pagination,
  DataTableSkeleton,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Tag,
} from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import {
  formatDate,
  parseDate,
  usePagination,
  ConfigurableLink,
} from "@openmrs/esm-framework";
import { useSearchResults } from "../../hooks/useSearchResults";
import styles from "../test-ordered/tests-ordered.scss";
import { getStatusColor } from "../../utils/functions";
interface ApprovedOrdersProps {
  fulfillerStatus: string;
}
export const ApprovedOrders: React.FC<ApprovedOrdersProps> = ({
  fulfillerStatus,
}) => {
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const { workListEntries, isLoading } = useOrdersWorklist("", fulfillerStatus);
  const [searchString, setSearchString] = useState<string>("");

  const searchResults = useSearchResults(workListEntries, searchString);

  const {
    goTo,
    results: paginatedResults,
    currentPage,
  } = usePagination(searchResults, currentPageSize);

  const pageSizes = [10, 20, 30, 40, 50];

  const tableColums = [
    { id: 0, header: t("date", "Date"), key: "date" },
    { id: 1, header: t("orderNumber", "Order Number"), key: "orderNumber" },
    { id: 2, header: t("patient", "Patient"), key: "patient" },
    { id: 4, header: t("procedure", "Procedure"), key: "procedure" },
    { id: 5, header: t("orderType", "Order type"), key: "action" },
    { id: 6, header: t("status", "Status"), key: "status" },
    { id: 8, header: t("orderer", "Orderer"), key: "orderer" },
    { id: 9, header: t("urgency", "Urgency"), key: "urgency" },
  ];

  const rows = useMemo(() => {
    return paginatedResults
      ?.filter((item) => item.fulfillerStatus === "ON_HOLD")
      .map((entry) => ({
        ...entry,
        id: entry.uuid,
        date: (
          <span className={styles["single-line-display"]}>
            {formatDate(parseDate(entry?.dateActivated))}
          </span>
        ),
        patient: {
          content: (
            <ConfigurableLink
              to={`\${openmrsSpaBase}/patient/${entry.patient}/chart/laboratory-orders`}
            >
              {entry.patient.split("-")[1]}
            </ConfigurableLink>
          ),
        },
        orderNumber: { content: <span>{entry.orderNumber}</span> },
        procedure: { content: <span>{entry.concept.display}</span> },
        status: {
          content: (
            <>
              <Tag>
                <span
                  className={styles.statusContainer}
                  style={{ color: `${getStatusColor(entry.fulfillerStatus)}` }}
                >
                  <span>{entry.fulfillerStatus}</span>
                </span>
              </Tag>
            </>
          ),
        },
        orderer: { content: <span>{entry.orderer}</span> },
        orderType: { content: <span>{entry?.orderType?.display}</span> },
        priority: { content: <span>{entry.urgency}</span> },
      }));
  }, [paginatedResults]);

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
            <TableContainer>
              <TableToolbar
                style={{
                  position: "static",
                  height: "3rem",
                  overflow: "visible",
                  margin: 0,
                  // TODO: add background color to the toolbar
                }}
              >
                <TableToolbarContent style={{ margin: 0 }}>
                  <TableToolbarSearch
                    style={{ backgroundColor: "#f4f4f4" }}
                    onChange={(event) => setSearchString(event.target.value)}
                  />
                </TableToolbarContent>
              </TableToolbar>
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
            </TableContainer>
          </>
        )}
      </DataTable>
    </div>
  );
};
export default ApprovedOrders;
