import useSWR, { mutate } from "swr";
import { openmrsFetch, restBaseUrl, useConfig } from "@openmrs/esm-framework";

import { Result } from "../radiology-tabs/work-list/work-list.resource";
import { useCallback } from "react";
import { RadiologyConfig } from "../config-schema";
import { radiologyConceptClass_UUID } from "../constants";

// worklist
export function useProcedureOrderStats(fulfillerStatus: string) {
  const {
    orders: { radiologyOrderTypeUuid },
  } = useConfig<RadiologyConfig>();
  const responseFormat =
    "custom:(uuid,orderNumber,patient:ref,concept:(uuid,display,conceptClass),action,careSetting,orderer:ref,urgency,instructions,commentToFulfiller,display,fulfillerStatus,dateStopped)";
  const orderTypeParam = `orderTypes=${radiologyOrderTypeUuid}&fulfillerStatus=${fulfillerStatus}&v=${responseFormat}`;

  const apiUrl = `/ws/rest/v1/order?${orderTypeParam}`;

  const mutateOrders = useCallback(
    () =>
      mutate(
        (key) =>
          typeof key === "string" &&
          key.startsWith(
            `${restBaseUrl}/order?orderType=${radiologyOrderTypeUuid}`
          )
      ),
    [radiologyOrderTypeUuid]
  );

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<Result> } },
    Error
  >(apiUrl, openmrsFetch);

  const radiologyOrders = data?.data?.results?.filter((order) => {
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

  let length = 0;

  if (fulfillerStatus != null) {
    const processedData = radiologyOrders;
    length = processedData?.length;
  }
  return {
    count: length,
    isLoading,
    isError: error,
    mutate: mutateOrders,
  };
}
