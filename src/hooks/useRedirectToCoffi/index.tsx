export const useRedirectToCoffiApp = () => {
  return {
    redirectToCoffi: () => {
      const coffiUrl = process.env.NEXT_PUBLIC_COFFI_APP_URL;
      window.open(coffiUrl, "_blank");
    },
  };
};
