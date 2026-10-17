"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParallax } from "@/common/hooks/useParallax";
import { AnimatedSection } from "@/components/animatedSection";
import { SimpleButton } from "@/components/buttons";
import {
  COFFI_APP_URL,
  MEDELLIN_COPY,
  MEDELLIN_IMAGES,
  medellinLocalePrefix,
  type Rich,
  type MedellinLang,
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

export default function MedellinArticle({ lang }: { lang: MedellinLang }) {
  const c = MEDELLIN_COPY[lang];
  // Reuse the existing blog UI strings (back, explore, follow) without touching locales.
  const t = useTranslations("blogBestCafesAndWorkFriendlySpaces");
  const { ref: sectionRef, scrollY } = useParallax();

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
            href={`${medellinLocalePrefix(lang)}/blog`}
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
            className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-10 leading-tight break-words"
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
            <span className="flex items-center gap-1"><Calendar size={14} /><time dateTime="2026-10-17">{c.dateLabel}</time></span>
            <span className="flex items-center gap-1"><Clock size={14} /><span>{c.readingTimeLabel}</span></span>
            <span className="flex items-center gap-1"><User size={14} /><span>Coffi Team</span></span>
          </motion.div>

          <div className="w-full max-w-5xl mt-12">
            <Figure {...MEDELLIN_IMAGES.hero} alt={c.alt.hero} priority />
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-20 md:gap-y-24 mt-8">
          {/* Intro */}
          <AnimatedSection className="md:col-span-8 md:col-start-3" animation="fadeUp">
            <p className="text-xl md:text-2xl font-light leading-relaxed text-j-deep-black/80 mb-8">{c.intro.p1}</p>
            <Quote className="text-2xl md:text-3xl">{c.intro.p2}</Quote>
          </AnimatedSection>

          {/* The game changed */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.game.h2}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-light leading-relaxed">
                <RichText parts={c.game.p1} />
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-lg leading-relaxed text-j-deep-black/80">
                <RichText parts={c.game.p2} />
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-medium text-coffi-purple/90 leading-relaxed">
                <RichText parts={c.game.p3} />
              </p>
            </div>
          </Section>

          {/* Laureles */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.laureles.h2}</h2>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-lg leading-relaxed text-j-deep-black/80">{c.laureles.p1}</p>
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg leading-relaxed text-j-deep-black/80">
                <RichText parts={c.laureles.p2} />
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-lg leading-relaxed text-j-deep-black/80">{c.laureles.p3}</p>
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <Quote className="text-xl md:text-2xl">{c.laureles.p4}</Quote>
            </div>
          </Section>

          {/* The environment */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.environment.h2}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-light leading-relaxed">{c.environment.p1}</p>
            </div>
            <div className="md:col-span-5 md:col-start-2">
              <p className="text-lg leading-relaxed text-j-deep-black/80">
                <RichText parts={c.environment.p2} />
              </p>
            </div>
            <div className="md:col-span-5 md:col-start-7">
              <p className="text-lg leading-relaxed text-j-deep-black/80">
                <RichText parts={c.environment.p3} />
              </p>
            </div>
            <div className="md:col-span-8 md:col-start-3 mt-4">
              <Quote className="text-xl md:text-3xl">
                <RichText parts={c.environment.p4} />
              </Quote>
            </div>
          </Section>

          {/* How to choose */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple leading-tight mb-6">{c.choose.h2}</h2>
              <p className="text-lg md:text-xl font-light leading-relaxed max-w-3xl">{c.choose.lead}</p>
            </div>
            <ol className="md:col-span-10 md:col-start-2 grid grid-cols-1 md:grid-cols-3 gap-6 list-none pl-0">
              {c.choose.items.map((item, i) => (
                <motion.li
                  key={item.lead}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: EASE }}
                  viewport={{ once: true }}
                  className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 p-6"
                >
                  <span aria-hidden="true" className="text-5xl font-black text-coffi-purple/10 block mb-3">{String(i + 1).padStart(2, "0")}</span>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    <strong className="text-j-deep-black">{item.lead}</strong>
                    <span>{item.rest}</span>
                  </p>
                </motion.li>
              ))}
            </ol>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-lg md:text-xl leading-relaxed text-j-deep-black/80">{c.choose.p1}</p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-medium text-coffi-purple/90 leading-relaxed">
                <RichText parts={c.choose.p2} />
              </p>
            </div>
          </Section>

          {/* From landing to thriving */}
          <Section>
            <div className="md:col-span-10 md:col-start-2">
              <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.thrive.h2}</h2>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-xl md:text-2xl font-light leading-relaxed">{c.thrive.p1}</p>
            </div>
            <div className="md:col-span-8 md:col-start-3">
              <p className="text-lg md:text-xl leading-relaxed text-j-deep-black/80">
                <RichText parts={c.thrive.p2} />
              </p>
            </div>
          </Section>

          {/* Sign-off + CTA + sources */}
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

          <AnimatedSection className="md:col-span-8 md:col-start-3" animation="fadeIn">
            <p className="text-xs md:text-sm italic leading-relaxed text-gray-500 border-t border-gray-200 pt-4">
              <em>{c.sources}</em>
            </p>
          </AnimatedSection>

          {/* Related posts */}
          <AnimatedSection className="md:col-span-10 md:col-start-2" animation="fadeUp">
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-6 block">{c.related.label}</span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {c.related.posts.map((p) => (
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
