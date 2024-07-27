import React, { useState, useMemo, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Information, Microscope, TrashCan } from "@carbon/react/icons";

import {
  DataTable,
  DataTableSkeleton,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableHeader,
  TableRow,
  TableToolbar,
  TableToolbarContent,
  TableToolbarSearch,
  Layer,
  Tag,
  Button,
  Tile,
  DatePicker,
  DatePickerInput,
  Tooltip,
} from "@carbon/react";
import { Result } from "../work-list/work-list.resource";
import styles from "./work-list.scss";
import {
  ConfigurableLink,
  formatDate,
  parseDate,
  showModal,
  usePagination,
  showSnackbar,
  showNotification,
  openmrsFetch,
  restBaseUrl,
} from "@openmrs/esm-framework";
import { launchOverlay } from "../../components/overlay/hook";
import Overlay from "../../components/overlay/overlay.component";
import ProcedureReportForm from "../../results/result-form.component";
import { getStatusColor } from "../../utils/functions";
import { useOrdersWorklist } from "../../hooks/useOrdersWorklist";

export interface WorklistProps {
  fulfillerStatus: string;
}

export interface ResultsOrderProps {
  order: Result;
  patientUuid: string;
}

export interface RejectOrderProps {
  order: Result;
}

export interface InstructionsProps {
  order: Result;
}

export interface GroupedOrders {
  patientId: string;
  orders: Result[];
}
export interface GroupedOrdersTableProps {
  orders: Result[];
  showStatus:boolean;
  showStartButton:boolean;
  showActions:boolean;
  showOrderType:boolean;
  actions:OrderAction[];
}

export interface ListOrdersDetailsProps {
  groupedOrders:  GroupedOrders
  showStatus:boolean;
  showStartButton:boolean;
  showActions:boolean;
  showOrderType:boolean;
  actions:OrderAction[];
}

export interface OrderAction{
  actionName:string;
}