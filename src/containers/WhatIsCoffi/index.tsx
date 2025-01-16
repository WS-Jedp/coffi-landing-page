import { SimpleButton } from "@/components/buttons";

export const WhatIsCoffi: React.FC = () => {
  return (
    <article className="flex flex-row items-center justify-between w-full h-[90vh] px-6 lg:px-0">
      <section className="w-7/12">
        <h1 className="font-bold text-7xl">
          Discover top places in Medellín <br />
          To Elevate your <span className="text-coffi-purple">Work</span> <br />
          sessions
        </h1>
        <p className="text-lg font-light mt-1 mb-3">
          Browse, choose, and thrive in the best local spots for you, curated
          with real-time insights from other digital nomads
        </p>
        <section className="flex flex-col items-center justify-start w-64">
          <SimpleButton action={() => {}} text="Find your place" />
          <span className="font-light text-sm my-1">Or</span>
          <a href="#" className="font-light text-md">
            Discover more about Coffi
          </a>
        </section>
      </section>
    </article>
  );
};
