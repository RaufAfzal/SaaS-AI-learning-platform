import { recentSessions } from "@/constants";
import CompanionCard from "../components/companionCard";
import CompanionList from "../components/CompanionList";
import Cta from "../components/CTA";

const Page = () => {
  return (
    <main>
      <h1 className="flex items-center">Popular Companion</h1>
      <section className="home-section">
        <CompanionCard
          id="123"
          name="Neura the Binary Explorer "
          topic="Neural network of thr brain"
          subject="science"
          duration={45}
          color="#E5D0FF"
        />
        <CompanionCard
          id="456"
          name="Countsy the Number Wizard "
          topic="Derivatives & Integrals"
          subject="science"
          duration={30}
          color="#FFDA6E"
        />
        <CompanionCard
          id="789"
          name="Verba the Vocabulary Builder "
          topic="language"
          subject="English Literature"
          duration={25}
          color="#BDE7FF"
        />
      </section>

      <section className="home-section">
        <CompanionList
          title="Recently completed sessions"
          companions={recentSessions}
          classNames="w-2/3 max-lg: w-full"
        />
        <Cta />
      </section>
    </main>
  );
};

export default Page;
