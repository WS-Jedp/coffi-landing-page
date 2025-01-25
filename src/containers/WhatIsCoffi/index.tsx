import { SimpleButton } from "@/components/buttons";

export const WhatIsCoffi: React.FC = () => {
  return (
    <article className="flex flex-row items-start md:items-center justify-between w-full h-[90vh] pt-6 md:pt-0 px-6 xl:px-0">
      <section className="w-full md:w-7/12">
        <h1 className="font-bold text-4xl md:text-7xl text-center md:text-start">
          Discover top places in Medellín <br />
          To Elevate your <span className="text-coffi-purple">Work</span> <br />
          sessions
        </h1>
        <p className="text-lg font-light mt-1 mb-3 text-center md:text-start">
          Browse, choose, and thrive in the best local spots for you, curated
          with real-time insights from other digital nomads
        </p>
        <section className="flex flex-col items-center justify-center md:justify-start w-full md:w-64">
          <SimpleButton action={() => {}} text="Find your place" full />
          <span className="font-light text-sm my-1">Or</span>
          <a href="#" className="font-light text-md">
            Discover more about Coffi
          </a>
        </section>
      </section>
    </article>
  );
};
