/* eslint-disable @typescript-eslint/no-empty-function */
import { createContext } from "react";
import dayjs from "dayjs";
import { omrsDateFormat } from "../constants";

const SelectedDateContext = createContext({
  selectedDate: dayjs().startOf("day").format(omrsDateFormat),
  setSelectedDate: (date: string) => {},
});

export default SelectedDateContext;
