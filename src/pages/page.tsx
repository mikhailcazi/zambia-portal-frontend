import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router";

export default function HomePage() {
  const nav = useNavigate();
  const navToForm = () => {
    nav("/form");
  };
  return (
    <>
      <h1 className="text-3xl font-bold">
        Welcome to the Zambia Green Investment Portal!
      </h1>
      <br></br>
      <Card>
        <CardContent>
          This portal provides a centralized platform for accessing and
          evaluating projects eligible for green financing. It connects
          investors, project developers, and stakeholders with initiatives that
          promote environmental sustainability, including reduced emissions,
          ecosystem restoration, and responsible resource use. <br />
          <br />
          All projects listed on this portal are assessed against national and
          sectoral environmental standards, ensuring transparency,
          accountability, and measurable outcomes. Users can review project
          details, monitor progress, and make informed decisions to support
          initiatives that align with national green finance priorities. <br />
          <br />
          The Zambia Green Investment Portal is part of the government’s effort
          to channel investments towards sustainable development and
          environmental protection.
        </CardContent>
      </Card>

      <Card>
        <CardContent>
          <Button onClick={navToForm}>Submit your proposals here!</Button>
        </CardContent>
      </Card>
    </>
  );
}
