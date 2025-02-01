import { SimpleButtonOutline, SimpleLightButton } from "@/components/buttons"

interface SubscriptionSimpleCardProps {
    full?: boolean
    title: string
    description: string
    price: string
    secondaryPriceText: string
    actionButton: string
    specialAction?: boolean
    onAction?: () => void
}


export const SubscriptionSimpleCard: React.FC<SubscriptionSimpleCardProps> = ({
    full = false,
    title,
    description,
    price,
    secondaryPriceText,
    actionButton,
    specialAction = false,
    onAction
}) => {

    return (
        <article className={`
            relative flex flex-col items-tart justify-center
            ${full ? 'w-full' : 'w-full max-w-[270px]'}
            rounded-lg p-5
            border-[1px] border-solid border-coffi-blue
        `}>

        <h2 className="font-extrabold text-3xl md:text-4xl">
            {title}
        </h2>
        <p className="text-md font-light mb-1">
            {description}
        </p>

        <strong className="font-bold text-xl md:text-2xl">
            {price}
        </strong>
        <p className="font-light text-xs mb-3">
            { secondaryPriceText }
        </p>

        {
            specialAction ? (
                <SimpleLightButton 
                    action={onAction ? onAction : () => {}}
                    text={actionButton}
                    full
                />
            ) : (
                <SimpleButtonOutline 
                    action={onAction ? onAction : () => {}}
                    text={actionButton}
                    full
                />
            )
        }
        </article>
    )
}