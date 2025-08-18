import Link from "next/link";
import Image from "next/image";
import NavItems from "./NavItems";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link href="/" className="navbar-brand">
        <div className="flex items-center gap-2.5 cursor-pointer">
          <Image
            src="images/logo.svg"
            alt="Converso Logo"
            width={46}
            height={44}
            className="rounded-full"
          />
        </div>
      </Link>
      <NavItems />
    </nav>
  );
};

export default Navbar;
