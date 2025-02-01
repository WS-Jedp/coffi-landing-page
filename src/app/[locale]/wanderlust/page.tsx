import Image from "next/image";
import Link from "next/link";

export default function Wanderlust() {
  return (
    <article className="relative flex flex-col items-center justify-items-center w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h1 className="font-bold text-4xl md:text-7xl mb-3 text-start md:text-center">
        Wanderlust Plan: For the True Adventurers
      </h1>
      <p className="text-lg font-light mt-1 mb-3 text-start md:text-center w-full max-w-[500px]">
        Explore every corner of the world while staying connected to your
        purpose with Coffi.
      </p>

      <section className="text-lg mt-1 mb-6 text-start w-full px-1">
        <p>
          The Wanderlust Plan is our ambitious vision for adventurers who dare
          to explore without limits. It’s for those who want to experience the
          world, yet stay productive and aligned with their life goals. While
          it’s still in development, we’re excited to share what’s coming.
        </p>
      </section>

      <section className="mt-1 mb-3 text-start w-full px-1">
        <h2 className="font-bold text-2xl md:text-4xl mb-3">
          Building the Future of Coffi Together
        </h2>
        <p className="text-lg">
          As a newly launched startup with a small but passionate team—currently
          led by a single software engineer—Coffi is committed to growing
          sustainably. The Wanderlust Plan is in development and will become a
          reality as soon as we have the resources to make it perfect for our
          users. Your support as early adopters helps pave the way for this
          vision.
        </p>
      </section>

      <section className="mt-1 mb-3 text-start w-full px-1 grid grid-cols-6 grid-rows-1 gap-4 md:gap-4">
        <article className="flex flex-col items-start text-start col-span-6 sm:col-span-3 md:col-span-2 bg-coffi-blue/10 text-coffi-blue rounded-2xl p-6 ">
          <h3 className="font-bold text-xl mb-1">
            Everything from Explorer and Nomad Plans, and More!
          </h3>
          <p className="text-sm">
            Enjoy all the perks from our first two plans—extensive spot
            databases, real-time community updates, and the ability to discover
            and share places—but with added features tailored for the true
            adventurers out there.
          </p>
        </article>
        <article className="flex flex-col items-start text-start col-span-6 sm:col-span-3 md:col-span-2 bg-coffi-purple/10 text-coffi-purple rounded-2xl p-6">
          <h3 className="font-bold text-xl mb-1">
            Unlock Bigger Discounts and Earn More Coffi Points
          </h3>
          <p className="text-sm">
            Take your contributions further! Update spots, share discoveries,
            and earn 2.5X Coffi Points, which you can redeem for rewards. Plus,
            enjoy exclusive discounts on places that truly make your adventures
            special.
          </p>
        </article>
        <article className="flex flex-col items-start text-start col-span-6 sm:col-span-3 md:col-span-2 bg-gradient-to-br from-coffi-blue/5 to-coffi-blue/40 text-coffi-blue rounded-2xl p-6 ">
          <h3 className="font-bold text-xl mb-1">
            Chat Directly with Spot Staff
          </h3>
          <p className="text-sm">
            Get personal! With the Wanderlust Plan, you can interact directly
            with the staff at your favorite spots. Want to reserve a table? Need
            a quick update about the crowd or vibe? You’ll have the tools to
            connect with them instantly.
          </p>
        </article>
      </section>

        <section className="w-full grid grid-cols-4 grid-rows-1 gap-12 mt-6">
          <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px]">
            <section>
              <h2 className="font-bold text-2xl md:text-3xl mb-3">
                Expanding the Coffi Database
              </h2>
              <p className="text-lg">
                We are working tirelessly to expand our database of spots,
                ensuring that every digital nomad has access to the best places
                to work, study, or relax. Our goal is to create meaningful
                alliances with local businesses, offering benefits that serve
                both the users and the places they visit.
              </p>
            </section>
            <Link
              className="font-bold underline flex flex-row flex-nowrap"
              href="https://coffi.com.co"
            >
              Learn more about our plans for registered places
              <Image
                alt="Link icon"
                src="/assets/icons/link-icon.svg"
                width={11}
                height={11}
                className="ml-1"
              />
            </Link>
          </article>

          <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 h-auto md:h-[270px]">
            <section>
              <h2 className="font-bold text-2xl md:text-3xl mb-3">
                Partnerships with Companies
              </h2>
              <p className="text-lg">
                We believe that the future of work is remote, and we want to
                help companies support their remote teams. We’re developing a
                special plan for businesses, enabling their employees to enjoy
                Coffi’s benefits while empowering companies with tools to
                enhance employee well-being and productivity.
              </p>
            </section>
            <Link
              className="font-bold underline flex flex-row flex-nowrap"
              href="https://coffi.com.co"
            >
              Learn more about our plan for companies
              <Image
                alt="Link icon"
                src="/assets/icons/link-icon.svg"
                width={11}
                height={11}
                className="ml-1"
              />
            </Link>
          </article>
        </section>
    </article>
  );
}
