import { openmrsFetch, useConfig } from "@openmrs/esm-framework";
import useSWR from "swr";
import { Result } from "../radiology-tabs/work-list/work-list.resource";
import { RadiologyConfig } from "../config-schema";
import { radiologyConceptClass_UUID } from "../constants";

export function useOrdersWorklist(
  activatedOnOrAfterDate: string,
  fulfillerStatus: string
) {
  const {
    orders: { radiologyOrderTypeUuid },
  } = useConfig<RadiologyConfig>();
  const responseFormat =
    "custom:(uuid,orderNumber,patient:ref,concept:(uuid,display,conceptClass),action,careSetting,orderer:ref,urgency,instructions,bodySite,laterality,commentToFulfiller,procedures,display,fulfillerStatus,dateStopped,scheduledDate,dateActivated,fulfillerComment)";
  const orderTypeParam = `orderTypes=${radiologyOrderTypeUuid}&activatedOnOrAfterDate=${activatedOnOrAfterDate}&isStopped=false&fulfillerStatus=${fulfillerStatus}&v=${responseFormat}`;
  const apiUrl = `/ws/rest/v1/order?${orderTypeParam}`;

  const { data, error, isLoading, mutate } = useSWR<
    { data: { results: Array<Result> } },
    Error
  >(apiUrl, openmrsFetch);

  const orders = data?.data?.results?.filter((order) => {
    if (fulfillerStatus === "") {
      return (
        order.fulfillerStatus === null &&
        order.dateStopped === null &&
        order.action === "NEW" &&
        order.concept.conceptClass.uuid === radiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "IN_PROGRESS") {
      return (
        order.fulfillerStatus === "IN_PROGRESS" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === radiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "DECLINED") {
      return (
        order.fulfillerStatus === "DECLINED" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === radiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "COMPLETED") {
      return (
        order.fulfillerStatus === "COMPLETED" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === radiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "EXCEPTION") {
      return (
        order.fulfillerStatus === "EXCEPTION" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === radiologyConceptClass_UUID
      );
    }
  }); 
  
  const sortedOrders = orders?.sort(
    (a, b) =>
      new Date(a.dateActivated).getTime() - new Date(b.dateActivated).getTime()
  );

  return {
    workListEntries: sortedOrders?.length > 0 ? sortedOrders : [],
    isLoading,
    isError: error,
    mutate,
  };
}
