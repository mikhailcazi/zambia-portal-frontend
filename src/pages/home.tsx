import Footer from "@/components/footer";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router";
export default function HomePage() {
  const nav = useNavigate();

  return (
    <>
      <div
        className="h-[65vh] w-full bg-cover bg-center flex items-center justify-center"
        style={{
          backgroundImage: "url('/images/victoria-falls.jpg')",
        }}
      >
        <div className="bg-black/40 w-full h-full flex items-center justify-center">
          <h1
            className="
              text-3xl
              sm:text-4xl
              lg:text-6xl
              font-bold
              text-center
              text-white
              px-4
            "
          >
            Zambia Green Investment Portal
          </h1>
        </div>
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
        my-12
        mb-30
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
          onClick={() => {
            document.getElementById("submit-your-proposal")?.scrollIntoView({
              behavior: "smooth",
            });
          }}
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

      <div
        id="submit-your-proposal"
        className="h-[80vh] w-full bg-cover bg-center flex items-center justify-center bg-fixed"
        style={{
          backgroundImage: "url('/images/giraffes.jpg')",
        }}
      >
        <div className="bg-gradient-to-b from-black/60 via-black/40 to-black/60 w-full h-full flex items-center justify-center">
          <h1
            className="
                text-3xl
                sm:text-4xl
                lg:text-6xl
                font-bold
                text-center
                text-white
                px-4
            "
          >
            Submit your proposal now!
          </h1>
          <div>
            <h2
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                text-white
                px-4
            "
            >
              <span
                className="text-[#c1dd8c] underline cursor-pointer hover:text-[#8eaf51]"
                onClick={() => nav("/user/register")}
              >
                Register
              </span>{" "}
              as a proposer
            </h2>
            <br />
            <h2
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                text-white
                px-4
            "
            >
              Submit your proposal details
            </h2>
            <br />
            <h2
              className="
                text-xl
                sm:text-2xl
                lg:text-3xl
                font-bold
                text-white
                px-4
            "
            >
              Get approved and listed
            </h2>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
