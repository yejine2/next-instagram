"use client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { PiSignOut } from "react-icons/pi";
import Avatar from "./Avatar";
import {
  HomeFillIcon,
  HomeIcon,
  NewFillIcon,
  NewIcon,
  SearchFillIcon,
  SearchIcon,
} from "./ui/icons";

const menu = [
  { href: "/", icon: <HomeIcon />, clickedIcon: <HomeFillIcon /> },
  { href: "/search", icon: <SearchIcon />, clickedIcon: <SearchFillIcon /> },
  { href: "/new", icon: <NewIcon />, clickedIcon: <NewFillIcon /> },
];

function Navbar() {
  const pathName = usePathname();
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="flex justify-between items-center px-4 md:px-6 py-1">
      <Link href={"/"}>
        <h1 className="text-xl font-bold tracking-tight">Yestagram</h1>
      </Link>
      <nav>
        <ul className="flex items-center gap-3 p-1 md:p-4 md:gap-4">
          {menu.map((item) => (
            <li key={item.href}>
              <Link href={item.href}>
                {pathName === item.href ? item.clickedIcon : item.icon}
              </Link>
            </li>
          ))}

          {user && (
            <li>
              <Link href={`/user/${user.username}`}>
                <Avatar image={user.image} size="small" highlight />
              </Link>
            </li>
          )}

          {session && (
            <li>
              <PiSignOut className="w-5 h-5" onClick={() => signOut()} />
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
