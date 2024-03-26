import { useEffect, useMemo } from "react";
import useSWRImmutable from "swr/immutable";
import fuzzy from "fuzzy";
import {
  type FetchResponse,
  openmrsFetch,
  useConfig,
  restBaseUrl,
  reportError,
} from "@openmrs/esm-framework";
import { type Concept } from "../../../types";
import { type RadiologyConfig } from "../../../config-schema";

type ConceptResult = FetchResponse<Concept>;
type ConceptResults = FetchResponse<{ results: Array<Concept> }>;

export interface RadiologyType {
  label: string;
  conceptUuid: string;
}

export interface UseRadiologyType {
  testTypes: Array<RadiologyType>;
  isLoading: boolean;
  error: Error;
}

function openmrsFetchMultiple(urls: Array<string>) {
  // SWR has an RFC for `useSWRList`:
  // https://github.com/vercel/swr/discussions/1988
  // If that ever is implemented we should switch to using that.
  return Promise.all(
    urls.map((url) => openmrsFetch<{ results: Array<Concept> }>(url))
  );
}

function useRadiologyConceptsSWR(labOrderableConcepts?: Array<string>) {
  const { data, isLoading, error } = useSWRImmutable(
    () =>
      labOrderableConcepts
        ? labOrderableConcepts.map((c) => `${restBaseUrl}/concept/${c}`)
        : `${restBaseUrl}/concept?s=byConceptClass&conceptClass=8caa332c-efe4-4025-8b18-3398328e1323`,
    (labOrderableConcepts ? openmrsFetchMultiple : openmrsFetch) as any,
    {
      shouldRetryOnError(err) {
        return err instanceof Response;
      },
    }
  );

  const results = useMemo(() => {
    if (isLoading || error) return null;
    return labOrderableConcepts
      ? (data as Array<ConceptResult>)?.flatMap((d) => d.data.setMembers)
      : (data as ConceptResults)?.data.results ?? ([] as Concept[]);
  }, [data, isLoading, error]);

  return {
    data: results,
    isLoading,
    error,
  };
}

export function useRadiologyTypes(searchTerm = ""): UseRadiologyType {
  const { labOrderableConcepts } = useConfig<RadiologyConfig>().orders;

  const { data, isLoading, error } = useRadiologyConceptsSWR(
    labOrderableConcepts.length ? labOrderableConcepts : null
  );

  useEffect(() => {
    if (error) {
      reportError(error);
    }
  }, [error]);

  const testConcepts = useMemo(() => {
    return data?.map((concept) => ({
      label: concept.display,
      conceptUuid: concept.uuid,
    }));
  }, [data]);

  const filteredTestTypes = useMemo(() => {
    return searchTerm && !isLoading && !error
      ? fuzzy
          .filter(searchTerm, testConcepts, { extract: (c) => c.label })
          .map((result) => result.original)
      : testConcepts;
  }, [testConcepts, searchTerm]);

  return {
    testTypes: filteredTestTypes,
    isLoading: isLoading,
    error: error,
  };
}
