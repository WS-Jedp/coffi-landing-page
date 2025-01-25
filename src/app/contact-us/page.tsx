export default function ContactUs() {
  return (
    <article className="relative flex flex-col items-center w-full max-w-[1200px] min-h-screen mx-auto py-6 px-5 md:px-0">
      <h1 className="font-bold text-4xl md:text-7xl mb-6 text-center">
        Contact Us
      </h1>
      <p className="text-lg font-light mt-1 mb-6 text-center w-full max-w-[600px]">
        We'd love to hear from you! If you have any questions, issues, or
        suggestions, feel free to reach out. Our team is here to help.
      </p>

      <section className="w-full">
        <h2 className="font-bold text-xl md:text-4xl mb-4 text-start">
          Get in Touch with Us
        </h2>
        <div className="text-md font-normal text-start space-y-4">
          <p>
            <a
              href="mailto:help@coffi.com"
              className="font-bold text-coffi-purple underline hover:text-coffi-purple/70 transition text-4xl md:text-6xl"
            >
              help@coffi.com
            </a>
          </p>
          <p>Once we receive your message, here’s what will happen:</p>
          <ol className="list-decimal list-inside space-y-2">
            <li>
              <strong>Initial Acknowledgment:</strong> You’ll receive an email
              confirming that we’ve received your message.
            </li>
            <li>
              <strong>Review:</strong> Our team will review your query or
              suggestion to ensure we provide the best possible assistance.
            </li>
            <li>
              <strong>Response:</strong> You can expect a reply from us within{" "}
              <span className="font-semibold">1-2 business days</span>. For
              urgent matters, we’ll aim to respond as quickly as possible.
            </li>
          </ol>
        </div>
      </section>
    </article>
  );
}
