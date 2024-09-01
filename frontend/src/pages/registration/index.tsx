import React, { useState } from "react";
import Button from "../../component/button";
import Input from "../../component/input";
const RegistrationPage: React.FC = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    console.log("Form submitted", form);
  };

  return (
    <div className="flex items-center justify-center pt-20 bg-backgroundLight">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
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

export default RegistrationPage;
