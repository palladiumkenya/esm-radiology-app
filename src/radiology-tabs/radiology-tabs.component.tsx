import React from "react";
import { TabPanels } from "@carbon/react";
import { TabList } from "@carbon/react";
import { Tabs } from "@carbon/react";
import { Tab } from "@carbon/react";
import { TabPanel } from "@carbon/react";
import { Checkbox } from "@carbon/react";
import { Button } from "@carbon/react";
import { TextInput } from "@carbon/react";

interface radiologyTabsProps {}

export const RadiologyTabs: React.FC<radiologyTabsProps> = () => {
  return (
    <div>
      <Tabs>
        <TabList
          aria-label="List of tabs"
          contained
          style={{ marginLeft: "1rem" }}
        >
          <Tab>Placeholder 1</Tab>
          <Tab>Placeholder 2</Tab>
          <Tab>Placeholder 3</Tab>
          <Tab>Placeholder 4</Tab>
          <Tab>Placeholder 5</Tab>
          <Tab>Placeholder 6</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
          <TabPanel>Placeholder for component</TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};
