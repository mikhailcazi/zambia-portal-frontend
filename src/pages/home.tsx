import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";

export default function HomePage() {
  const nav = useNavigate();
  const navToForm = () => {
    nav("/form");
  };
  const navToProjects = () => {
    nav("/projects");
  };
  return (
    <>
      <div className="m-15">
        <h1 className="text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-[#245e2e] via-[#007a76] to-[#001522]">
          Zambia Green Investment Portal
        </h1>
      </div>
      <br></br>
      <div className="text-xl mx-60 text-center text-[#4a4a4c]">
        A centralized platform for accessing and evaluating investment
        opportunities across Zambia. <br /> Connecting investors, project
        developers, and stakeholders with initiatives that promote environmental
        sustainability. <br />
        {/* <br />
        All projects listed on this portal are assessed against national and
        sectoral environmental standards, ensuring transparency, accountability,
        and measurable outcomes. Users can review project details, monitor
        progress, and make informed decisions to support initiatives that align
        with national green finance priorities. <br />
        <br />
        The Zambia Green Investment Portal is part of the government’s effort to
        channel investments towards sustainable development and environmental
        protection. */}
      </div>

      <div className="mx-60 text-center my-20 flex justify-center gap-5">
        <Button
          onClick={navToProjects}
          className="text-xl bg-[#4e6e54] hover:bg-[#849b3f] text-white px-6 py-3 rounded-md font-semibold  cursor-pointer"
        >
          Explore Projects
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>

        <Button
          onClick={navToForm}
          className="border-[#4e6e54] border-1 bg-transparent hover:bg-[#c5e6dc] text-[#4e6e54] px-6 py-3 rounded-md text-xl  cursor-pointer"
        >
          Submit a Proposal
        </Button>
      </div>
    </>
  );
}
