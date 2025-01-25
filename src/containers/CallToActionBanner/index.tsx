import { SimpleDarkButton } from "@/components/buttons"

export const CallToActionBanner: React.FC = () => {

    return (
        <article className="w-full h-auto bg-coffi-blue/30 py-9 my-9 text-coffi-purple px-6 xl:px-0">
            <section className="w-full max-w-[1200px] mx-auto flex flex-row">

                <article className="relative flex flex-col items-start justify-center w-full md:w-5/12">
                    <h3 className="text-2xl md:text-4xl font-extrabold">
                    Your Next Favorite Spot is Waiting
                    </h3>
                    <p className="font-light text-lg mt-1 mb-3">
                    Dive into Coffi and uncover the best spots in your city, perfectly matched to your lifestyle. Don’t wait—start now!
                    </p>
                    <SimpleDarkButton 
                        text="Start Discovering"
                        action={() => {}}
                    />
                </article>

            </section>
        </article>
    )
}