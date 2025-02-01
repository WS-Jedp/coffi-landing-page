import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  return (
    <article className="relative flex flex-col items-start justify-items-start w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h2 className="font-bold text-4xl md:text-7xl mb-6 w-full md:w-3/4 ">
        Your Partner in Thriving as a Digital Nomad
      </h2>
      <section className="relative w-full h-auto grid grid-cols-4 grid-rows-2 gap-4 md:gap-4">
        {/* Section One */}
        <article className="flex flex-col md:flex-row items-start justify-start text-start col-span-4 bg-gradient-to-r from-coffi-purple to-coffi-blue text-coffi-white rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/70">
          <section className="flex flex-col items-start justify-start w-full">
            <Image
              alt="Eye icon"
              src="/assets/icons/eye-icon.svg"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              Why we do it?
            </h2>

            <p className="font-light text-lg mb-2">
              At Coffi, we believe that finding the perfect place to work,
              study, or relax should be effortless. That’s why we’ve created a
              platform where digital nomads like you can discover the best spots
              in any city, connect with like-minded individuals, and contribute
              to a global network of explorers.
            </p>
            <p className="font-light text-lg">
              From real-time insights powered by the community to features that
              help you earn rewards for your contributions, Coffi is here to
              make your nomadic journey easier, more productive, and full of
              meaningful connections.
            </p>
          </section>
        </article>
        {/* Section Two */}
        <article className="flex flex-col items-start justify-start text-start col-span-4 md:col-span-2 h-[300px] bg-gradient-to-tr from-coffi-blue/20 to-coffi-purple/20 text-coffi-purple rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50">
          <Image
            alt="Construction tools icon"
            src="/assets/icons/construction-icon.svg"
            width={30}
            height={30}
            className="mb-3"
          />
          <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
            How we do it?
          </h2>
          <p className="font-light text-lg">
            Behind the scenes, we’re a small but dedicated team—led by a digital
            nomad just like you—who understands the joys and challenges of this
            lifestyle. We’re passionate about building a space that supports and
            celebrates your journey.
          </p>
        </article>

        {/* Section Three */}
        <article className="flex flex-col items-start justify-between text-start col-span-4 md:col-span-2 bg-gradient-to-br from-coffi-blue/5 to-coffi-blue/40 text-coffi-blue rounded-2xl p-6 shadow-lg shadow-coffi-purple-200/50">
          <section>
            <Image
              alt="Coffi logo icon"
              src="/assets/icons/coffi-logo-icon.svg"
              width={30}
              height={30}
              className="mb-3"
            />
            <h2 className="font-extrabold text-3xl md:text-4xl mb-2">
              What we offer?
            </h2>
            <p className="font-light text-lg">
              Discover a platform built by nomads, for nomads. We’re here to
              make your journey effortless, connected, and inspiring.
            </p>
          </section>

          <Link className="font-bold underline flex flex-row flex-nowrap" href="https://coffi.com.co">
            Learn more{" "}
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
