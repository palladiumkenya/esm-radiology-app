import useSWR, { mutate } from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

import { Result } from "../radiology-tabs/work-list/work-list.resource";
import { useCallback } from "react";
import { RadiologyConceptClass_UUID } from "../constants";

// worklist
export function useProcedureOrderStats(fulfillerStatus: string) {
  const procedureOrderTypeUuid = "4237a01f-29c5-4167-9d8e-96d6e590aa33"; // TODO Make configurable
  const responseFormat =
    "custom:(uuid,orderNumber,patient:ref,concept:(uuid,display,conceptClass),action,careSetting,orderer:ref,urgency,instructions,commentToFulfiller,display,fulfillerStatus,dateStopped)";
  const orderTypeParam = `orderTypes=${procedureOrderTypeUuid}&fulfillerStatus=${fulfillerStatus}&v=${responseFormat}`;

  const apiUrl = `/ws/rest/v1/order?${orderTypeParam}`;

  const mutateOrders = useCallback(
    () =>
      mutate(
        (key) =>
          typeof key === "string" &&
          key.startsWith(
            `${restBaseUrl}/order?orderType=${procedureOrderTypeUuid}`
          )
      ),
    [procedureOrderTypeUuid]
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
        order.concept.conceptClass.uuid === RadiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "IN_PROGRESS") {
      return (
        order.fulfillerStatus === "IN_PROGRESS" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === RadiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "COMPLETED") {
      return (
        order.fulfillerStatus === "COMPLETED" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === RadiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "EXCEPTION") {
      return (
        order.fulfillerStatus === "EXCEPTION" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === RadiologyConceptClass_UUID
      );
    } else if (fulfillerStatus === "DECLINED") {
      return (
        order.fulfillerStatus === "DECLINED" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE" &&
        order.concept.conceptClass.uuid === RadiologyConceptClass_UUID
      );
    }
  });
  return {
    count: radiologyOrders?.length > 0 ? radiologyOrders.length : 0,
    isLoading,
    isError: error,
    mutate: mutateOrders,
  };
}
