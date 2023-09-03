"use client";
import { useSession, signIn, signOut, getSession } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../app/api/auth/[...nextauth]/options";
import Image from "next/image";
import LogoNome from "../../assets/logonome.png";
import Link from "next/link";
import Profile from "../profile";
import MobileNav from "./mobile";
import SiginButton from "../auth/button";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { classNames } from "../../util/classNames";

export type ProfilePROPSType = {
  name: string;
  email: string;
  imageUrl: string;
};

export type ProfileNavigationType = {
  id: string;
  name: string;
  href: string;
};
export type NavegationMenuType = {
  name: string;
  href: string;
  current: boolean;
};
export default function NavBar() {
  const { data: session } = useSession();
  let navigationMenu = [
    { name: "HOME", href: "/", current: false },
    { name: "CONTATO", href: "/contato", current: false }
  ];

  const profileNull = {
    name: "user",
    email: "email@exemplo.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };

  const profileNavigationMenu = [
    {
      id: session ? `${session?.user.name}` : "profile",
      name: "Profile",
      href: "/"
    },
    {
      id: "settings",
      name: "Settings",
      href: "/contato"
    }
  ];
  const [profile, setProfile] = useState<ProfilePROPSType>(profileNull);
  const [profileNavigation, setProfileNavigation] = useState<
    ProfileNavigationType[]
  >(profileNavigationMenu);
  const [navigation, setNavigation] =
    useState<NavegationMenuType[]>(navigationMenu);
  useEffect(() => {
    getSessions().then((s) => {
      if (s?.user.name && s?.user.email && s?.user.image) {
        setProfile({
          name: s?.user.name,
          email: s?.user.email,
          imageUrl: s?.user.image
        });
      }
    });
  }, []);
  return (
    <Disclosure as="nav" className="bg-white w-full">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <Link href={"/"}>
                    <Image
                      className=""
                      src={LogoNome}
                      alt="POWERCOM NETWORK"
                      width={128}
                      height={128}
                    />
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:flex justify-center items-center">
                  <div className="flex space-x-4 ">
                    {navigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-950 hover:bg-gray-700 hover:text-white",
                          "rounded-md px-3 py-2 text-sm font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={() => HandleToggle(item)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon className="h-6 w-6" aria-hidden="true" />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image
                        className="rounded-full"
                        src={profile.imageUrl}
                        alt={profile.name}
                        width={32}
                        height={32}
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Your Profile
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <Link
                            href="#"
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            Settings
                          </Link>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <div
                            className={classNames(
                              active ? "bg-gray-100" : "",
                              "block px-4 py-2 text-sm text-gray-700"
                            )}
                          >
                            {session ? (
                              <button onClick={() => signOut()}>SAIR</button>
                            ) : (
                              <button onClick={() => signIn()}>ENTRA</button>
                            )}
                          </div>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <Link key={item.name} href={item.href}>
                  <Disclosure.Button
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-300 hover:bg-gray-700 hover:text-white",
                      "block rounded-md px-3 py-2 text-base font-medium"
                    )}
                    aria-current={item.current ? "page" : undefined}
                    onClick={() => HandleToggle(item)}
                  >
                    {item.name}
                  </Disclosure.Button>
                </Link>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
    // <Disclosure as="nav" className="bg-gray-200 w-full h-20 flex  ">
    //   {({ open }) => (
    //     <>
    //       <div className="flex items-center justify-center">
    //         <Link className="mx-5 " href={"/"}>
    //           <Image
    //             priority={true}
    //             src={LogoNome}
    //             height={100}
    //             alt="POWERCOM NETWORK"
    //           />
    //         </Link>
    //       </div>

    //       <Menu
    //         navigation={navigation as NavegationMenuType[]}
    //         setNavigation={
    //           setNavigation as Dispatch<SetStateAction<NavegationMenuType[]>>
    //         }
    //         handleToggle={HandleToggle}
    //       />

    //       <Profile
    //         profile={profile as ProfilePROPSType}
    //         setProfile={
    //           setProfile as Dispatch<SetStateAction<ProfilePROPSType>>
    //         }
    //         profileNavigation={profileNavigation as ProfileNavigationType[]}
    //         setProfileNavigation={
    //           setProfileNavigation as Dispatch<
    //             SetStateAction<ProfileNavigationType[]>
    //           >
    //         }
    //         handleToggle={HandleToggle}
    //       />

    //       <MobileNav
    //         profile={profile as ProfilePROPSType}
    //         setProfile={
    //           setProfile as Dispatch<SetStateAction<ProfilePROPSType>>
    //         }
    //         profileNavigation={profileNavigation as ProfileNavigationType[]}
    //         setProfileNavigation={
    //           setProfileNavigation as Dispatch<
    //             SetStateAction<ProfileNavigationType[]>
    //           >
    //         }
    //         navigation={navigation as NavegationMenuType[]}
    //         setNavigation={
    //           setNavigation as Dispatch<SetStateAction<NavegationMenuType[]>>
    //         }
    //         open={open}
    //       />
    //     </>
    //   )}
    // </Disclosure>
  );
  function HandleToggle(item: NavegationMenuType) {
    const indexTrue = navigation.findIndex((e) => e.current == true);
    if (indexTrue >= 0)
      navigation[indexTrue].current = !navigation[indexTrue].current;
    const index = navigation.findIndex((e) => e.name == item.name);
    if (index >= 0) navigation[index].current = !navigation[index].current;
    setNavigation([...navigation]);
  }
}

async function getSessions() {
  const session = await getSession();
  return session;
}
