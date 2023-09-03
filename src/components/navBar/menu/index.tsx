"use client";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { classNames } from "../../../util/classNames";
import Link from "next/link";
import { NavegationMenuType } from "..";
type PROPS = {
  navigation: NavegationMenuType[];
  setNavigation: Dispatch<SetStateAction<NavegationMenuType[]>>;
  handleToggle: (item: NavegationMenuType) => void;
};

export default function Menu(props: PROPS) {
  // const [nav, setNav] = useState(props.navigation);
  const { navigation, setNavigation, handleToggle } = props;
  return (
    <div className="hidden md:block w-full">
      <div className="flex items-center justify-center w-full h-full ">
        {navigation.map((item) => (
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
            onClick={() => handleToggle(item)}
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
