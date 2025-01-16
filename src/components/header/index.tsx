import Image from "next/image";

export const Header: React.FC = () => {
  const menuOptions = [
    {
      name: "About",
      link: "#about",
    },
    {
      name: "Features",
      link: "#features",
    },
    {
      name: "Pricing",
      link: "#pricing",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];
  return (
    <header className="sticky top-0 left-0 w-full h-20 drop-shadow-md bg-white flex flex-row flex-nowrap items-center justify-between px-6 z-[999]">
      <div className="w-full max-w-[1200px] h-full flex items-center justify-between mx-auto">
        <article className="flex flex-row flex-nowrap items-center cursor-pointer text-coffi-black">
          <Image
            src="/assets/images/coffi-logo.svg"
            alt="logo"
            width={45}
            height={45}
            className="mr-1"
          />
          <div className="flex flex-col items-start jusitfy-center h-full border-solid border-black">
            <h1 className="block font-black text-2xl cursor-pointer my-0 py-0">
              Coffi
            </h1>
            <h2 className="font-light text-sm my-0 py-0 pl-[1px] mt-[-3px]">
              Be where you thrive
            </h2>
          </div>
        </article>

        <menu className="flex items-center text-coffi-black">
          <ul className="flex flex-row flex-nowrap items-center gap-4">
            {menuOptions.map((option) => (
              <li
                key={option.name}
                className="font-normal text-sm cursor-pointer hover:text-coffi-purple"
              >
                <a href={option.link}>{option.name}</a>
              </li>
            ))}
          </ul>
        </menu>
      </div>
    </header>
  );
};
