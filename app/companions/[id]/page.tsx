import { currentUser } from "@clerk/nextjs/server";
import { getCompanionById } from "../../../lib/actions/companion.actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { getSubjectColor } from "@/lib/utils";
import Companion from "../../../components/companion";

interface CompanionSessionProps {
  params: Promise<{ id: string }>;
}

const companionSession = async ({ params }: CompanionSessionProps) => {
  const { id } = await params;
  const companion = await getCompanionById(id);
  const user = await currentUser();

  const { name, subject, topic, duration } = companion;

  // console.log("What is comming in companion", { ...companion });

  if (!user) {
    redirect("/sign-in");
  }

  if (!companion) {
    redirect("/companions");
  }
  return (
    <main>
      <article className="flex rounded-border justify-between p-6 max-md:flex-col">
        <div className="flex items-center gap-2">
          <div
            className="flex w-[72px] h-[72px] rounded-[10px] opacity-100 items-center justify-center max-md:hidden"
            style={{ backgroundColor: getSubjectColor(subject) }}
          >
            <Image
              src={`/icons/${subject}.svg`}
              alt="companion icon"
              width={50}
              height={50}
            ></Image>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <p className="font-bold text-2xl">{name}</p>
              <p className="subject-badge max-sm:hidden">
                {companion?.subject}
              </p>
            </div>
            <p className="text-lg">{topic}</p>
          </div>
        </div>

        <div className="items-start text-2xl max-md:hidden">
          {duration} minutes
        </div>
      </article>
      <Companion
        {...companion}
        companionId={id}
        userName={user?.firstName || "User"}
        userImage={user?.imageUrl || ""}
      />
    </main>
  );
};

export default companionSession;
