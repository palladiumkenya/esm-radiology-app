import React from "react";
import { TabPanels, TabList, Tabs, Tab, TabPanel } from "@carbon/react";
import { TestsOrdered } from "./test ordered/tests-ordered.component";
import { useTranslation } from "react-i18next";
import WorkList from "../work-list/work-list.component";

interface radiologyTabsProps {}

export const RadiologyTabs: React.FC<radiologyTabsProps> = () => {
  const { t } = useTranslation();
  return (
    <div>
      <Tabs>
        <TabList
          aria-label="List of tabs"
          contained
          style={{ marginLeft: "1rem" }}
        >
          <Tab>{t("testOrdered", "Test Ordered")}</Tab>
          <Tab>{t("workList", "WorkList")}</Tab>
          <Tab>Placeholder 3</Tab>
          <Tab>Placeholder 4</Tab>
          <Tab>Placeholder 5</Tab>
          <Tab>Placeholder 6</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <TestsOrdered />
          </TabPanel>
          <TabPanel>
            <WorkList fulfillerStatus={""} />
          </TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
