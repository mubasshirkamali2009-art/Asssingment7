'use client';
import React from 'react';
import logoimg from "../../assets/img/logo.png";
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { IoHomeOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";

const Navbar = () => {
  const pathname = usePathname();

  const linkClass = (path) =>
    pathname === path
      ? 'text-white font-bold rounded-xl bg-[#244D3F]'
      : 'text-gray-600 hover:text-teal-600 hover:font-bold';

  return (
    <div>
      <div className="navbar bg-base-100 shadow-sm">
        <div className="flex-1">
          <Image src={logoimg} alt="keeplogo"  />
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 gap-5">
            <li>
              <Link href="/home" className={linkClass('/home')}>
                <IoHomeOutline /> Home
              </Link>
            </li>
            <li>
              <Link href="/timeline" className={linkClass('/timeline')}>
                <FaHistory /> Timeline
              </Link>
            </li>
            <li>
              <Link href="/starts" className={linkClass('/starts')}>
                <MdOutlineQueryStats /> Stats
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;