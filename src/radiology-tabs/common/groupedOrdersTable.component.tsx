import React, { useMemo, useState } from "react";
import styles from "./groupedOrdersTable.scss";
import { useTranslation } from "react-i18next";
import { formatDate, parseDate, usePagination } from "@openmrs/esm-framework";
import { GroupedOrdersTableProps } from "./radiologyProps.resource";
import { useSearchGroupedResults } from "../../hooks/useSearchGroupedResults";
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
  Pagination,
  TableContainer,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
} from "@carbon/react";
import ListOrderDetails from "./listOrderDetails.component";
import TransitionLatestQueueEntryButton from "../test-ordered/transition-patient-new-queue/transition-latest-queue-entry-button.component";

//  render Grouped by patient Orders in radiology module
const GroupedOrdersTable: React.FC<GroupedOrdersTableProps> = (props) => {
  const workListEntries = props.orders;
  const { t } = useTranslation();
  const [currentPageSize, setCurrentPageSize] = useState<number>(10);
  const [searchString, setSearchString] = useState<string>("");

  function groupOrdersById(orders) {
    if (orders && orders.length > 0) {
      const groupedOrders = orders.reduce((acc, item) => {
        if (!acc[item.patient.uuid]) {
          acc[item.patient.uuid] = [];
        }
        acc[item.patient.uuid].push(item);
        return acc;
      }, {});

      // Convert the result to an array of objects with patientId and orders
      return Object.keys(groupedOrders).map((patientId) => ({
        patientId: patientId,
        orders: groupedOrders[patientId],
      }));
    } else {
      return [];
    }
  }
  const groupedOrdersByPatient = groupOrdersById(workListEntries);
  const searchResults = useSearchGroupedResults(
    groupedOrdersByPatient,
    searchString
  );
  const {
    goTo,
    results: paginatedResults,
    currentPage,
  } = usePagination(searchResults, currentPageSize);

  const pageSizes = [10, 20, 30, 40, 50];

  const rowsdata = useMemo(() => {
    return paginatedResults.map((patient) => ({
      id: patient.patientId,
      patientname: patient.orders[0].patient?.display?.split("-")[1],
      orders: patient.orders,
      totalorders: patient.orders?.length,
      fulfillerStatus: patient.orders[0].fulfillerStatus,
      action:
        patient.orders[0].fulfillerStatus === "COMPLETED" ? (
          <TransitionLatestQueueEntryButton patientUuid={patient.patientId} />
        ) : null,
    }));
  }, [paginatedResults]);

  const tableColumns = useMemo(() => {
    const showActionColumn = workListEntries.some(
      (order) => order.fulfillerStatus === "COMPLETED"
    );

    const columns = [
      { id: 0, header: t("patient", "Patient"), key: "patientname" },
      { id: 1, header: t("totalorders", "Total Orders"), key: "totalorders" },
    ];

    if (showActionColumn) {
      columns.push({
        id: 2,
        header: t("actionButton", "Action"),
        key: "action",
      });
    }

    return columns;
  }, [workListEntries, t]);
  return (
    <div>
      <DataTable
        rows={rowsdata}
        headers={tableColumns}
        overflowMenuOnHover={true}
      >
        {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
          <>
            <TableContainer>
              <TableToolbar className={styles.ordersTableToolbar}>
                <TableToolbarContent style={{ margin: 0 }}>
                  <TableToolbarSearch
                    className={styles.ordersToolbarSearchBar}
                    onChange={(event) => setSearchString(event.target.value)}
                  />
                </TableToolbarContent>
              </TableToolbar>
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    <TableExpandHeader />
                    {headers.map((header) => (
                      <TableHeader {...getHeaderProps({ header })}>
                        {header.header}
                      </TableHeader>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.length > 0 ? (
                    rows.map((row) => (
                      <React.Fragment key={row.id}>
                        <TableExpandRow {...getRowProps({ row })}>
                          {row.cells.map((cell) => (
                            <TableCell key={cell.id}>
                              {cell.id.endsWith("created")
                                ? formatDate(parseDate(cell.value))
                                : cell.value}
                            </TableCell>
                          ))}
                        </TableExpandRow>
                        <TableExpandedRow colSpan={headers.length + 1}>
                          <ListOrderDetails
                            actions={props.actions}
                            groupedOrders={groupedOrdersByPatient.find(
                              (item) => item.patientId === row.id
                            )}
                            showActions={props.showActions}
                            showOrderType={props.showOrderType}
                            showStartButton={props.showStartButton}
                            showStatus={props.showStatus}
                          />
                        </TableExpandedRow>
                      </React.Fragment>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={headers.length + 1}
                        style={{ textAlign: "center" }}
                        className={styles.noOrdersDiv}
                      >
                        {t("noOrderAvailable", "No Orders Availalble")}
                      </TableCell>
                    </TableRow>
                  )}
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

export default GroupedOrdersTable;
