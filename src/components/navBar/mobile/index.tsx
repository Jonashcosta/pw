"use client";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../../util/classNames";
import Image from "next/image";
import Link from "next/link";
interface PROPS {
  profile: {
    name: string;
    email: string;
    imageUrl: string;
  };
  profileNavigation: {
    name: string;
    href: string;
  }[];
  navigation: {
    name: string;
    href: string;
    current: boolean;
  }[];
  open: boolean;
}
export default function MobileNav(props: PROPS) {
  const { navigation, profileNavigation, profile, open } = props;
  return (
    <>
      <div className="md:hidden w-full h-full ">
        <div className="flex w-full h-full items-center justify-end  ">
          <Disclosure.Button className="w-12  inline-flex  rounded-lg bg-gray-800 p-2 mr-5 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800 ">
            {open ? (
              <XMarkIcon className="h-8 w-8 " />
            ) : (
              <Bars3Icon className="h-8 w-8 " />
            )}
          </Disclosure.Button>

          <Disclosure.Panel className="md:hidden relative">
            <div className="absolute right-10 z-10 mt-10 w-auto rounded-lg">
              {navigation.map((item) => (
                <Link
                  key={`mobile_${item.name}`}
                  href={item.href}
                  className={classNames(
                    item.current
                      ? "bg-gray-900 text-white"
                      : "text-gray-900 hover:bg-gray-700 hover:text-white",
                    "block rounded-md px-3 py-2 text-base font-medium"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t border-gray-700 pb-3 pt-4">
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <Image
                      className="rounded-full"
                      src={profile.imageUrl}
                      width={40}
                      height={40}
                      alt={profile.name}
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium leading-none text-gray-900">
                      {profile.name}
                    </div>
                    <div className="text-sm font-medium leading-none text-gray-900">
                      {profile.email}
                    </div>
                  </div>
                </div>
                <div className="mt-3 space-y-1 px-2">
                  {profileNavigation.map((item) => (
                    <Link
                      key={`mobile_${item.name}`}
                      href={item.href}
                      className="block rounded-md px-3 py-2 text-base font-medium text-gray-900 hover:bg-gray-700 hover:text-white"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </Disclosure.Panel>
        </div>
      </div>
    </>
  );
}
