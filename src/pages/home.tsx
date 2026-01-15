import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
export default function HomePage() {
  const nav = useNavigate();

  return (
    <>
      <div className="mt-10 px-4 sm:px-8 lg:px-60">
        <h1
          className="
          text-3xl
          sm:text-4xl
          lg:text-6xl
          font-bold
          text-center
          text-transparent
          bg-clip-text
          bg-gradient-to-r
          from-[#245e2e]
          via-[#007a76]
          to-[#001522]
        "
        >
          Zambia Green Investment Portal
        </h1>
      </div>

      <div
        className="
        mt-6
        px-4
        sm:px-8
        lg:px-60
        text-base
        sm:text-lg
        lg:text-xl
        text-center
        text-[#4a4a4c]
        leading-relaxed
      "
      >
        A centralized platform for accessing and evaluating investment
        opportunities across Zambia. Connecting investors, project developers,
        and stakeholders with initiatives that promote environmental
        sustainability.
      </div>

      <div
        className="
        mt-12
        px-4
        sm:px-8
        lg:px-60
        flex
        flex-col
        sm:flex-row
        justify-center
        gap-4
      "
      >
        <Button
          onClick={() => nav("/projects")}
          className="
            text-base
            sm:text-lg
            bg-gradient-to-br
            from-[#1ab46f]
            to-[#4e6e54]
            hover:from-[#bed62f]
            hover:to-[#849b3f]
            text-white
            px-6
            py-3
            rounded-2xl
            font-semibold
          "
        >
          Explore Projects
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          onClick={() => nav("/form")}
          className="
            text-base
            sm:text-lg
            border
            border-[#4e6e54]
            bg-transparent
            hover:bg-[#c5e6dc]
            text-[#4e6e54]
            px-6
            py-3
            rounded-2xl
          "
        >
          Submit a Proposal
        </Button>
      </div>
    </>
  );
}
