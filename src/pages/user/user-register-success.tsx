import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { api } from "@/services/api.service";
import { useLocation } from "react-router";

export function UserRegisterSuccess({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const location = useLocation();

  const email = location.state?.email;

  return (
    <div className={cn("my-10 px-4 sm:px-8 lg:px-60", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          <div className="flex flex-col justify-center p-6 md:p-8">
            <h1 className="text-2xl font-bold tracking-tight">
              Check your email
            </h1>

            <p className="mt-2 text-muted-foreground">
              Your account has been created successfully.
            </p>

            <div className="mt-6 space-y-4 text-sm text-muted-foreground">
              <p>
                We've sent a verification email to{" "}
                <span className="font-medium text-foreground">
                  {email ?? "your email address"}
                </span>
                .
              </p>

              <p>
                Please click the verification link in that email to activate
                your account before signing in.
              </p>

              <p>
                If you don't receive the email within a few minutes, check your
                spam or junk folder.
              </p>
            </div>

            {/* Add these once implemented */}
            <Button className="mt-8">Resend verification email</Button>
            {/* <Button variant="outline" className="mt-2">Back to login</Button> */}
          </div>

          <div className="relative hidden bg-muted md:block">
            <img
              src="/images/zambia-farming.jpg"
              alt="Zambian agriculture"
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
