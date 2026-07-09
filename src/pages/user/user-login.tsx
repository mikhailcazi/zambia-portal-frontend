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
import Loading from "../../components/ui/loading";
import { useAuth } from "@/context/auth-context";

export function UserLoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- error state
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const { authLogin } = useAuth();

  const login = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setError(""); // clear previous errors
    api
      .userLogin(email, password)
      .then((res) => {
        console.log(res.data);

        authLogin(res.data.access_token, res.data.user);

        // Redirect after successful login
        if (res.data.user?.role === "ADMIN") {
          nav("/admin/dashboard");
        } else {
          nav("/user/home");
        }
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid email or password");
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
                <h1 className="text-2xl font-bold">Welcome back</h1>
                <p className="text-balance text-oklch(0.556 0 0) dark:text-oklch(0.708 0 0)">
                  Please enter your credentials
                </p>
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
              </Field>
              <Field>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="#"
                    className="ml-auto text-sm underline-offset-2 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              {loading && <Loading className="h-2" />}
              <Field>
                <Button type="submit">Login</Button>
              </Field>

              <FieldDescription className="text-center">
                Don&apos;t have an account? <a href="/user/register">Sign up</a>
              </FieldDescription>
            </FieldGroup>
          </form>
          <div className="relative hidden bg-oklch(0.97 0 0) md:block dark:bg-oklch(0.269 0 0)">
            <img
              src="/images/zambia-farming.jpg"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      {/* <FieldDescription className="px-6 text-center">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>
        and <a href="#">Privacy Policy</a>.
      </FieldDescription> */}
    </div>
  );
}
