import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2, CircleX } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../../services/api.service";
import Loading from "@/components/ui/loading";
import { Button } from "@/components/ui/button";

export function UserVerify() {
  const token = new URLSearchParams(location.search).get("token");
  const nav = useNavigate();

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // <-- error state
  const [loading, setLoading] = useState(false);
  const [resendFlag, setResendFlag] = useState(false);
  const [resendText, setResendText] = useState("");
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (!token) {
      nav("/home");
      return;
    }

    verifyEmail(token);
  }, [nav, token]);

  const verifyEmail = (token: string) => {
    setLoading(true);
    api
      .verifyEmail(token)
      .then((res) => {
        setLoading(false);
        setSuccessMessage(res.data.message);

        console.log(res.data);
      })
      .catch((err) => {
        setLoading(false);
        const errResponse = err.response.data;
        setErrorMessage(errResponse.message);

        if (errResponse.code === "TOKEN_EXPIRED") {
          setResendFlag(true);
          setEmail(errResponse.email);
        }
        console.log(err.message);
      });
  };

  const sendResendLink = () => {
    setLoading(true);
    api
      .resendEmail(email)
      .then((res) => {
        setLoading(false);
        setResendText(res.data.message);
        console.log(res.data.message);
      })
      .catch((err) => {
        setLoading(false);
        setResendText(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className={cn("my-10 px-4 sm:px-8 lg:px-60")}>
      <Card className="overflow-hidden p-0">
        <CardContent className="p-4">
          {loading && (
            <>
              <Loading className="h-2" />
              <h1>Verifying your email...</h1>
            </>
          )}

          {successMessage && (
            <>
              <div className="flex items-center justify-center gap-2 text-green-600">
                <span className="text-2xl font-bold">Email verified!</span>
                <CheckCircle2 className="h-7 w-7" />
              </div>

              <p className="mt-3">{successMessage}</p>

              <div className="mt-6">
                <Button asChild>
                  <Link to="/user/login">Continue to login</Link>
                </Button>
              </div>
            </>
          )}

          {errorMessage && (
            <>
              <div className="flex items-center justify-center gap-2 text-red-600">
                <span className="text-2xl font-bold">Something's wrong...</span>
                <CircleX className="h-7 w-7" />
              </div>

              <p className="mt-3">{errorMessage}</p>

              {resendFlag && (
                <div className="mt-6">
                  <Button onClick={sendResendLink}>
                    Resend verification email
                  </Button>
                </div>
              )}

              {resendText}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
