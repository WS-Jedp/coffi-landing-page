interface TogglePanelProps {
  title: string;
  description: string;
  children: React.ReactNode;
  isOpen?: boolean;
  tag?: string;
  specialTag?: boolean;
}

export const TooglePanel: React.FC<TogglePanelProps> = ({
  title,
  description,
  children,
  isOpen = false,
  tag = null,
  specialTag,
}) => {
  return (
    <article className="relative flex flex-col items-start justify-start text-start border-b-[1px] border-coffi-black/30 pb-3 w-full max-w-[420px] overflow-hidden transition-all duration-300 ease-in-out">
      <section className="flex flex-col items-start justify-start w-full">
        <section className="w-full flex flex-row justify-between">
          <h3 className="font-bold text-xl md:text-2xl">{title}</h3>
          {tag ? specialTag ? (
            <span className="flex items-center justify-center text-center h-[27px] px-3 md:px-4 bg-gradient-to-r from-coffi-blue/20 to-coffi-purple/20 text-coffi-purple text-[12px] md:text-xs rounded-full text-nowrap">
              { tag }
            </span>
          ) : (
            <span className="flex items-center justify-center text-center h-[27px] px-3 md:px-4 bg-coffi-black/5 text-coffi-black font-normal text-[12px] md:text-xs rounded-full text-nowrap">
              { tag }
            </span>
          ) : null}
        </section>
        <p className="text-md font-light mb-2">{description}</p>
      </section>
      <section
        className={`w-full overflow-visible transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div
          className={`relative w-full overflow-visible transition-transform transform duration-500 ${
            isOpen ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"
          }`}
        >
          {children}
        </div>
      </section>
    </article>
  );
};
