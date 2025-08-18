import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

const Cta = () => {
  return (
    <section className="cta-section">
      <div className="cta-badge">Start learning your way</div>
      <h2 className="font-bold text-2xl">
        Build a personalize Learning Companion
      </h2>
      <p>
        Pick a name, subject, voice, & personality — and start learning through
        voice conversations that feel natural and fun.
      </p>
      <Image src="images/cta.svg" alt="cta" width={362} height={232} />
      <button className="btn-primary bg-[#FE5933] rounded-[14px]">
        <Image src="/icons/plus.svg" alt="plus" width={12} height={12} />
        <Link href="/companions/new">Build New Companion</Link>
      </button>
    </section>
  );
};

export default Cta;
