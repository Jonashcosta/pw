"use client";
import Link from "next/link";
import LogoNome from "../../../assets/logonome.png";
import Carrinho from "../../../assets/carrinho.svg";
import Sino from "../../../assets/sino.svg";
import Image from "next/image";
import { useEffect, useState } from "react";
import { classNames } from "@/util/classNames";
import { getSession, signIn, signOut, useSession } from "next-auth/react";

export type NavegationMenuType = {
  name: string;
  href: string;
  current: boolean;
};
export type ProfilePROPSType = {
  name: string;
  email: string;
  imageUrl: string;
};

export const profileNull: ProfilePROPSType = {
  name: "user",
  email: "email@exemplo.com",
  imageUrl:
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
};
const navigationMenu: NavegationMenuType[] = [
  { name: "HOME", href: "/", current: false },
  { name: "CONTATO", href: "/contato", current: false }
];
const Nav = () => {
  const { data: session } = useSession();
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
  const active = true;
  const [menuMD768, setmenuMD768] = useState<boolean>();
  const [menuMD400, setmenuMD400] = useState<boolean>();
  const [profile, setProfile] = useState<ProfilePROPSType>(profileNull);
  const [navigation, setNavigation] =
    useState<NavegationMenuType[]>(navigationMenu);
  return (
    <nav className="bg-white w-full m-0 sticky">
      <div className="flex justify-between items-center mx-5 ">
        <Link href={"/"}>
          <Image
            className=""
            src={LogoNome}
            alt="POWERCOM NETWORK"
            width={250}
          />
        </Link>

        <div className="flex  w-full  max-md:hidden justify-center items-center ">
          <div className="flex space-x-4 ">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={classNames(
                  item.current
                    ? "bg-gray-900 text-white"
                    : "text-gray-950 hover:bg-gray-700 hover:text-white",
                  "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                )}
                onClick={() => HandleToggle(item)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
        <div className="flex w-full ml-4 md:hidden items-center">
          <button
            className="flex flex-col space-y-1"
            onClick={() => setmenuMD400(!menuMD400)}
          >
            <div className="bg-black w-8 h-1"></div>
            <div className="bg-black w-8 h-1"></div>
            <div className="bg-black w-8 h-1"></div>
          </button>
          {menuMD400 ? (
            <div
              className="fixed -inset-1.5"
              onClick={() => {
                setmenuMD400(!menuMD400);
              }}
            >
              <div className="absolute top-14 left-0 flex flex-col space-y-1 w-full ">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      item.current
                        ? "bg-gray-900 text-white"
                        : "text-gray-950 hover:bg-gray-700 hover:text-white",
                      "rounded-md px-3 py-2 text-sm font-medium cursor-pointer"
                    )}
                    onClick={() => HandleToggle(item)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="flex  space-x-2 justify-center items-cente">
          <button className=" w-8  ">
            <Image
              className=""
              src={Sino}
              alt={"notificacoes"}
              width={32}
              height={32}
            />
          </button>
          <button className="w-8 ">
            <Image
              className=""
              src={Carrinho}
              alt={"Carrinho"}
              width={32}
              height={32}
            />
          </button>
          <div className="relative">
            <button
              className="flex w-8  "
              onClick={() => {
                setmenuMD768(!menuMD768);
              }}
            >
              <Image
                className="rounded-full"
                src={profile.imageUrl}
                alt={profile.name}
                width={32}
                height={32}
              />
            </button>
            {menuMD768 ? (
              <>
                <div
                  className="fixed -inset-1.5"
                  onClick={() => {
                    setmenuMD768(!menuMD768);
                  }}
                />
                <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <Link
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    href={"dashboard/profile"}
                    onClick={() => {
                      setmenuMD768(false);
                    }}
                  >
                    Your Profile
                  </Link>
                  <Link
                    className={classNames(
                      active ? "bg-gray-100" : "",
                      "block px-4 py-2 text-sm text-gray-700",
                      "rounded-md px-3 py-2 text-sm font-medium"
                    )}
                    href={"/"}
                    onClick={() => {
                      setmenuMD768(false);
                    }}
                  >
                    Settings
                  </Link>

                  {session ? (
                    <button
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700",
                        "rounded-md px-3 py-2 text-sm font-medium"
                      )}
                      onClick={() => {
                        setmenuMD768(false);
                        signOut();
                      }}
                    >
                      SAIR
                    </button>
                  ) : (
                    <button
                      className={classNames(
                        active ? "bg-gray-100" : "",
                        "block px-4 py-2 text-sm text-gray-700"
                      )}
                      onClick={() => {
                        setmenuMD768(false);
                        signIn();
                      }}
                    >
                      ENTRA
                    </button>
                  )}
                </div>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </nav>
  );
  function HandleToggle(item: NavegationMenuType) {
    const indexTrue = navigation.findIndex((e) => e.current == true);
    if (indexTrue >= 0)
      navigation[indexTrue].current = !navigation[indexTrue].current;
    const index = navigation.findIndex((e) => e.name == item.name);
    if (index >= 0) navigation[index].current = !navigation[index].current;
    setNavigation([...navigation]);
  }
};
async function getSessions() {
  const session = await getSession();
  return session;
}

export default Nav;
