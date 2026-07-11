import { UserRound, FolderKanban, FilePlus2, BookOpen } from "lucide-react";
import { QuickActionCard } from "./action-card";

export function QuickActions() {
  return (
    <section>
      <h2 className="mb-6 text-2xl font-semibold">Quick Actions</h2>

      <div className="grid gap-6 md:grid-cols-2">
        <QuickActionCard
          title="Organization Profile"
          description="View and update your account and organisation details."
          href="/user/profile"
          icon={<UserRound className="h-6 w-6" />}
        />

        <QuickActionCard
          title="My Proposals"
          description="View submitted proposals and track their review status."
          href="/my-proposals"
          icon={<FolderKanban className="h-6 w-6" />}
        />

        <QuickActionCard
          title="Submit Proposal"
          description="Start a new Green Investment proposal."
          href="/form"
          icon={<FilePlus2 className="h-6 w-6" />}
        />

        <QuickActionCard
          title="Submission Guidelines"
          description="Review eligibility criteria and required documentation."
          href="#"
          icon={<BookOpen className="h-6 w-6" />}
        />
      </div>
    </section>
  );
}
