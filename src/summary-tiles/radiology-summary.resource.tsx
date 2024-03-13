/* eslint-disable @typescript-eslint/no-unused-vars */
import useSWR, { mutate } from "swr";
import useSWRImmutable from "swr/immutable";
import {
  FetchResponse,
  openmrsFetch,
  restBaseUrl,
  useConfig,
} from "@openmrs/esm-framework";

import { Result } from "../work-list/work-list.resource";
import { useCallback } from "react";

// worklist
export function useLabTestsStats(fulfillerStatus: string) {
  const { laboratoryOrderTypeUuid } = useConfig();

  const orderTypeQuery =
    laboratoryOrderTypeUuid !== ""
      ? `orderType=${laboratoryOrderTypeUuid}&`
      : "";

  const apiUrl = `${restBaseUrl}/order?${orderTypeQuery}fulfillerStatus=${fulfillerStatus}&v=full`;

  const mutateOrders = useCallback(
    () =>
      mutate(
        (key) =>
          typeof key === "string" &&
          key.startsWith(
            `/ws/rest/v1/order?orderType=${laboratoryOrderTypeUuid}`
          )
      ),
    [laboratoryOrderTypeUuid]
  );

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<Result> } },
    Error
  >(apiUrl, openmrsFetch);
  return {
    count: data?.data ? data.data.results.length : 0,
    isLoading,
    isError: error,
    mutate: mutateOrders,
  };
}
