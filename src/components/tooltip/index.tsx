interface TooltipProps {
    title: string;
    text: string;
}
export const Tooltip: React.FC<TooltipProps> = ({ text, title }) => {
    return (
        <article className="w-full p-3 flex flex-col items-start justify-start border-[1px] border-solid border-coffi-blue rounded-md">
            <h3 className="font-bold text-md">
                {title}
            </h3>
            <hr className="bg-coffi-purple border-coffi-purple w-full my-1" />
            <p className="font-light text-xs">
                { text }
            </p>
        </article>
    )
}