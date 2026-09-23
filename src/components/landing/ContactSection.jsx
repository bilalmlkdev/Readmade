import { Link } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";
import { TextureButton } from "../ui/TextureButton";

const socials = [
  {
    icon: FaGithub,
    label: "GitHub",
    href: "https://github.com/bilalmlkdev/readmade",
  },
  {
    icon: FaXTwitter,
    label: "Twitter",
    href: "https://x.com/bilalmlkdev",
  },
  {
    icon: MessageCircle,
    label: "Feedback",
    href: "https://github.com/bilalmlkdev/readmade/issues",
  },
];

export function ContactSection() {
  return (
    <section className="w-full" id="contact">
      <div className="relative overflow-hidden rounded-2xl border border-border/50 bg-background sm:rounded-3xl md:rounded-[3rem]">
        <div className="p-6 sm:p-8 md:p-12 lg:p-16">
          <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center sm:gap-6">
            <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
              Get In Touch
            </span>
            <h2 className="max-w-xl text-3xl leading-[1.1] font-medium tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
              Let&apos;s build better
              <span className="instrument-serif -tracking-normal"> docs together</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Have feedback, want to contribute, or just want to say hello?
              We&apos;d love to hear from you. Readmade is a community-driven
              project and every voice matters.
            </p>

            <div className="mt-4 flex flex-wrap items-center justify-center gap-3 sm:mt-6 sm:gap-4">
              {socials.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <TextureButton>
                      <Icon className="size-4" />
                      <span className="text-xs font-medium sm:text-sm">
                        {social.label}
                      </span>
                    </TextureButton>
                  </a>
                );
              })}
            </div>

            <Link
              to="/docs"
              className="mt-2 text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Or read the docs
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
