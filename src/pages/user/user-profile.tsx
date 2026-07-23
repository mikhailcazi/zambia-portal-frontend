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
  Mail,
  MapPin,
  ShieldCheck,
  User,
  Briefcase,
  Pencil,
} from "lucide-react";
import { Role, useAuth } from "@/context/auth-context";
import { api } from "@/services/api.service";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type UserProfile = {
  id?: number;
  email?: string;
  role?: Role;
  createdAt?: string; // ISO date string
  lastLoginAt?: string | null;
  isVerified?: boolean;
  projectOwner?: {
    name: string;
    organization: string;
    location: string | null;
    position: string | null;
  } | null;
};

export type UpdateProfileFormData = {
  name?: string;
  organization?: string;
  position?: string;
  location?: string;
};

export default function UserProfile() {
  const { user: userInfo } = useAuth();
  const [user, setUser] = useState<UserProfile>();
  const [open, setOpen] = useState(false);

  const [formData, setFormData] = useState<UpdateProfileFormData>({});

  useEffect(() => {
    if (user?.projectOwner) {
      setFormData({
        name: user.projectOwner.name,
        organization: user.projectOwner.organization,
        position: user.projectOwner.position ?? "",
        location: user.projectOwner.location ?? "",
      });
    }
  }, [user]);

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

  const handleSave = async () => {
    try {
      const res = await api.updateProfile(formData);

      setUser({ ...user, projectOwner: res.data });

      setOpen(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    user && (
      <>
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
              <CardHeader className="text-center">
                <div className="flex justify-center">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="text-2xl bg-primary text-primary-foreground">
                      {user.projectOwner!.name.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <CardTitle>{user.projectOwner!.name}</CardTitle>

                <CardDescription>{user.email}</CardDescription>

                {user.isVerified && (
                  <div className="flex justify-center pt-2">
                    <Badge
                      variant="secondary"
                      className="flex items-center gap-1"
                    >
                      <ShieldCheck className="h-3.5 w-3.5" />
                      Verified
                    </Badge>
                  </div>
                )}
              </CardHeader>

              <CardContent className="space-y-4 text-sm">
                <InfoRow
                  icon={<Mail className="h-4 w-4" />}
                  label="Email"
                  value={user.email || ""}
                />
              </CardContent>
            </Card>

            {/* Organization */}
            <Card className="md:col-span-2 overflow-hidden pt-0">
              <div className="h-50 w-full overflow-hidden">
                <img
                  src="/images/henning-borgersen-4Uxu8wnjYOY-unsplash.jpg"
                  alt="Organization header"
                  className="h-full w-full object-cover"
                />
              </div>

              <CardHeader className="flex flex-row items-start justify-between">
                <div>
                  <CardTitle>Organization Information</CardTitle>

                  <CardDescription>
                    Your organization details associated with this account.
                  </CardDescription>
                </div>

                <Button size="sm" variant="ghost" onClick={() => setOpen(true)}>
                  <Pencil className="h-4 w-4" />
                </Button>
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
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Profile</DialogTitle>
            </DialogHeader>

            <div className="space-y-4">
              <div>
                <Label>Name</Label>
                <Input
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div>
                <Label>Organization</Label>
                <Input
                  value={formData.organization}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      organization: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Position</Label>
                <Input
                  value={formData.position}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      position: e.target.value,
                    })
                  }
                />
              </div>

              <div>
                <Label>Location</Label>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: e.target.value,
                    })
                  }
                />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>

              <Button onClick={handleSave}>Save Changes</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </>
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
