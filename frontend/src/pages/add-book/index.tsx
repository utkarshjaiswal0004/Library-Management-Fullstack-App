import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../component/button";
import Input from "../../component/input";
import TextArea from "../../component/text-area";
import { Book } from "../../interfaces/book";
import { addBook as addBookService } from "../../services/book/book-service";

interface FormState {
  title: string;
  author: string;
  copies: number;
  description: string;
  imageUrl: string;
}

const AddBookPage: React.FC = () => {
  const [form, setForm] = useState<FormState>({
    title: "",
    author: "",
    copies: 1,
    description: "",
    imageUrl: "",
  });

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prevForm) => ({
        ...prevForm,
        [name]: name === "copies" ? Number(value) : value,
      }));
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      setIsSubmitting(true);
      setError(null);
      setSuccess(null);

      try {
        const newBook: Book = {
          ...form,
        };

        await addBookService(newBook);

        setSuccess("Book added successfully! Redirecting...");
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
    [form, navigate],
  );

  return (
    <div className="flex items-center justify-center pt-20 m-5 bg-backgroundLight">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md"
      >
        <h1 className="mb-4 text-2xl font-bold text-center text-textDark md:text-3xl">
          Add Book
        </h1>
        {error && <p className="mb-4 text-red-500">{error}</p>}
        {success && <p className="mb-4 text-green-500">{success}</p>}
        <Input
          id="title"
          name="title"
          type="text"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          required
        />
        <Input
          id="author"
          name="author"
          type="text"
          value={form.author}
          onChange={handleChange}
          placeholder="Author"
          required
        />
        <Input
          id="copies"
          name="copies"
          type="number"
          value={form.copies}
          onChange={handleChange}
          placeholder="Number of copies"
          min={1}
          required
        />
        <TextArea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          required
        />
        <Input
          id="imageUrl"
          name="imageUrl"
          type="url"
          value={form.imageUrl}
          onChange={handleChange}
          placeholder="Image URL"
        />
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding book..." : "Add Book"}
        </Button>
      </form>
    </div>
  );
};

export default AddBookPage;
