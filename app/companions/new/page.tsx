import { redirect } from "next/navigation";
import CompanionForm from "../../../components/companionForm";
import { auth } from "@clerk/nextjs/server";

const NewCompanion = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }
  return (
    <main className="items-center justify-center ">
      <article className="font-bold text-[30px]">Companion Builder</article>
      <CompanionForm />
    </main>
  );
};

export default NewCompanion;
