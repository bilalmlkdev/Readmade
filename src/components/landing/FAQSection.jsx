import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "Is Readmade really free?",
    answer:
      "Yes. Readmade is open source under the MIT license and free to use forever. We believe README tooling should be accessible to every developer, regardless of team size or budget. There are no hidden paywalls or feature gates.",
  },
  {
    question: "Do I need to create an account to use it?",
    answer:
      "No. You can start building immediately without any sign-up. Your work is saved locally in your browser. Nothing is uploaded to a server unless you choose to share it yourself.",
  },
  {
    question: "What kind of README sections can I add?",
    answer:
      "Readmade supports title, badges, description, features, installation, usage, screenshots, API, contributing, license, and custom Markdown blocks. Drag them, reorder them, and export a clean GitHub-ready file.",
  },
  {
    question: "Does the preview match GitHub?",
    answer:
      "The live preview is built to render Markdown the way GitHub does - badges, tables, code blocks, images, and more - so what you see is what ships.",
  },
  {
    question: "Is my data private and secure?",
    answer:
      "When using Readmade locally, all data stays in your browser - nothing is sent to external servers. You own your content and can export it anytime as Markdown.",
  },
  {
    question: "Can I use Readmade with my existing repo?",
    answer:
      "Absolutely. Export README.md and drop it into any repository. You can also paste existing Markdown into a custom block and keep editing from there.",
  },
];

function FAQItem({ faq, isOpen, onToggle }) {
  return (
    <div className="border-b border-border/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="group flex w-full items-start justify-between gap-4 py-5 text-left sm:py-6 md:py-7"
        type="button"
      >
        <h3 className="pr-4 text-sm leading-snug font-medium tracking-tight text-foreground sm:text-base md:text-lg">
          {faq.question}
        </h3>
        <div className="mt-0.5 shrink-0">
          <ChevronDown
            size={18}
            className={`text-muted-foreground transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? "max-h-96 pb-5 sm:pb-6 md:pb-7" : "max-h-0"
        }`}
      >
        <p className="max-w-2xl pr-12 text-xs leading-relaxed text-muted-foreground sm:text-sm">
          {faq.answer}
        </p>
      </div>
    </div>
  );
}

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section className="w-full" id="faqs">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12 lg:gap-16">
        <div className="flex flex-col gap-3 sm:gap-4 md:col-span-4">
          <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
            FAQs
          </span>
          <h2 className="text-3xl leading-[1.1] font-medium tracking-tighter text-foreground sm:text-4xl md:text-5xl">
            Common
            <br />
            <span className="instrument-serif -tracking-normal">questions</span>
          </h2>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
            Can&apos;t find what you&apos;re looking for? Reach out through our
            contact section.
          </p>
        </div>

        <div className="md:col-span-8">
          <div className="border-t border-border/50">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                faq={faq}
                isOpen={openIndex === index}
                onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
