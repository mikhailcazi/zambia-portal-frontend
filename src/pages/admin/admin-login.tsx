import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { api } from "../../services/api.service";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useState } from "react";
import Loading from "@/components/ui/loading";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // <-- error state
  const [loading, setLoading] = useState(false);

  const nav = useNavigate();
  const login = (event: React.FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    setError(""); // clear previous errors
    api
      .login(username, password)
      .then((res) => {
        localStorage.setItem("token", res.data.access_token);
        console.log(res.data);
        // Redirect after successful login
        nav("/admin/dashboard");
      })
      .catch((err) => {
        setLoading(false);
        setError("Invalid username or password");
        console.log(err); // <-- set error
      });
  };

  return (
    <form onSubmit={login} className="w-full flex items-center justify-center">
      <Card className="w-md">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="john.doe"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {error && <p className="text-sm text-red-600 mt-1">{error}</p>}
              {loading && <Loading className="h-2" />}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button type="submit" className="w-full">
            Login
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
