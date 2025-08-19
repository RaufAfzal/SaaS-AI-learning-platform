"use client";

import { usePathname, useRouter } from "next/navigation";

const subjectFilter = () => {
  const pathname = usePathname();
  const router = useRouter;

  return <div>"subjectFilter</div>;
};

export default subjectFilter;
