export const Benefits: React.FC = () => {
  return (
    <article className="relative flex flex-col items-end justify-start w-full h-min-screen h-auto text-end px-6 xl:px-0 mx-auto mb-20">
      <h1 className="font-bold text-4xl md:text-7xl mb-6">
        Enhance Your Journey with <br className="hidden md:block" />
        Coffi’s Unique Benefits
      </h1>

      <section className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4">
        {/* Section One */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 h-[360px] bg-coffi-blue/20 text-coffi-purple rounded-md p-6">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">Match Your Favorite Spots</h2>
          <p className="font-light text-lg">
            Whether you seek a quiet corner for deep focus or a lively space to
            spark creativity, access a wide range of quality-assured locations.
            Find environments tailored to enhance both your productivity and
            lifestyle.
          </p>
        </article>

        {/* Section Two */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 bg-coffi-purple/20 text-coffi-purple rounded-md p-6">
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
            Real Connections, Right Where You Are
          </h2>
          <p className="font-light text-lg">
            Coffi helps you connect with like-minded digital nomads in the city
            you're staying in. <br />
            Join a global tribe where you can network, exchange insights, and
            build relationships that enhance both your work and travels.
          </p>
        </article>
        <article className="flex flex-col md:flex-row items-center justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple/30 to-coffi-blue/30 text-coffi-purple rounded-md p-6">
          <section className="flex flex-col items-start justify-start w-full md:w-1/2">
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              Powered by Community, <br /> Designed for You
            </h2>

            <p className="font-light text-lg mb-2">
              Coffi thrives on its vibrant community of digital nomads, making
              real-time insights possible.{" "}
            </p>
            <p className="font-light text-lg mb-2">
              By updating conditions or discovering new spots, you earn Coffi
              Points—redeemable for rewards like coupons.
            </p>
            <p className="font-light text-lg">
              Join Coffi Premium to connect with the community, earn rewards,
              and never miss out on the best places for work or relaxation.
            </p>
          </section>
        </article>
      </section>
    </article>
  );
};
