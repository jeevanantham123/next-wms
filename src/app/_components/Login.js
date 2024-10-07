import { setAuth, useAuthStore } from "@/store/auth";
import React from "react";

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Login() {
  const {
    regUsername,
    password,
    email,
    regEmail,
    regPassword,
    authorizedUser,
  } = useAuthStore((state) => state);
  console.log("Register", authorizedUser);
  const handleInputChange = (event) => {
    setAuth({ key: event.target.id, value: event.target.value });
  };

  const handleLogin = (event) => {
    console.log(email, password);
    if (email === "admin@gmail.com" && password === "admin")
      setAuth({ key: "authorizedUser", value: true });
  };

  const handleRegister = (event) => {
    console.log(regUsername, regPassword, regEmail);
  };
  return (
    <div className="min-h-screen bg-white flex items-center justify-between">
      <div className="flex w-full justify-center items-center">
        <Tabs defaultValue="login" className="w-[400px]">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Login</TabsTrigger>
            <TabsTrigger value="register">Register</TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px]">Login</CardTitle>
                <CardDescription>
                  Use your credentials to login to your account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email"
                    required
                    onChange={handleInputChange}
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    required
                    onChange={handleInputChange}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleLogin}>Login</Button>
              </CardFooter>
            </Card>
          </TabsContent>
          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle className="text-[18px]">Register</CardTitle>
                <CardDescription>
                  Enter your information to set up a new account.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="space-y-1">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    id="regUsername"
                    placeholder="Enter your username"
                    value={regUsername}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="regEmail"
                    value={regEmail}
                    placeholder="Enter your email address"
                    type="email"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="space-y-1">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    type="password"
                    placeholder="Enter your preferred password"
                    id="regPassword"
                    value={regPassword}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleRegister}>Register</Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
      <div className="flex border-l w-full justify-center items-center">
        <img
          src="/assets/LoginPage.jpg"
          alt="login"
          className="w-[600px] h-[600px]"
        />
      </div>
    </div>
  );
}
