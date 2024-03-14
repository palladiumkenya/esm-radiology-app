/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import { useTranslation } from "react-i18next";
import styles from "./radiology-summary-tiles.scss";
import {
  AssignedExtension,
  useConnectedExtensions,
  useSession,
  Extension,
} from "@openmrs/esm-framework";
import { ComponentContext } from "@openmrs/esm-framework/src/internal";

const RadiologySummaryTiles: React.FC = () => {
  const { t } = useTranslation();

  const session = useSession();

  const radioTileSlot = "radio-tiles-slot";

  const tilesExtensions = useConnectedExtensions(
    radioTileSlot
  ) as AssignedExtension[];

  return (
    <div className={styles.cardContainer}>
      {tilesExtensions
        .filter((extension) => Object.keys(extension.meta).length > 0)
        .map((extension, index) => {
          return (
            <ComponentContext.Provider
              key={extension.id}
              value={{
                moduleName: extension.moduleName,
                extension: {
                  extensionId: extension.id,
                  extensionSlotName: radioTileSlot,
                  extensionSlotModuleName: extension.moduleName,
                },
              }}
            >
              <Extension />
            </ComponentContext.Provider>
          );
        })}
    </div>
  );
};

export default RadiologySummaryTiles;
