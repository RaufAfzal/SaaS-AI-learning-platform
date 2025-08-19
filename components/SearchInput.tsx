"use client";

import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "./ui/input";

const searchInput = () => {
  const pathname = usePathname();
  const router = useRouter;

  return (
    <div className="flex items-center  gap-2 rounded-[10px] border border-black py-[10px] px-[18px]">
      <Image src="/icons/search.svg" alt="search icon" width={15} height={15} />
      <input placeholder="search your companions..." className="outline-none" />
    </div>
  );
};

export default searchInput;
