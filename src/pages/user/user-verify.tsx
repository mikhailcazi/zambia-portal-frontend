import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { api } from "../../services/api.service";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

export function UserVerify() {
  const token = new URLSearchParams(location.search).get("token");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(""); // <-- error state
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) return;

    verifyEmail(token);
  }, [token]);

  const verifyEmail = (token: string) => {
    setLoading(true);
    api
      .verifyEmail(token)
      .then((res) => {
        setLoading(false);
        console.log(res.data);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError("Something went wrong!");
        console.log(err); // <-- set error
      });
  };

  return (
    <div className={cn("my-10 px-4 sm:px-8 lg:px-60")}>
      <Card className="overflow-hidden p-0">
        <CardContent>
          {loading && (
            <>
              <Loading className="h-2" />
              <h1>Verifying your email...</h1>
            </>
          )}

          {success && (
            <>
              <CheckCircle2 />
              <h1>Email verified!</h1>
              <p>Your account has been verified successfully.</p>
              <Button asChild>
                <Link to="/login">Continue to login</Link>
              </Button>
            </>
          )}

          {error && (
            <>
              <CircleX />
              <h1>Verification failed</h1>
              <p>{"errorMessage"}</p>
              <Button>Resend verification email</Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
