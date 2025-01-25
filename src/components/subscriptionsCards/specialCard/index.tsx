import {
  SimpleButtonOutline,
  SimpleDarkButton,
  SimpleLightButton,
} from "@/components/buttons";
import { ToggleSwitch } from "@/components/inputs/toggle";
import { useState } from "react";

interface SubscriptionSpecialCardProps {
  full?: boolean;
  title: string;
  description: string;
  yearlyPrice: string;
  monthlyPrice: string;
  secondaryYearlyPriceText: string;
  secondaryMonthlyPriceText: string;
  actionButton: string;
}

export const SubscriptionSpecialCard: React.FC<
  SubscriptionSpecialCardProps
> = ({
  full = false,
  title,
  description,
  yearlyPrice,
  monthlyPrice,
  secondaryYearlyPriceText,
  secondaryMonthlyPriceText,
  actionButton,
}) => {
  const [isYearly, setIsYearly] = useState<boolean>(true);
  const onToggle = () => setIsYearly(!isYearly);
  return (
    <article
      className={`
            relative flex flex-col items-tart justify-center
            ${full ? "w-full" : "w-full max-w-[270px]"}
            rounded-lg p-5
            bg-gradient-to-br from-coffi-purple from-40% to-coffi-blue/30 text-coffi-white
            shadow-xl shadow-coffi-purple-200
        `}
    >
      <section className="w-full flex flex-nowrap items-center justify-between">
        <h2 className="font-extrabold text-3xl md:text-4xl">{title}</h2>

        <ToggleSwitch label="Yearly" isChecked={isYearly} onToggle={onToggle} />
      </section>
      <p className="text-md font-light mb-1">{description}</p>

      <section className="flex flex-row flex-nowrap items-end justify-start">
        <strong className="font-bold text-xl md:text-2xl mr-1">
          {isYearly ? yearlyPrice : monthlyPrice}
        </strong>
        {isYearly && <p className="text-xs font-bold mb-1">Billed annualy</p>}
      </section>
      <p className="font-light text-xs mb-3">
        {isYearly ? secondaryYearlyPriceText : secondaryMonthlyPriceText}
      </p>

      <SimpleDarkButton action={() => {}} text={actionButton} full />
    </article>
  );
};
