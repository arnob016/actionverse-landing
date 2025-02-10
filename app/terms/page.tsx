"use client";
import Terms from "@/components/Terms";
import { Spotlight } from "@/components/ui/spotlight";

const TermsPage = () => {
  return (
    <main className="container mx-auto px-4 py-8 pt-24">
      <Spotlight>
        <Terms />
      </Spotlight>
    </main>
  );
};

export default TermsPage;
