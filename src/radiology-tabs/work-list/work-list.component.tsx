import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Information, Microscope, TrashCan } from "@carbon/react/icons";

import { 
  DataTableSkeleton,  
} from "@carbon/react";
import styles from "./work-list.scss";
import Overlay from "../../components/overlay/overlay.component";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";
import {
  WorklistProps,
} from "../common/radiologyProps.resource";
import GroupedOrdersTable from "../common/groupedOrdersTable.component";

const WorkList: React.FC<WorklistProps> = ({ fulfillerStatus }) => {
  const { t } = useTranslation();

  const [activatedOnOrAfterDate, setActivatedOnOrAfterDate] = useState("");

  const { workListEntries, isLoading, mutate } = useOrdersWorklist(
    activatedOnOrAfterDate,
    fulfillerStatus
  );

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
            showStartButton={true}
            showActions={true}
            showOrderType={false}
            actions={[
              { actionName: "reject-radiology-order-dialog" },
              { actionName: "procedureReportForm" },
            ]}
          />
        </div>
        <Overlay />
      </>
    );
  }
};

export default WorkList;
