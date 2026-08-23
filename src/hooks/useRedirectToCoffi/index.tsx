import {
  buildCoffiFilterParams,
  type CoffiFilterSelection,
} from "@/models/coffiFilters";

/**
 * Where the app lives when the environment does not say.
 *
 * Without this the hook returned silently on a missing env var, which meant the
 * Hero's call to action did nothing at all in local development and in any
 * deploy that forgot to set it — a dead button with no error to explain it.
 */
const FALLBACK_COFFI_APP_URL = "https://app.coffi.com.co";

/**
 * The app screen that owns the map and honours the filter slice.
 *
 * Not the root: `/` is the app's recommendations home and ignores filters
 * entirely, so a filtered link landing there would drop everything the user
 * picked.
 */
const SEARCH_PATH = "/home";

const appBaseUrl = () =>
  (process.env.NEXT_PUBLIC_COFFI_APP_URL || FALLBACK_COFFI_APP_URL).replace(
    /\/+$/,
    ""
  );

const openCoffi = (filters?: CoffiFilterSelection) => {
  const baseUrl = appBaseUrl();

  if (!filters) {
    window.open(baseUrl, "_blank");
    return;
  }

  const query = buildCoffiFilterParams(filters).toString();
  const target = `${baseUrl}${SEARCH_PATH}`;

  window.open(query ? `${target}?${query}` : target, "_blank");
};

export const useRedirectToCoffiApp = () => {
  return {
    /** Opens the Coffi app. Safe to pass directly as an onClick handler. */
    redirectToCoffi: () => openCoffi(),
    /**
     * Opens the app's map with the selected filters already applied.
     *
     * `filters` is expressed in the APP's vocabulary — see `models/coffiFilters`
     * for the contract and for the mapping from the Hero's own option ids.
     */
    redirectToCoffiWithFilters: (filters: CoffiFilterSelection) =>
      openCoffi(filters),
  };
};
