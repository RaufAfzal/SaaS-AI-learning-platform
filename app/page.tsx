import { recentSessions } from "@/constants";
import CompanionCard from "../components/companionCard";
import CompanionList from "../components/CompanionList";
import Cta from "../components/CTA";
import { getSessionHistory, getAllCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";

const Page = async () => {
  const companions = await getAllCompanion({ limit: 8 });
  const recentSessionsCompanions = await getSessionHistory(8);

  return (
    <main>
      <h1 className="flex items-center">Popular Companion</h1>
      <section className="home-section">
        {
          companions.map((companion) => (
            <CompanionCard
              key={companion.id}
              {...companion}
              color={getSubjectColor(companion.subject)}
            />
          ))}

      </section>

      <section className="home-section">
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessionsCompanions}
          classNames="w-2/3 max-lg: w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
