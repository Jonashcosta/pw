"use client";
import Image from "next/image";
import Link from "next/link";
import { Dispatch, SetStateAction, useEffect, useState } from "react";

import { classNames } from "../../util/classNames";
import { Menu } from "@headlessui/react";
import { useSession, signIn, signOut } from "next-auth/react";

import SiginButton from "../auth/button";
import { ProfilePROPSType, ProfileNavigationType } from "../navBar";

type PROPS = {
  profile: ProfilePROPSType;
  setProfile: Dispatch<SetStateAction<ProfilePROPSType>>;

  profileNavigation: ProfileNavigationType[];
  setProfileNavigation: Dispatch<SetStateAction<ProfileNavigationType[]>>;
};
export default function Profile(props: PROPS) {
  const { profile, setProfile, profileNavigation, setProfileNavigation } =
    props;
  return (
    <>
      <div className="hidden md:block w-1/4 ">
        <div className=" ml-4 flex items-center md:ml-6 w-full h-full  justify-center">
          <Menu as="div" className="relative ml-3">
            <div>
              <Menu.Button className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                <Image
                  className="rounded-full"
                  src={profile?.imageUrl as string}
                  alt={profile?.name as string}
                  width={48}
                  height={48}
                />
              </Menu.Button>
            </div>

            <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              {profileNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      href={item.href}
                      className={classNames(
                        active ? "bg-red-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
              <Menu.Item key={"asda"} as={"div"}>
                {({ active }) => (
                  <div
                    className={classNames(
                      active ? "bg-red-100" : "",
                      " px-4 py-2 text-sm text-gray-700"
                    )}
                  >
                    <SiginButton />
                  </div>
                )}
              </Menu.Item>
            </Menu.Items>
          </Menu>
        </div>
      </div>
    </>
  );
}
