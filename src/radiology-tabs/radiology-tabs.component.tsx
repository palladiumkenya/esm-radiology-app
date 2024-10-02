import React from "react";
import { TabPanels, TabList, Tabs, Tab, TabPanel } from "@carbon/react";
import { TestsOrdered } from "./test-ordered/tests-ordered.component";
import { useTranslation } from "react-i18next";
import WorkList from "./work-list/work-list.component";
import { ReferredTests } from "./referred-test/referred-ordered.component";
import { Review } from "./review-ordered/review-ordered.component";
import { ApprovedOrders } from "./approved/approved-orders.component";
import { OrdersNotDone } from "./orders-not-done/orders-not-done.component";
import { useProcedureOrderStats } from "../summary-tiles/radiology-summary.resource";
import { useOrdersWorklist } from "../hooks/useOrdersWorklist";

export const RadiologyTabs: React.FC = () => {
  const { t } = useTranslation();

  const { count: activeOrdersCount } = useProcedureOrderStats("");
  const { count: workListCount } = useProcedureOrderStats("IN_PROGRESS");
  const { count: referredTestsCount } = useProcedureOrderStats("EXCEPTION");
  const { count: ordersNotDoneCount } = useProcedureOrderStats("DECLINED");
  const { workListEntries } = useOrdersWorklist("", "COMPLETED");
  const pendingReview = workListEntries.filter((item) =>
    item.procedures?.some((procedure) => procedure.outcome !== "SUCCESSFUL")
  );
  const pendingReviewCount = pendingReview?.length ?? 0;
  const approved = workListEntries.filter((item) =>
    item.procedures?.some((procedure) => procedure.outcome === "SUCCESSFUL")
  );
  const approvedOrdersCount = approved?.length ?? 0;

  return (
    <div>
      <Tabs>
        <TabList
          aria-label="List of tabs"
          contained
          style={{ marginLeft: "1rem" }}
        >
          <Tab>
            {t("pendingOrders", "Active Orders")} ({activeOrdersCount})
          </Tab>
          <Tab>
            {t("workList", "WorkList")} ({workListCount})
          </Tab>
          <Tab>
            {t("referredProcedures", "Referred Out")} ({referredTestsCount})
          </Tab>
          <Tab>
            {t("review", "Pending Review")} ({pendingReviewCount})
          </Tab>
          <Tab>
            {t("approved", "Approved")} ({approvedOrdersCount})
          </Tab>
          <Tab>
            {t("notDone", "Not Done")} ({ordersNotDoneCount})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TestsOrdered />
          </TabPanel>
          <TabPanel>
            <WorkList fulfillerStatus={"IN_PROGRESS"} />
          </TabPanel>
          <TabPanel>
            <ReferredTests />
          </TabPanel>
          <TabPanel>
            <Review />
          </TabPanel>
          <TabPanel>
            <ApprovedOrders />
          </TabPanel>
          <TabPanel>
            <OrdersNotDone fulfillerStatus={"DECLINED"} />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
