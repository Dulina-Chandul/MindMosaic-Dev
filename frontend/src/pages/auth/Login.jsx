import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
} from "../../components/ui/card";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, loginStatus, loginError } = useAuth();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const loginData = {
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
    };
    console.log("Login attempt with:", loginData);

    // Add more detailed error handling
    login(loginData, {
      onError: (error) => {
        console.error("Login error details:", error);
        // You can add more specific error handling here if needed
      },
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">
            Welcome back
          </CardTitle>
          <CardDescription className="text-center">
            Enter your credentials to access your account
            <div className="mt-2 p-3 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-md text-sm">
              <strong>Important Note:</strong> Due to a temporary authentication
              issue, please use the following test account to log in:
              <br />
              Email: dulina20061006@gmail.com
              <br />
              Password: Dul2006@
              <br />
              <span className="text-xs mt-1 block">
                You can create new account, but when you try to sign in, there
                is a problem in the server side. I could not find a solution for
                this because of the time, sorry for the inconvenience.
              </span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {loginError && (
              <div className="p-3 text-sm text-white bg-red-500 rounded-md">
                {loginError.response?.data?.message ||
                  loginError.message ||
                  "An error occurred during login. Please check your credentials and try again."}
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="text-sm font-medium">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-[#4ABABA] hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#4ABABA] hover:bg-[#4ABABA]/90"
              disabled={loginStatus === "pending"}
            >
              {loginStatus === "pending" ? (
                <span className="flex items-center justify-center">
                  <span className="mr-2 animate-spin">⟳</span> Signing in...
                </span>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{" "}
            <Link to="/register" className="text-[#4ABABA] hover:underline">
              Sign up
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
