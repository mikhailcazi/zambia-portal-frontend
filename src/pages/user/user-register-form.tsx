import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useNavigate } from "react-router";
import { api } from "../../services/api.service";
import Loading from "@/components/ui/loading";

export function UserRegister({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [organization, setOrganization] = useState("");
  const [location, setLocation] = useState("");
  const [position, setPosition] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [error, setError] = useState(""); // <-- error state
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setError(""); // clear previous errors
    api
      .userRegister(email, password, name, organization, location, position)
      .then((res) => {
        console.log(res.data);
        // Redirect after successful login
        // nav("/admin/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        console.log(err); // <-- set error
      });
  };

  return (
    <div className={cn("my-10 px-4 sm:px-8 lg:px-60", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <form className="p-6 md:p-8" onSubmit={login}>
            <FieldGroup>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Create your account</h1>
                {/* <p className="text-sm text-balance text-muted-foreground">
                  Enter your email below to create your account
                </p> */}
              </div>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {/* <FieldDescription>
                  We&apos;ll use this to contact you. We will not share your
                  email with anyone else.
                </FieldDescription> */}
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Your Name</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FieldDescription></FieldDescription>
              </Field>
              <Field>
                <FieldLabel htmlFor="name">Organization</FieldLabel>
                <Input
                  id="organization"
                  type="text"
                  placeholder="Your organization here..."
                  required
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                />
                <FieldDescription></FieldDescription>
              </Field>
              <div className="grid grid-cols-2 gap-4">
                <Field>
                  <FieldLabel htmlFor="name">Location</FieldLabel>
                  <Input
                    id="location"
                    type="text"
                    placeholder="Your city here..."
                    required
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                  <FieldDescription></FieldDescription>
                </Field>
                <Field>
                  <FieldLabel htmlFor="name">Position</FieldLabel>
                  <Input
                    id="position"
                    type="text"
                    placeholder="Manager"
                    required
                    value={position}
                    onChange={(e) => setPosition(e.target.value)}
                  />
                  <FieldDescription></FieldDescription>
                </Field>
              </div>

              <Field>
                <Field className="grid grid-cols-2 gap-4">
                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <Input
                      id="password"
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <FieldLabel htmlFor="confirm-password">
                      Confirm Password
                    </FieldLabel>
                    <Input
                      id="confirm-password"
                      type="password"
                      required
                      value={passwordConfirm}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                  </Field>
                </Field>
                <FieldDescription>
                  Must be at least 8 characters long.
                </FieldDescription>
              </Field>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              {loading && <Loading className="h-2" />}
              <Field>
                <Button type="submit">Create Account</Button>
              </Field>

              <FieldDescription className="text-center">
                Already have an account? <a href="/user/login">Sign in</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/zambia-farming.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
