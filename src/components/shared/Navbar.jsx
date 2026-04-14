import React from 'react';
import logoimg from "../../assets/img/logo.png"
import Image from 'next/image';
import Link from 'next/link';
import { IoHomeOutline } from "react-icons/io5";
import { FaHistory } from "react-icons/fa";
import { MdOutlineQueryStats } from "react-icons/md";


const Navbar = () => {

  const links=<>
 <li><Link href="/home"><IoHomeOutline />Dashboard</Link></li>
 <li><Link href="/timeline"><FaHistory />
Timeline</Link></li>
 <li><Link href="/starts"><MdOutlineQueryStats />
Stats</Link></li>

</>

    return (
        <div>
            <div className="navbar bg-base-100 shadow-sm">
  <div className="flex-1">
  <Image src={logoimg} alt="keeplogo" />
  </div>
  <div className="flex-none">
    <ul className="menu menu-horizontal px-1">
      {links}
    </ul>
  </div>
</div>
        </div>
    );
};

export default Navbar;