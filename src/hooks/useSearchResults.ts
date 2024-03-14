import { useMemo } from "react";

export function useSearchResults<T>(data: T[], searchString: string): T[] {
  const searchResults = useMemo(() => {
    if (searchString && searchString.trim() !== "") {
      const search = searchString.toLowerCase();
      return data.filter((appointment) =>
        Object.entries(appointment).some(([header, value]) => {
          if (header === "patientUuid") {
            return false;
          }
          return `${value}`.toLowerCase().includes(search);
        })
      );
    }

    return data;
  }, [searchString, data]);

  return searchResults;
}
