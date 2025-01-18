import { FC } from "react";

const Touch: FC = () => {
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        access_key: "e49ae0e9-0ccd-4fc9-8ef6-55a8e7eac008",
        name: formData.get("name"),
        email: formData.get("email"),
        message: formData.get("message"),
      }),
    });

    const result = await response.json();
    if (result.success) {
      console.log(result);
      alert("Form submitted successfully!");
    } else {
      console.error("Form submission failed", result);
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <section
      id="touch" // This ID allows navigation to this section
      className="py-10 bg-[#009879] bg-opacity-50 backdrop-blur-lg bg-gradient-to-r from-[#cff85d] to-[#009b6a]"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-black dark:text-black">
          Get in Touch
        </h2>
        <p className="text-center text-black dark:text-black mt-2">
<<<<<<< HEAD
        We love to hear from you! Fill out the form below and we will get back to you as soon as possible.
=======
          We&apos;d love to hear from you! Fill out the form below and we'll get back to you as soon as possible.
>>>>>>> b35d9a152f77e612d1f9a44c8a6e13ffd25d6cf0
        </p>

        {/* Contact Form */}
        <form
          method="POST"
          className="max-w-lg mx-auto mt-8 bg-white dark:bg-gray-800 shadow-md rounded-lg p-6"
          onSubmit={handleSubmit}
        >
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your Email"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="message"
              className="block text-gray-700 dark:text-gray-300 font-medium mb-1"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="w-full border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 rounded-md shadow-sm focus:ring-orange-500 focus:border-orange-500"
              placeholder="Your Message"
              required
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 text-white font-medium py-2 px-4 rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Submit
          </button>
        </form>

        {/* Panel Section with Custom Color */}
        <div className="mt-10 bg-black py-6 px-4 rounded-lg">
          <h3 className="text-lg md:text-xl font-semibold text-center text-white">
            Need Help?
          </h3>
          <p className="text-center text-gray-100 mt-2">
            Feel free to reach out via the form above or email us
          </p>
        </div>
      </div>
    </section>
  );
};

export default Touch;
