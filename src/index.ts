import {
  getAsyncLifecycle,
  defineConfigSchema,
  getSyncLifecycle,
} from "@openmrs/esm-framework";
import { configSchema } from "./config-schema";
import { createLeftPanelLink } from "./left-panel-link";
import worklistTile from './radio-tiles/worklist-tile.component';
import referredTile from "./radio-tiles/referred-tile.component";
import completedTile from "./radio-tiles/completed-tile.component";
import testsOrdered from "./radio-tiles/tests-ordered-tile.component"

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

/**
 * This function performs any setup that should happen at microfrontend
 * load-time (such as defining the config schema) and then returns an
 * object which describes how the React application(s) should be
 * rendered.
 */
export function startupApp() {
  defineConfigSchema(moduleName, configSchema);
}

/**
 * This named export tells the app shell that the default export of `root.component.tsx`
 * should be rendered when the route matches `root`. The full route
 * will be `openmrsSpaBase() + 'root'`, which is usually
 * `/openmrs/spa/root`.
 */
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
