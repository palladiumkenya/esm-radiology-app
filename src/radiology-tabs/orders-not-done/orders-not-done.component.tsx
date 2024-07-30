import React, { useState } from "react";
import { DataTableSkeleton } from "@carbon/react";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import styles from "../test-ordered/tests-ordered.scss";
import Overlay from "../../components/overlay/overlay.component";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";
interface NotDoneProps {
  fulfillerStatus: string;
}
export const OrdersNotDone: React.FC<NotDoneProps> = ({ fulfillerStatus }) => {
  const { workListEntries, isLoading } = useOrdersWorklist("", fulfillerStatus);

  if (isLoading) {
    return <DataTableSkeleton role="progressbar" />;
  }
  if (workListEntries?.length >= 0) {
    return (
      <>
        <div>
          <div className={styles.headerBtnContainer}></div>
          <GroupedOrdersTable
            orders={workListEntries}
            showStatus={true}
            showStartButton={false}
            showActions={true}
            showOrderType={false}
            actions={[
              {
                actionName: "radiology-reject-reason-modal",
                displayPosition: 1,
              },
            ]}
          />
        </div>
        <Overlay />
      </>
    );
  }
};
export default OrdersNotDone;
