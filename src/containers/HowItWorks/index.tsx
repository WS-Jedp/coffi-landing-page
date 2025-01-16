import { SimpleButton } from "@/components/buttons";

export const HowItWorks: React.FC = () => {
  return (
    <article className="flex flex-col items-center justify-start w-full h-screen text-center px-6 lg:px-0 mx-auto">
        <h1 className="font-bold text-7xl mx-auto">
          The Path to your <br />
          Perfect Spot
        </h1>
        <p className="text-lg font-light mt-2">
          Experience the quick and ease way to locate your ideal spot
        </p>
        <p className="font-light text-md my-1">
          Save time and get back to what matters—your Coffi.
        </p>
    </article>
  );
};
