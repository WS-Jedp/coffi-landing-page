import { SubscriptionSimpleCard } from "@/components/subscriptionsCards/Simple";
import { SubscriptionSpecialCard } from "@/components/subscriptionsCards/specialCard";
import Image from "next/image";

export const Subscriptions: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-start w-full min-h-screen h-auto text-center px-6 xl:px-0 mx-auto mb-14" id="pricing">
      <h1 className="font-bold text-4xl md:text-7xl mx-auto">
        Choose the Plan <br />
        That Fits Your Journey
      </h1>
      <p className="w-full md:w-6/12 wtext-lg font-light mt-2">
        Whether you're starting your adventure or diving deep into the nomadic
        lifestyle, Coffi has a plan for you.
      </p>

      <section className="relative w-full h-auto grid grid-cols-3 grid-rows-1 gap-4 md:gap-7 mt-16">
        <article className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1 ">
          <SubscriptionSimpleCard
            title="Explorer"
            description="Start your journey with the basics, no strings attached."
            price="Free"
            secondaryPriceText="Forever! you just need an account."
            actionButton="Start Exploring"
            specialAction
            full
          />

          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              Embrace your Coffi adventure with access to all official spots and
              basic filters, perfect for discovering the essentials of your city
            </p>
          </div>

          <h3 className="text-lg font-bold mb-1">Benefits and Features</h3>

          <ul className="text-md font-light">
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Access all official spots</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Filter by type, rules, and amenities</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Access to Real-time insights from the community</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Free forever with registration</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>No credit or debit card required</span>
            </li>
          </ul>
        </article>
        <article className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1">
          <SubscriptionSpecialCard
            title="Nomad"
            description="Unlock the full Coffi experience with insights and rewards."
            yearlyPrice="$4,99/Mo"
            monthlyPrice="$6,99/Mo"
            secondaryYearlyPriceText="Or $6,99 billed monthly"
            secondaryMonthlyPriceText="Or $4,99 billed anually"
            actionButton="Upgrade to Nomad Plan"
            full
          />

          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              Go beyond exploration with access to community-discovered spots,
              real-time insights, and Coffi Points.
            </p>
          </div>

          <h3 className="text-lg font-bold mb-1">Benefits and Features</h3>

          <ul className="text-md font-light">
          <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>All Explorer plan benefits</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Access all official and community-discovered spots</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Get exclusive discounts with allies</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Earn 2x Coffi Points by updating spots</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Filter by real-time community insights</span>
            </li>
            <li className="flex flex-row flex-nowrap mb-1">
              <Image
                src="/assets/icons/list-icon.svg"
                width={12}
                height={12}
                alt="List icon"
                className="mr-2"
              />
              <span>Early access to new features</span>
            </li>
          </ul>
        </article>
        <article className="flex flex-col items-start justify-start text-start col-span-3 md:col-span-1">
          <SubscriptionSimpleCard
            title="Wanderlust"
            description="For the true adventurer, ready to redefine their journey."
            price="Coming Soon!"
            secondaryPriceText="We’re working hard to improve really fast."
            actionButton="Know more"
            full
          />
          <div className="h-auto md:h-[120px] mt-4">
            <p className="my-4 font-light text-md">
              The ultimate plan for ambitious nomads, offering advanced
              personalization and features to elevate your Coffi experience.
            </p>
          </div>
        </article>
      </section>
    </article>
  );
};
