import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Building2,
  Calendar,
  Mail,
  MapPin,
  ShieldCheck,
  User,
  Briefcase,
} from "lucide-react";
import { Role, useAuth } from "@/context/auth-context";
import { api } from "@/services/api.service";
import { useEffect, useState } from "react";

type UserProfile = {
  id: number;
  email: string;
  role: Role;
  createdAt: string; // ISO date string
  lastLoginAt: string | null;
  isVerified: boolean;
  projectOwner: {
    name: string;
    organization: string;
    location: string | null;
    position: string | null;
  } | null;
};

export default function UserProfile() {
  const { user: userInfo } = useAuth();
  const [user, setUser] = useState<UserProfile>();

  useEffect(() => {
    if (userInfo) {
      api
        .getUser(userInfo.id)
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [userInfo]);

  return (
    user && (
      <div className="max-w-5xl mx-auto space-y-6 mt-10">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Organization Profile
          </h1>

          <p className="text-muted-foreground mt-2">
            View your account and organization information.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Account */}
          <Card>
            <CardHeader className="items-center text-center">
              <Avatar className="h-20 w-20">
                <AvatarFallback className="text-2xl">
                  {user.projectOwner!.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <CardTitle>{user.projectOwner!.name}</CardTitle>

              <CardDescription>{user.email}</CardDescription>

              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {user.isVerified && (
                  <Badge
                    variant="secondary"
                    className="flex items-center gap-1"
                  >
                    <ShieldCheck className="h-3.5 w-3.5" />
                    Verified
                  </Badge>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-4 text-sm">
              <InfoRow
                icon={<Mail className="h-4 w-4" />}
                label="Email"
                value={user.email}
              />
            </CardContent>
          </Card>

          {/* Organization */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle>Organization Information</CardTitle>

              <CardDescription>
                Your organization details associated with this account.
              </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-6 md:grid-cols-2">
              <InfoRow
                icon={<User className="h-4 w-4" />}
                label="Representative"
                value={user.projectOwner!.name}
              />

              <InfoRow
                icon={<Building2 className="h-4 w-4" />}
                label="Organization"
                value={user.projectOwner!.organization}
              />

              <InfoRow
                icon={<Briefcase className="h-4 w-4" />}
                label="Position"
                value={user.projectOwner!.position || "-"}
              />

              <InfoRow
                icon={<MapPin className="h-4 w-4" />}
                label="Location"
                value={user.projectOwner!.location || "-"}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    )
  );
}

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground">{icon}</div>

      <div>
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}
