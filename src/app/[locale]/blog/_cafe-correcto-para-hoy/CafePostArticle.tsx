"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import { Instagram, ArrowLeft, ArrowRight, Calendar, Clock, User } from "lucide-react";
import { useTranslations } from "next-intl";
import { useParallax } from "@/common/hooks/useParallax";
import { AnimatedSection } from "@/components/animatedSection";
import { SimpleButton } from "@/components/buttons";
import { CAFE_POST_COPY, cafePostLocalePrefix, type CafePostLang } from "./content";

const COFFI_APP_URL = "https://app.coffi.com.co";
const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

function SectionNumber({ n }: { n: string }) {
  return (
    <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
      {n} / 04
    </span>
  );
}

export default function CafePostArticle({ lang }: { lang: CafePostLang }) {
  const c = CAFE_POST_COPY[lang];
  // Reuse the existing blog UI strings (back, explore, follow) without touching locales.
  const t = useTranslations("blogBestCafesAndWorkFriendlySpaces");
  const { ref: sectionRef, scrollY } = useParallax();

  return (
    <section
      ref={sectionRef}
      className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen overflow-x-hidden"
    >
      {/* Hero */}
      <header className="w-full min-h-[90vh] py-28 flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white"
            style={{ opacity: `${0.3 + scrollY * 0.001}` }}
          ></div>
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-coffi-purple/30 blur-[100px]"
              style={{ transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.01}px)` }}
            />
            <div
              className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-coffi-blue/20 blur-[100px]"
              style={{ transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)` }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          {/* Navigation (in flow so the floating site header never covers it) */}
          <Link
            href={`${cafePostLocalePrefix(lang)}/blog`}
            className="self-start md:self-center mb-8 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ArrowLeft size={16} />
            <span className="font-medium">{t("navigation.back")}</span>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex flex-row flex-nowrap items-center justify-start mb-6"
          >
            <Image
              src="/assets/images/coffi-logo.png"
              alt="Coffi Logo"
              width={51}
              height={51}
              className="object-cover"
              priority
            />
            <div className="flex flex-col items-start justify-center ml-2">
              <span className="font-black text-3xl">Coffi</span>
              <span className="font-extralight text-sm mt-[-2px]">Be Where You Thrive</span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            style={{
              transform: `translateY(${scrollY * 0.2}px) scale(${1 - scrollY * 0.0003})`,
            }}
            className="max-w-5xl text-4xl sm:text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-10 leading-tight break-words"
          >
            {c.h1}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: EASE }}
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              opacity: `${1 - scrollY * 0.0008}`,
            }}
            className="max-w-2xl text-center text-lg md:text-2xl font-light leading-relaxed text-j-deep-black/90"
          >
            {c.heroDescription}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6, ease: EASE }}
            className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600 mt-8"
          >
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              <time dateTime="2026-10-10">{c.dateLabel}</time>
            </span>
            <span className="flex items-center gap-1">
              <Clock size={14} />
              <span>{c.readingTimeLabel}</span>
            </span>
            <span className="flex items-center gap-1">
              <User size={14} />
              <span>Coffi Team</span>
            </span>
          </motion.div>
        </div>
      </header>

      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        <article className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-20 md:gap-y-24 mt-8 md:mt-16">
          {/* Intro */}
          <AnimatedSection className="md:col-span-8 md:col-start-3" animation="fadeUp">
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-8">{c.intro[0]}</p>
            <p className="text-lg md:text-xl leading-relaxed text-j-deep-black/80">{c.intro[1]}</p>
          </AnimatedSection>

          {/* Large quote */}
          <AnimatedSection className="md:col-span-full" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16 md:mb-24"></div>
            <blockquote className="text-2xl md:text-4xl text-coffi-purple/80 font-light italic text-center max-w-4xl mx-auto">
              <p>{c.introQuote}</p>
            </blockquote>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16 md:mt-24"></div>
          </AnimatedSection>

          {/* 01 - Noise */}
          <AnimatedSection className="md:col-span-full" animation="fadeUp">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
              <div className="md:col-span-5 md:col-start-2">
                <SectionNumber n="01" />
                <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">
                  {c.noise.h2}
                </h2>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="text-lg md:text-xl font-light leading-relaxed">{c.noise.study}</p>
              </div>

              {/* Data block: ~70 dB */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="md:col-span-10 md:col-start-2 rounded-2xl border border-gray-100 bg-white shadow-sm overflow-hidden"
              >
                <div className="bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 p-6 md:p-10">
                  <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
                    <span className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                      {c.noise.scale.mid}
                    </span>
                    <span className="text-sm uppercase tracking-widest text-coffi-purple/60">
                      {c.noise.statSource}
                    </span>
                  </div>
                  <div className="mt-8" aria-hidden="true">
                    <div className="relative h-3 rounded-full bg-gradient-to-r from-coffi-blue/20 via-coffi-purple to-coffi-blue/20">
                      <motion.span
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.4, ease: EASE }}
                        viewport={{ once: true }}
                        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 rounded-full bg-white border-4 border-coffi-purple shadow-md shadow-coffi-purple/30"
                      />
                    </div>
                    <div className="flex justify-between text-xs md:text-sm text-j-deep-black/70 mt-3 gap-4">
                      <span>{c.noise.scale.low}</span>
                      <span className="font-semibold text-coffi-purple">{c.noise.scale.mid}</span>
                      <span className="text-right">{c.noise.scale.high}</span>
                    </div>
                  </div>
                </div>
              </motion.div>

              <div className="md:col-span-5 md:col-start-2">
                <p className="text-lg leading-relaxed text-j-deep-black/80">{c.noise.explanation}</p>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="text-lg leading-relaxed text-j-deep-black/80">{c.noise.nuance}</p>
              </div>

              <div className="md:col-span-8 md:col-start-3 mt-4">
                <motion.blockquote
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: EASE }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="border-l-4 border-coffi-purple pl-6 py-2"
                >
                  <p className="text-xl md:text-3xl font-light text-coffi-purple/90 italic">{c.noise.pull}</p>
                </motion.blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* 02 - Medellín */}
          <AnimatedSection className="md:col-span-full" animation="fadeUp">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
              <div className="md:col-span-10 md:col-start-2">
                <SectionNumber n="02" />
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple leading-tight">
                  {c.medellin.h2}
                </h2>
              </div>

              {/* Neighborhood comparison cards */}
              {[c.medellin.laureles, c.medellin.poblado].map((n, i) => (
                <motion.div
                  key={n.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 + i * 0.15, ease: EASE }}
                  viewport={{ once: true }}
                  className={`md:col-span-5 ${i === 0 ? "md:col-start-2" : ""} bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-shadow duration-300 overflow-hidden`}
                >
                  <div className="bg-gradient-to-br from-coffi-blue/5 to-coffi-purple/5 px-6 pt-6 pb-4">
                    <h3 className="inline-block bg-coffi-purple text-white px-3 py-1 rounded-full text-sm font-medium">
                      {n.label}
                    </h3>
                  </div>
                  <p className="p-6 pt-4 text-j-deep-black/80 leading-relaxed">{n.text}</p>
                </motion.div>
              ))}

              {/* Time of day */}
              <div className="md:col-span-10 md:col-start-2">
                <p className="text-xl md:text-2xl font-light mb-8">{c.medellin.hourLead}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  {c.medellin.slots.map((s, i) => (
                    <motion.div
                      key={s.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 + i * 0.1 }}
                      viewport={{ once: true }}
                      className="border-l-2 border-coffi-purple/30 pl-4"
                    >
                      <span className="text-5xl font-black text-coffi-purple/10 block mb-2">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-xl font-semibold mb-2">{s.label}</h3>
                      <p className="text-j-deep-black/80">{s.text}</p>
                    </motion.div>
                  ))}
                </div>
                <p className="text-lg md:text-xl font-medium text-coffi-purple/90 mt-8">{c.medellin.hourClose}</p>
              </div>

              <div className="md:col-span-8 md:col-start-3">
                <p className="text-lg leading-relaxed text-j-deep-black/80">{c.medellin.comfort}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* 03 - How to choose */}
          <AnimatedSection className="md:col-span-full" animation="fadeUp">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
              <div className="md:col-span-4 md:col-start-2">
                <SectionNumber n="03" />
                <h2 className="text-3xl md:text-5xl font-bold text-j-deep-black leading-tight">{c.choose.h2}</h2>
              </div>
              <div className="md:col-span-6 md:col-start-6">
                <p className="text-lg md:text-xl font-light leading-relaxed mb-6">{c.choose.lead}</p>
                <ul className="space-y-4 list-none pl-0">
                  {c.choose.questions.map((q, i) => (
                    <motion.li
                      key={q}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.1 * (i + 1) }}
                      viewport={{ once: true }}
                      className="flex items-start gap-3 bg-white rounded-xl border border-gray-100 shadow-sm p-4"
                    >
                      <span className="text-2xl text-coffi-purple leading-none">→</span>
                      <span className="text-j-deep-black/90">{q}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
              <div className="md:col-span-5 md:col-start-2">
                <p className="text-lg leading-relaxed text-j-deep-black/80">{c.choose.advice}</p>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="text-lg leading-relaxed text-j-deep-black/80">
                  {c.choose.habits}{" "}
                  <span className="font-medium text-coffi-purple">{c.choose.key}</span>
                </p>
              </div>
            </div>
          </AnimatedSection>

          {/* 04 - Context */}
          <AnimatedSection className="md:col-span-full" animation="fadeUp">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-10">
              <div className="md:col-span-10 md:col-start-2">
                <SectionNumber n="04" />
                <h2 className="text-3xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple leading-tight">
                  {c.context.h2}
                </h2>
              </div>
              <div className="md:col-span-5 md:col-start-2">
                <p className="text-lg leading-relaxed text-j-deep-black/80">
                  {c.context.guidesPre}
                  <Link
                    href={c.related.posts[0].href}
                    className="text-coffi-purple underline decoration-coffi-purple/30 underline-offset-4 hover:text-coffi-blue transition-colors"
                  >
                    {c.context.guidesLink}
                  </Link>
                  {c.context.guidesPost}
                </p>
              </div>
              <div className="md:col-span-5 md:col-start-7">
                <p className="text-lg leading-relaxed text-j-deep-black/80">{c.context.friction}</p>
              </div>
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: EASE }}
                viewport={{ once: true, margin: "-80px" }}
                className="md:col-span-10 md:col-start-2 rounded-2xl bg-gradient-to-br from-coffi-purple to-coffi-blue p-6 md:p-12 shadow-md shadow-coffi-purple/30"
              >
                <p className="text-lg md:text-2xl font-light leading-relaxed text-white">
                  <a href={COFFI_APP_URL} className="font-bold underline decoration-white/40 underline-offset-4">
                    {c.context.coffiName}
                  </a>
                  {c.context.coffiRest}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Closing + sign-off + CTA */}
          <AnimatedSection className="md:col-span-full text-center mt-8 relative" animation="fadeIn">
            <p className="text-2xl md:text-4xl font-bold max-w-4xl mx-auto mb-12 leading-snug">{c.closing}</p>

            <div className="flex flex-row flex-nowrap items-center justify-center mb-10">
              <Image src="/assets/images/coffi-logo.png" alt="Coffi Logo" width={51} height={51} className="object-cover" />
              <p className="ml-3 text-2xl md:text-3xl font-extralight text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                {c.signoff}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: EASE }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6"
            >
              <SimpleButton
                text={t("mainContent.concluding.buttonExplore")}
                action={() => window.open(COFFI_APP_URL, "_blank")}
              />
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

          {/* Related posts */}
          <AnimatedSection className="md:col-span-10 md:col-start-2" animation="fadeUp">
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-6 block">{c.related.label}</span>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {c.related.posts.map((p) => (
                <Link
                  key={p.href}
                  href={p.href}
                  className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 p-6 flex flex-col justify-between gap-4"
                >
                  <span className="text-lg md:text-xl font-bold text-j-deep-black group-hover:text-coffi-purple transition-colors leading-tight">
                    {p.title}
                  </span>
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
