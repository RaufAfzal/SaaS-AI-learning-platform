"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { useEffect, useState } from "react";
import { subjects } from "@/constants";
import { removeKeysFromUrlQuery } from "@jsmastery/utils";
import { formUrlQuery } from "@jsmastery/utils";

const SubjectFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const query = searchParams.get("subject") || "";
  const [subject, setSubject] = useState("");

  useEffect(() => {
    if (subject === "all") {
      const newUrl = removeKeysFromUrlQuery({
        params: searchParams.toString(),
        keysToRemove: ["subject"],
      });

      router.push(newUrl, { scroll: false });
    } else if (subject) {
      const newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "subject",
        value: subject,
      });

      router.push(newUrl, { scroll: false });
    }
  }, [subject, router, searchParams]);

  return (
    <div>
      <Select value={subject} onValueChange={setSubject}>
        <SelectTrigger className="flex items-center  gap-2 rounded-[10px] border border-black py-[10px] px-[18px]">
          <SelectValue placeholder="Subject" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {subjects.map((subject) => (
            <SelectItem key={subject} value={subject}>
              {subject}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
export default SubjectFilter;
