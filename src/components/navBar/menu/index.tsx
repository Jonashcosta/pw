"use client";
import { useEffect, useState } from "react";
import { classNames } from "../../../util/classNames";
import Link from "next/link";

interface PROPS {
  navigation: {
    name: string;
    href: string;
    current: boolean;
  }[];
}

export default function Menu(props: PROPS) {
  const [nav, setNav] = useState(props.navigation);
  return (
    <div className="hidden md:block w-full">
      <div className="flex items-center justify-center w-full h-full ">
        {nav.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className={classNames(
              item.current
                ? "bg-gray-900 text-white"
                : "text-gray-900 hover:bg-gray-700 hover:text-white",
              "rounded-lg px-3 py-2 text-sm font-medium "
            )}
            aria-current={item.current ? "page" : undefined}
            onClick={() => HandleToggle(item)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
  function HandleToggle(item: any) {
    const indexTrue = nav.findIndex((e) => e.current == true);
    if (indexTrue >= 0) nav[indexTrue].current = !nav[indexTrue].current;
    const index = nav.findIndex((e) => e.name == item.name);
    if (index >= 0) nav[index].current = !nav[index].current;
    setNav([...nav]);
  }
}
