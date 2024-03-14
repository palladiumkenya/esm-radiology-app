import useSWR, { mutate } from "swr";
import { openmrsFetch, restBaseUrl } from "@openmrs/esm-framework";

import { Result } from "../radiology-tabs/work-list/work-list.resource";
import { useCallback } from "react";

// worklist
export function useProcedureOrderStats(fulfillerStatus: string) {
  const procedureOrderTypeUuid = "4237a01f-29c5-4167-9d8e-96d6e590aa33"; // TODO Make configurable

  const orderTypeParam = `orderTypes=${procedureOrderTypeUuid}&fulfillerStatus=${fulfillerStatus}
  &v=custom:(uuid,orderNumber,patient:ref,concept:(uuid,display,conceptClass),action,careSetting,orderer:ref,urgency,instructions,commentToFulfiller,display,fulfillerStatus,dateStopped)`;
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
    if (
      order.concept.conceptClass.uuid === "8caa332c-efe4-4025-8b18-3398328e1323"
    ) {
      return order;
    }
  });

  let length = 0;

  if (!fulfillerStatus) {
    const processedData = radiologyOrders?.filter(
      (d) => d.fulfillerStatus == null
    );
    length = processedData?.length;
  } else {
    length = data?.data ? data.data.results.length : 0;
  }
  return {
    count: length,
    isLoading,
    isError: error,
    mutate: mutateOrders,
  };
}
