import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createLeftPanelLink } from "./left-panel-link";
import worklistTile from "./radio-tiles/worklist-tile.component";
import referredTile from "./radio-tiles/referred-tile.component";
import completedTile from "./radio-tiles/completed-tile.component";
import testsOrdered from "./radio-tiles/tests-ordered-tile.component";
import reviewTile from "./radio-tiles/review-tile.component";
import approveTile from "./radio-tiles/approved-tile.component";
import notdoneTile from "./radio-tiles/not-done-tile.component";

const moduleName = "@openmrs/esm-radiology-app";

const options = {
  featureName: "openmrs/esm-radiology-app",
  moduleName,
};

export const importTranslation = require.context(
  "../translations",
  false,
  /.json$/,
  "lazy"
);

export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

export const root = getAsyncLifecycle(
  () => import("./root.component"),
  options
);

export const radiologyDashboardLink = getSyncLifecycle(
  createLeftPanelLink({
    name: "radiology",
    title: "Radiology",
  }),
  options
);
export const worklistTileComponent = getSyncLifecycle(worklistTile, options);

export const referredTileComponent = getSyncLifecycle(referredTile, options);

export const completedTileComponent = getSyncLifecycle(completedTile, options);

export const testOrderedTileComponent = getSyncLifecycle(testsOrdered, options);

export const reviewTileComponent = getSyncLifecycle(reviewTile, options);

export const approveTileComponent = getSyncLifecycle(approveTile, options);

export const notDoneTileComponent = getSyncLifecycle(notdoneTile, options);
