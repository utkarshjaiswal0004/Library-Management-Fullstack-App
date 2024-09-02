import React, { useState, useCallback } from "react";
import { login as loginService } from "../../services/auth/auth-service";
import Button from "../../component/button";
import Input from "../../component/input";
import { useAuth } from "../../context/auth-context";
import { useNavigate } from "react-router-dom";

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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login: contextLogin } = useAuth();
  const navigate = useNavigate();

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      try {
        const { user, accessToken } = await loginService(
          form.email,
          form.password,
        );

        setSuccess("Login successful! Redirecting...");
        contextLogin(user, accessToken);
        navigate("/library");
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [contextLogin, form.email, form.password, navigate],
  );

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

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
          showPasswordToggle={togglePasswordVisibility}
          showPassword={showPassword}
          ariaLabel={showPassword ? "Hide password" : "Show password"}
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Logging in..." : "Login"}
        </Button>
      </form>
    </div>
  );
};

export default LoginPage;
