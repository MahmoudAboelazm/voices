import {
  LogoutIcon,
  MenuAlt1Icon,
  MoonIcon,
  SunIcon,
  UserCircleIcon,
} from "@heroicons/react/solid";
import React, { memo, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTheme } from "../context/ThemeProvider";
import { userApiMe, userApiSignOut } from "../store/reducers/user/actions";
import { State } from "../store/store";
import Button from "./Button";
import ImageProfile from "./ImageProfile";
import Loading from "./Loading";
import NextLink from "next/link";
import SecondaryButton from "./SecondaryButton";

const NavBar = memo(() => {
  const user = useSelector((state: State) => state.user);
  const [open, setOpen] = useState(false);
  const theme = useTheme();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.me) dispatch(userApiMe());
  }, []);
  return (
    <div className="fixed left-0 top-0 w-full bg-gray-100	shadow-sm	 dark:bg-gray-800	z-40">
      <nav className="w-full py-2 px-4 max-w-screen-xl mx-auto sm:px-16">
        <div className="flex justify-between items-center">
          <button
            onClick={() => setOpen((open) => (open = !open))}
            className="w-9 h-9 hover:bg-slate-200 dark:hover:bg-black rounded-full p-2"
          >
            <MenuAlt1Icon />
          </button>
          <NextLink href="/">
            <h1 className="font-medium cursor-pointer">Voices</h1>
          </NextLink>
          <span className="w-6 h-6 block">
            {user.loading.gettingMe ? (
              <Loading width={6} />
            ) : (
              <ImageProfile
                firstName="my profile image"
                url={user.me?.imageURL || ""}
              />
            )}
          </span>
        </div>
        <ul
          className={`${
            open ? "left-[0rem]" : "left-[-15rem]"
          } absolute top-0 w-60 h-screen bg-slate-200 dark:bg-gray-800  duration-300	z-50 px-4 shadow-md overflow-auto`}
        >
          <li className="flex justify-center py-5 border-b border-b-gray-300 dark:border-b-gray-700 mb-4">
            <div className="h-20 w-20">
              {user.loading.gettingMe ? (
                <Loading width={20} />
              ) : (
                <ImageProfile
                  firstName="my profile image"
                  url={user.me?.imageURL || ""}
                />
              )}
            </div>
          </li>
          <NextLink href={`/profile/${user.me?.id}`}>
            <li className="mb-4">
              <SecondaryButton fullWidth={true} loading={false}>
                <span className="h-5 flex items-center">
                  <UserCircleIcon className="mr-2 h-5" />
                  My Profile
                </span>
              </SecondaryButton>
            </li>
          </NextLink>
          <li className="mb-4">
            <SecondaryButton
              onClick={() => dispatch(userApiSignOut())}
              fullWidth={true}
              loading={user.loading.signing}
            >
              <span className="h-5 flex items-center">
                <LogoutIcon className="mr-2 h-5" />
                Sign out
              </span>
            </SecondaryButton>
          </li>

          <li className="mt-8">
            <Button
              loading={false}
              fullWidth={true}
              onClick={() => theme.toggle()}
            >
              <span className="h-5 block flex justify-center w-full">
                {theme.value === "dark" ? <SunIcon /> : <MoonIcon />}
              </span>
            </Button>
          </li>
        </ul>
        {open && (
          <div
            className="absolute left-0 top-0 w-screen h-screen bg-black opacity-40	"
            onClick={() => setOpen(false)}
          ></div>
        )}
      </nav>
    </div>
  );
});

export default NavBar;
