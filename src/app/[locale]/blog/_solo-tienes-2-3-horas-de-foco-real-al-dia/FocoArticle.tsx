"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParallax } from "@/common/hooks/useParallax";
import { AnimatedSection } from "@/components/animatedSection";
import { SimpleButton } from "@/components/buttons";
import { blogPostPath, getBlogPost } from "@/lib/seo/routes";
import {
  COFFI_APP_URL,
  FOCO_COPY,
  FOCO_IMAGES,
  focoLocalePrefix,
  type Rich,
  type FocoLang,
} from "./content";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];
const LINK =
  "text-coffi-purple underline decoration-coffi-purple/30 underline-offset-4 hover:text-coffi-blue transition-colors";

function RichText({ parts, linkClass = LINK }: { parts: Rich; linkClass?: string }) {
  return (
    <>
      {parts.map((p, i) => {
        if (typeof p === "string") return <span key={i}>{p}</span>;
        let node: React.ReactNode = p.t;
        if (p.em) node = <em>{node}</em>;
        if (p.strong) node = <strong>{node}</strong>;
        if (p.href) {
          return p.href.startsWith("http") ? (
            <a key={i} href={p.href} className={linkClass}>
              {node}
            </a>
          ) : (
            <Link key={i} href={p.href} className={linkClass}>
              {node}
            </Link>
          );
        }
        return <span key={i}>{node}</span>;
      })}
    </>
  );
}

function Figure({ src, width, height, alt, priority = false }: { src: string; width: number; height: number; alt: string; priority?: boolean }) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      viewport={{ once: true, margin: "-60px" }}
      className="w-full overflow-hidden rounded-2xl border border-gray-100 shadow-md shadow-coffi-purple/10"
    >
      <Image
        src={src}
        width={width}
        height={height}
        alt={alt}
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 85vw, 1100px"
        className="w-full h-auto object-cover"
      />
    </motion.figure>
  );
}

function Section({ children }: { children: React.ReactNode }) {
  return (
    <AnimatedSection className="md:col-span-full" animation="fadeUp">
      <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">{children}</div>
    </AnimatedSection>
  );
}

function Quote({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.blockquote
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: EASE }}
      viewport={{ once: true, margin: "-100px" }}
      className="border-l-4 border-coffi-purple pl-6 py-2"
    >
      <p className={`font-light text-coffi-purple/90 italic ${className}`}>{children}</p>
    </motion.blockquote>
  );
}

const CARD =
  "bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6";

export default function FocoArticle({ lang }: { lang: FocoLang }) {
  const c = FOCO_COPY[lang];
  // Reuse the existing blog UI strings (back, explore, follow) without touching locales.
  const t = useTranslations("blogBestCafesAndWorkFriendlySpaces");
  const { ref: sectionRef, scrollY } = useParallax();
  const related = c.related.ids.map((id) => {
    const post = getBlogPost(id);
    return { title: post.title[lang], href: blogPostPath(post, lang) };
  });

  return (
    <section ref={sectionRef} className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen overflow-x-hidden">
      {/* Hero */}
      <header className="w-full pt-28 pb-16 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white" style={{ opacity: `${0.3 + scrollY * 0.001}` }}></div>
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-coffi-purple/30 blur-[100px]" style={{ transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.01}px)` }} />
            <div className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-coffi-blue/20 blur-[100px]" style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)` }} />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <Link
            href={`${focoLocalePrefix(lang)}/blog`}
            className="self-start md:self-center mb-8 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            <span className="font-medium">{t("navigation.back")}</span>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: EASE }} className="flex flex-row flex-nowrap items-center justify-start mb-6">
            <Image src="/assets/images/coffi-logo.png" alt="Coffi Logo" width={51} height={51} className="object-cover" priority />
            <div className="flex flex-col items-start justify-center ml-2">
              <span className="font-black text-3xl">Coffi</span>
              <span className="font-extralight text-sm mt-[-2px]">Be Where You Thrive</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            style={{ transform: `translateY(${scrollY * 0.15}px) scale(${1 - scrollY * 0.0003})` }}
            className="max-w-5xl text-3xl sm:text-4xl md:text-6xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-10 leading-tight break-words"
          >
            {c.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            className="max-w-2xl text-center text-lg md:text-2xl font-light italic leading-relaxed text-j-deep-black/90"
          >
            {c.lead}
          </motion.p>

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.6, ease: EASE }} className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mt-8">
            <span className="flex items-center gap-1"><Calendar size={14} /><time dateTime="2026-10-21">{c.dateLabel}</time></span>
            <span className="flex items-center gap-1"><Clock size={14} /><span>{c.readingTimeLabel}</span></span>
            <span className="flex items-center gap-1"><User size={14} /><span>Coffi Team</span></span>
          </motion.div>

          <div className="w-full max-w-5xl mt-12">
            <Figure {...FOCO_IMAGES.hero} alt={c.alt.hero} priority />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-20 md:gap-y-24 mt-8">
          {/* Intro (the first paragraph is the hero lead) */}
          <AnimatedSection className="md:col-span-8 md:col-start-3" animation="fadeUp">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-j-deep-black/80 mb-8">
              <RichText parts={c.intro.p1} />
            </p>
            <p className="text-lg md:text-xl font-medium leading-relaxed text-coffi-purple/90">
              <RichText parts={c.intro.p2} />
            </p>
          </AnimatedSection>

          {/* Context is the engine */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.context.h2}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <Quote className="text-xl md:text-3xl">{c.context.p1}</Quote>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                <RichText parts={c.context.p2} />
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-lg leading-relaxed text-j-deep-black/80">{c.context.p3}</p>
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg leading-relaxed text-j-deep-black/80">
                <RichText parts={c.context.p4} />
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <div className="rounded-2xl border border-coffi-purple/10 bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/10 p-8">
                <p className="text-lg md:text-xl leading-relaxed text-j-deep-black/80">
                  <RichText parts={c.context.p5} />
                </p>
              </div>
            </div>
          </Section>

          {/* How to protect your hours */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple leading-tight mb-6">{c.protect.h2}</h2>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl">
                <RichText parts={c.protect.lead} />
              </p>
            </div>
            <ol className="md:col-span-10 md:col-start-2 grid grid-cols-1 md:grid-cols-2 gap-6 list-none pl-0 [counter-reset:step]">
              {c.protect.items.map((item, i) => (
                <motion.li
                  key={item.heading}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + (i % 2) * 0.1, ease: EASE }}
                  viewport={{ once: true }}
                  className={`${CARD} [counter-increment:step]`}
                >
                  {/* Numbering comes from the source's ordered list; generated by CSS so it is not extra text. */}
                  <span aria-hidden="true" className="block text-5xl font-black text-coffi-purple/10 mb-3 before:[content:counter(step)]"></span>
                  <p className="text-lg font-bold text-j-deep-black leading-snug mb-4">
                    <strong>{item.heading}</strong>
                  </p>
                  <div className="flex flex-col gap-3">
                    {item.lines.map((line, j) => (
                      <p key={j} className="text-j-deep-black/80 leading-relaxed">
                        <RichText parts={line} />
                      </p>
                    ))}
                  </div>
                </motion.li>
              ))}
            </ol>
          </Section>

          {/* Coffi exists for this */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.coffi.h2}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-3 flex flex-col gap-8">
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                <RichText parts={c.coffi.p1} />
              </p>
              <p className="text-lg md:text-xl leading-relaxed text-j-deep-black/80">{c.coffi.p2}</p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <Quote className="text-xl md:text-3xl">{c.coffi.p3}</Quote>
            </div>
          </Section>

          {/* Sign-off + CTA */}
          <AnimatedSection className="md:col-span-full text-center mt-8 relative" animation="fadeIn">
            <div className="flex flex-row flex-nowrap items-center justify-center mb-10">
              <Image src="/assets/images/coffi-logo.png" alt="Coffi Logo" width={51} height={51} className="object-cover" />
              <p className="ml-3 text-2xl md:text-3xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                <strong className="font-extralight">{c.signoff}</strong>
              </p>
            </div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              <SimpleButton text={t("mainContent.concluding.buttonExplore")} action={() => window.open(COFFI_APP_URL, "_blank")} />
              <Link
                href="https://instagram.com/letscoffi"
                target="_blank"
                rel="noopener"
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-white/90 border border-coffi-purple/20 rounded-lg px-6 py-[7px] text-sm font-medium text-coffi-purple transition-all duration-300 ease-in-out"
              >
                <Instagram size={18} />
                {t("mainContent.concluding.buttonFollow")}
              </Link>
            </motion.div>
          </AnimatedSection>

          {/* Research footnote */}
          <aside className="md:col-span-8 md:col-start-3 border-t border-coffi-purple/10 pt-6">
            <p className="text-xs md:text-sm leading-relaxed text-gray-500">
              <em>{c.footnote}</em>
            </p>
          </aside>

          {/* Related posts */}
          <AnimatedSection className="md:col-span-10 md:col-start-2" animation="fadeUp">
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-6 block">{c.related.label}</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between gap-4"
                >
                  <span className="text-lg font-bold text-j-deep-black group-hover:text-coffi-purple transition-colors leading-tight">{p.title}</span>
                  <ArrowRight size={18} className="text-coffi-purple group-hover:translate-x-1 transition-transform" />
                </Link>
              ))}
            </div>
          </AnimatedSection>
        </article>
      </main>
    </section>
  );
}
