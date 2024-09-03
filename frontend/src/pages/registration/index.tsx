import React, { useState } from "react";
import { register } from "../../services/auth/auth-service";

import Button from "../../component/button";
import Input from "../../component/input";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const RegistrationForm: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const { token } = await register(form.name, form.email, form.password);
      setSuccess("Registration successful! Redirecting...");
      localStorage.setItem("authToken", token);
      window.location.href = "/login";
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center pt-20 m-5 bg-backgroundLight">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-4 text-2xl font-bold text-center text-textDark md:text-3xl">
          Register
        </h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <Input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          required
        />
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
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type={showConfirmPassword ? "text" : "password"}
          value={form.confirmPassword}
          onChange={handleChange}
          placeholder="******************"
          showPasswordToggle={() => setShowConfirmPassword((prev) => !prev)}
          showPassword={showConfirmPassword}
          ariaLabel={
            showConfirmPassword
              ? "Hide confirm password"
              : "Show confirm password"
          }
        />
        <Button type="submit" className="w-full">
          Register
        </Button>
      </form>
    </div>
  );
};

export default RegistrationForm;
