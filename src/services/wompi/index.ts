export const getWompiPaymentReference = async (params: {
  isYearly: boolean;
  currency: "COP";
  email: string;
}) => {
  const baseUrl = process.env.NEXT_PUBLIC_COFFI_SERVER;

  if (!baseUrl) return;

  const resp = await fetch(
    `${baseUrl}/wompi/generate-keys?email=${params.email}&isYearly=${params.isYearly}&currency=${params.currency}`,
    {
      method: "get",
    }
  );

  const data = (await resp.json()) as {
    status: number;
    content: {
      coffiDbReferenceId: string;
      wompiIntegrationSecret: string;
      wompiPublicKey: string;
      priceInCOP: number
    };
  };

  return data.content;
};

export const validateUserSubscription = async (params: { email: string }) => {
  const baseUrl = process.env.NEXT_PUBLIC_COFFI_SERVER;

  if (!baseUrl) return;

  const resp = await fetch(
    `${baseUrl}/wompi/validate-user-subscription?email=${params.email}`,
    {
      method: "get",
    }
  );

  const data = (await resp.json()) as {
    status: number;
    content: {
      isValid: boolean;
      userExists: boolean;
    };
  };

  return data.content;
};
