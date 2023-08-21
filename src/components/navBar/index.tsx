"use client";
import Menu from "./menu";
import Image from "next/image";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import LogoNome from "../../assets/logonome.png";
import Link from "next/link";
import Profile from "../profile";
import MobileNav from "./mobile";
import { Disclosure } from "@headlessui/react";
export default function NavBar() {
  let navigation = [
    { name: "HOME", href: "/", current: false },
    { name: "CONTATO", href: "/contato", current: false }
  ];
  const profile = {
    name: "Tom Cook",
    email: "tom@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
  };
  const ProfileNavigation = [
    { name: "Profile", href: "/" },
    { name: "Settings", href: "/contato" },
    { name: "Sign out", href: "#" }
  ];
  return (
    <Disclosure as="nav" className="bg-gray-200 w-full h-20 flex  ">
      {({ open }) => (
        <>
          <div className="flex items-center justify-center">
            <Link className="mx-5 " href={"/"}>
              <Image
                priority={true}
                src={LogoNome}
                height={100}
                alt="POWERCOM NETWORK"
              />
            </Link>
          </div>

          <Menu navigation={navigation} />

          <Profile profile={profile} profileNavigation={ProfileNavigation} />
          <MobileNav
            profile={profile}
            profileNavigation={ProfileNavigation}
            navigation={navigation}
            open={open}
          />
        </>
      )}
    </Disclosure>
  );
}
