import React, { useState } from "react";

export default function Contact() {
  const [result, setResult] = useState("");

  const onSubmit = async (event) => {
    event.preventDefault();
    setResult("Sending...");

    const formData = new FormData(event.target);
    formData.append("access_key", "2b4a0c75-1bd6-4c9d-917f-d6b88bbc464b");
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully!");
        event.target.reset();
      } else {
        setResult(`Error: ${data.message}`);
      }
    } catch (err) {
      console.error(err);
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 p-3 text-black">
      <h1 className="text-3xl font-bold mb-6">Contact Us</h1>

      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg bg-white p-8 rounded shadow-md flex flex-col gap-4"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
        />

        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
        />

        <textarea
          name="message"
          placeholder="Your Message"
          required
          rows="5"
          className="border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-black-500"
        ></textarea>

        <button
          type="submit"
          className="bg-black text-white font-bold p-3 rounded hover:bg-black-600 hover:cursor-pointer transition duration-300"
        >
          Submit Form
        </button>
      </form>

      {result && (
        <div className="mt-4 text-center text-black font-medium">{result}</div>
      )}
    </div>
  );
}
