import { QuickActions } from "@/components/quick-actions";
import { UserWelcome } from "@/components/welcome";

export default function UserHome() {
  return (
    <>
      <div className="container mx-auto">
        <UserWelcome />
      </div>
      <div className="container mx-auto max-w-7xl space-y-12 py-10">
        <QuickActions />

        {/* <HelpCard /> */}
      </div>
    </>
  );
}
