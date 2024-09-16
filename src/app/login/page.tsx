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
import { ApolloError, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { ADD_USER_MUTATION } from "@/apollo/addUser";
import { useToast } from "@/hooks/use-toast";
import { GraphQLFormattedError } from "graphql/error";
import { useCookies } from "next-client-cookies";

interface RegistrationError extends GraphQLFormattedError {
  message: string;
  locations: { line: number; column: number }[];
  path: string[];
  extensions: {
    code: string;
    originalError: Error;
  };
}

export default function Login() {
  const { setTokens } = useAuthStore();
  const [login] = useMutation(LOGIN_MUTATION);
  const [addUser] = useMutation(ADD_USER_MUTATION);
  const { toast } = useToast();
  const router = useRouter();
  const cookies = useCookies();

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
    } catch (error: ApolloError | unknown) {
      console.error("Registration error", error);
      if (error instanceof ApolloError) {
        const registrationError: GraphQLFormattedError | undefined =
          error.graphQLErrors.find((e) => typeof e === "object");
        throw new Error(
          (registrationError?.extensions &&
            (registrationError as RegistrationError).extensions.originalError
              .message) ||
            registrationError?.message ||
            ""
        );
      }
      throw new Error((error as Error).message || error?.toString() || "");
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
      cookies.set("access_token", data.login.access_token);
      cookies.set("refresh_token", data.login.refresh_token);
      router.push("/my-info/time-off");
    } catch (error) {
      console.error("Login error", error);
      toast({
        variant: "destructive",
        title: "Login error",
        description:
          typeof error === "string"
            ? error
            : (error as Error).message || error?.toString() || "",
      });
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto pt-48 px-2">
      <Card>
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
    </div>
  );
}
