import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Location } from "@carbon/react/icons";
import { useSession } from "@openmrs/esm-framework";
import RadiologyIllustration from "./radiology-illustration.component";
import styles from "./radiology-header.scss";
import { DatePicker, DatePickerInput } from "@carbon/react";
import dayjs from "dayjs";
import SelectedDateContext from "../hooks/selectedDateContext";
import { omrsDateFormat } from "../constants";

export const RadiologyHeader: React.FC = () => {
  const { t } = useTranslation();
  const userSession = useSession();
  const userLocation = userSession?.sessionLocation?.display;
  const { selectedDate, setSelectedDate } = useContext(SelectedDateContext);

  return (
    <div className={styles.header}>
      <div className={styles["left-justified-items"]}>
        <RadiologyIllustration />
        <div className={styles["page-labels"]}>
          <p className={styles["page-name"]}>{t("radiology", "Radiology")}</p>
        </div>
      </div>
      <div className={styles["right-justified-items"]}>
        <div className={styles["date-and-location"]}>
          <Location size={16} />
          <span className={styles.value}>{userLocation}</span>
          <span className={styles.middot}>&middot;</span>
          <DatePicker
            onChange={([date]) =>
              setSelectedDate(dayjs(date).startOf("day").format(omrsDateFormat))
            }
            value={dayjs(selectedDate).format("DD MMM YYYY")}
            dateFormat="d-M-Y"
            datePickerType="single"
          >
            <DatePickerInput
              style={{
                cursor: "pointer",
                backgroundColor: "transparent",
                border: "none",
                maxWidth: "10rem",
              }}
              id="radiology-date-picker"
              placeholder="DD-MMM-YYYY"
              labelText=""
              type="text"
            />
          </DatePicker>
        </div>
      </div>
    </div>
  );
};
