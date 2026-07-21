interface RedirectFilters {
  /** Selected primary intention (single value), e.g. "focus". */
  purpose?: string | null;
  /** Selected type of place (single value), e.g. "cafe". */
  placeType?: string | null;
  /** Selected needs (multiple values), e.g. ["stableWifi", "quiet"]. */
  needs?: string[];
}

const openCoffi = (filters?: RedirectFilters) => {
  const coffiUrl = process.env.NEXT_PUBLIC_COFFI_APP_URL;
  if (!coffiUrl) return;

  const params = new URLSearchParams();
  if (filters?.purpose) params.set("purpose", filters.purpose);
  if (filters?.placeType) params.set("placeType", filters.placeType);
  if (filters?.needs && filters.needs.length > 0) {
    params.set("needs", filters.needs.join(","));
  }

  const query = params.toString();
  window.open(query ? `${coffiUrl}?${query}` : coffiUrl, "_blank");
};

export const useRedirectToCoffiApp = () => {
  return {
    /** Opens the Coffi app. Safe to pass directly as an onClick handler. */
    redirectToCoffi: () => openCoffi(),
    /** Opens the Coffi app forwarding the selected filters as query params. */
    redirectToCoffiWithFilters: (filters: RedirectFilters) => openCoffi(filters),
  };
};
