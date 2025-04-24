interface SatelliteLoader {
    size?: number
    color?: 'white' | 'blue' | 'gray'
    text?: string
}

export const SatelliteLoader:React.FC<SatelliteLoader> = ({ text }) => {

    return (
        <article className="relative flex flex-col items-center justify-center mx-auto my-auto">
            <div className={`relative p-1 border-2 bg-white border-coffi-purple-200 flex items-center justify-center rounded-full duration-[2000] animate-spin `}>
                <div className={`relative left-0 right-0 bg-coffi-purple bg- w-[18px] h-[18px] rounded-full shadow-sm`}></div>
                <div className={`absolute top-[-5px] bg-coffi-purple w-[6px] h-[6px] rounded-full`}></div>
            </div>
            {
                text && (
                    <span className="font-light text-xs my-1">
                        { text }
                    </span>
                )
            }

        </article>
    )
}