import React, { useState } from "react";
import { login } from "../../services/auth/auth-service";
import Button from "../../component/button";
import Input from "../../component/input";
import { useAuth } from "../../context/auth-context";

interface FormState {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const { login: contextLogin } = useAuth(); // Use the login function from AuthContext

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const { accessToken, refreshToken } = await login(
        form.email,
        form.password,
      );
      setSuccess("Login successful! Redirecting...");
      contextLogin(accessToken, refreshToken); // Use contextLogin to update the login state in the context
      window.location.href = "/library";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 bg-backgroundLight">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <Input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />
        <Input
          id="password"
          name="password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={handleChange}
          placeholder="******************"
          showPasswordToggle={() => setShowPassword((prev) => !prev)}
          showPassword={showPassword}
          ariaLabel={showPassword ? "Hide password" : "Show password"}
        />
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
