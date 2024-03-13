import { openmrsFetch } from "@openmrs/esm-framework";
import useSWR from "swr";
import { Result } from "../work-list/work-list.resource";

export function useOrdersWorklist(
  activatedOnOrAfterDate: string,
  fulfillerStatus: string
) {
  const orderTypeParam = `orderTypes=4237a01f-29c5-4167-9d8e-96d6e590aa33&activatedOnOrAfterDate=${activatedOnOrAfterDate}&isStopped=false&fulfillerStatus=${fulfillerStatus}&v=full`;
  const apiUrl = `/ws/rest/v1/order?${orderTypeParam}`;

  const { data, error, isLoading } = useSWR<
    { data: { results: Array<Result> } },
    Error
  >(apiUrl, openmrsFetch);

  const orders = data?.data?.results?.filter((order) => {
    if (fulfillerStatus === "") {
      return (
        order.fulfillerStatus === null &&
        order.dateStopped === null &&
        order.action === "NEW"
      );
    } else if (fulfillerStatus === "IN_PROGRESS") {
      return (
        order.fulfillerStatus === "IN_PROGRESS" &&
        order.dateStopped === null &&
        order.action !== "DISCONTINUE"
      );
    }
  });

  return {
    workListEntries: orders?.length > 0 ? orders : [],
    isLoading,
    isError: error,
  };
}
