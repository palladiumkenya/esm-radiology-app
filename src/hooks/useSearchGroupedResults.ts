import { formatDate, parseDate } from "@openmrs/esm-framework";
import { useMemo } from "react";
import { Result } from "../radiology-tabs/work-list/work-list.resource";
import {
  GroupedOrders,
  ListOrdersDetailsProps,
} from "../radiology-tabs/common/radiologyProps.resource";

export function useSearchGroupedResults(
  data: GroupedOrders[],
  searchString: string
) {
  const searchResults = useMemo(() => {
    if (searchString && searchString.trim() !== "") {
      const search = searchString.toLowerCase();

      // Normalize the search string to lowercase
      const lowerSearchString = searchString.toLowerCase();
      return data.filter((orderGroup) =>
        orderGroup.orders.some(
          (order) =>
            order.orderNumber.toLowerCase().includes(lowerSearchString) ||
            order.patient.display.toLowerCase().includes(lowerSearchString)
        )
      );
    }

    return data;
  }, [searchString, data]);

  return searchResults;
}
