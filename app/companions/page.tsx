import CompanionCard from "../../components/companionCard";
import { getAllCompanion } from "@/lib/actions/companion.actions";
import { getSubjectColor } from "@/lib/utils";
import SearchInput from "../../components/SearchInput";
import SubjectFilter from "../../components/SubjectFilter";

const companionsLibrary = async ({ searchParams }: SearchParams) => {
  const filters = await searchParams;
  const subject = filters?.subject ? filters?.subject : "";
  const topic = filters?.topic ? filters?.topic : "";

  const companions = await getAllCompanion({ subject, topic });

  return (
    <main>
      <section className="flex items-center justify-between gap-4 max-sm:flex-col">
        <h1>Companion library</h1>
        <div className="flex gap-4">
          <SearchInput />
          <SubjectFilter />
        </div>
      </section>
      <section className="companions-grid">
        {companions.map((companion) => (
          <CompanionCard
            key={companion?.id}
            {...companion}
            color={getSubjectColor(companion.subject)}
          />
        ))}
      </section>
    </main>
  );
};

export default companionsLibrary;
