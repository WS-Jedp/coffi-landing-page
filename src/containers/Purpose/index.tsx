import {  SimpleLightButton } from "@/components/buttons";

export const Purpose: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-center w-full h-[90vh] text-center mx-auto px-6 xl:px-0">
      <h1 className="font-bold text-4xl md:text-7xl mx-auto mb-9">
        Empowering Digital Nomads, <br />
        One at a Time
      </h1>
      <p className="text-xl font-light mt-2 w-full md:w-8/12 mb-9">
        We’re more than a platform—it’s a mission. Our goal is to make the
        nomadic lifestyle easier, better, and more connected. Whether it’s
        finding the perfect spot, building a community, or inspiring others to
        thrive on the road, Coffi is here to support every step of your journey.
      </p>
      <div className="w-full md:w-3/12">
        <SimpleLightButton 
            action={() => {}}
            text="Discover the Story Behind Coffi"
            full
        />
      </div>
    </article>
  );
};
