"use client";

import { LOGIN_MUTATION } from "@/apollo/login";
import { useAuthStore } from "@/zustand/store";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useMutation } from "@apollo/client";
import { redirect } from "next/navigation";
import { ADD_USER_MUTATION } from "@/apollo/addUser";

export function LoginForm() {
  const { setTokens } = useAuthStore();
  const [login] = useMutation(LOGIN_MUTATION);
  const [addUser] = useMutation(ADD_USER_MUTATION);

  const fakeRegistation = async ({
    email,
    password,
    avatar,
  }: {
    email: string;
    password: string;
    avatar: string;
  }) => {
    try {
      await addUser({ variables: { name: email, email, password, avatar } });
    } catch (error) {
      console.log("Registration error", (error as Error).message || error);
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
      await fakeRegistation({
        email,
        password,
        avatar: "https://api.lorem.space/image/face?w=150&h=220",
      });
      const { data } = await login({ variables: { email, password } });
      setTokens(data.login.access_token, data.login.refresh_token);
      redirect("/my-info");
    } catch (error) {
      console.error("Login error", error);
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account.
        </CardDescription>
      </CardHeader>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin(
            e.currentTarget.email.value,
            e.currentTarget.password.value
          );
        }}
      >
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" type="submit">
            Sign in
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
