"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Instagram, ArrowLeft } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useParallax } from "@/common/hooks/useParallax";
import { AnimatedSection } from "@/components/animatedSection";
import { SimpleButton } from "@/components/buttons";
import BlogStructuredData from "@/components/BlogStructuredData";

export default function BestCafesAndWorkFriendlySpacesInMedellin() {
  const locale = useLocale();
  const t = useTranslations("blogBestCafesAndWorkFriendlySpaces");
  const { ref: sectionRef, scrollY } = useParallax();

  // Blog post data for SEO
  const blogData = {
    slug: "best-cafes-and-workfriendly-spaces-in-medellin",
    title: {
      en: "Best Cafes and Work-Friendly Spaces in Medellín (2025 Digital Nomad Guide)",
      es: "Mejores Cafés y Espacios de Trabajo en Medellín (Guía Nómada Digital 2025)"
    },
    description: {
      en: "Discover the best work-friendly cafes and spaces in Medellín for digital nomads. From cozy cafes in Poblado to mountain workspaces in Santa Elena - find your perfect productive spot.",
      es: "Descubre los mejores cafés y espacios de trabajo en Medellín para nómadas digitales. Desde cafés acogedores en Poblado hasta espacios en las montañas de Santa Elena - encuentra tu lugar productivo perfecto."
    },
    keywords: {
      en: [
        "best cafes Medellín",
        "work-friendly spaces Medellín",
        "digital nomad Medellín",
        "coworking Medellín",
        "remote work Medellín",
        "cafes with wifi Medellín",
        "El Poblado cafes",
        "Laureles coworking",
        "Manila workspace",
        "Santa Elena work spots",
        "General Bar Café",
        "Mil Nueve 32",
        "Café Dragón",
        "Bukz library",
        "Monteluna workspace",
        "laptop-friendly cafes",
        "coffee shops for work",
        "productive environments",
        "Colombia digital nomads",
        "Coffi workspace finder"
      ],
      es: [
        "mejores cafés Medellín",
        "espacios de trabajo Medellín",
        "nómada digital Medellín",
        "coworking Medellín",
        "trabajo remoto Medellín",
        "cafés con wifi Medellín",
        "cafés El Poblado",
        "coworking Laureles",
        "workspace Manila",
        "espacios trabajo Santa Elena",
        "General Bar Café",
        "Mil Nueve 32",
        "Café Dragón",
        "biblioteca Bukz",
        "espacio Monteluna",
        "cafés laptop-friendly",
        "cafeterías para trabajar",
        "ambientes productivos",
        "nómadas digitales Colombia",
        "Coffi buscador espacios"
      ]
    },
    publishDate: "2025-06-16",
    lastModified: "2025-06-16",
    readingTime: "6 min read",
    category: "City Guide",
    author: {
      name: "Coffi Team",
      url: "https://coffi.com.co/about-us"
    },
    image: "/assets/images/blog/best-cafes-medellin-hero.jpg",
    tags: ["cafes", "coworking", "digital nomad", "Medellín", "productivity"]
  };

  return (
    <>
      {/* SEO Structured Data */}
      <BlogStructuredData blogData={blogData} locale={locale} />
      
      <section
        ref={sectionRef}
        className="relative w-full flex flex-col justify-start bg-coffi-white min-h-screen"
      >
      {/* Navigation */}
      <Link
        href={`/${locale}/blog`}
        className="absolute top-8 left-28 z-50 flex items-center gap-2 text-coffi-purple px-3 py-1 hover:bg-white/80 rounded-full transition-all duration-300 backdrop-blur-sm"
      >
        <ArrowLeft size={16} />
        <span className="font-medium">{t("navigation.back")}</span>
      </Link>

      {/* Hero Section */}
      <header className="w-full h-[90vh] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/60 to-white"
            style={{
              opacity: `${0.3 + scrollY * 0.001}`,
            }}
          ></div>

          {/* Mesh gradient background */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute top-1/4 left-1/4 w-1/2 h-1/2 rounded-full bg-coffi-purple/30 blur-[100px]"
              style={{
                transform: `translate(${scrollY * 0.03}px, ${-scrollY * 0.01}px)`,
              }}
            />
            <div
              className="absolute top-2/3 right-1/3 w-1/3 h-1/3 rounded-full bg-coffi-blue/20 blur-[100px]"
              style={{
                transform: `translate(${-scrollY * 0.02}px, ${scrollY * 0.02}px)`,
              }}
            />
          </div>
        </div>

        <div className="container mx-auto px-6 relative z-10 flex flex-col items-center">
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
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
              <h2 className="font-black text-3xl">Coffi</h2>
              <h3 className="font-extralight text-sm mt-[-2px]">
                Be Where You Thrive
              </h3>
            </div>
          </motion.article>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translateY(${scrollY * 0.2}px) scale(${1 - scrollY * 0.0003})`,
              opacity: `${1 - scrollY * 0.2}`,
              letterSpacing: `${Math.min(scrollY * 0.03, 15)}px`,
            }}
            className="text-5xl md:text-7xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-12"
          >
            {t("hero.title")}
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              transform: `translateY(${scrollY * 0.05}px)`,
              opacity: `${1 - scrollY * 0.0008}`,
            }}
            className="max-w-2xl text-center text-xl md:text-2xl font-light leading-relaxed text-j-deep-black/90"
          >
            {t("hero.description")}
          </motion.p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 md:px-12 pb-32 relative">
        {/* Tech line decorations */}
        <div className="absolute left-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>
        <div className="absolute right-0 top-0 h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/10 to-transparent opacity-70"></div>

        {/* Content sections */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-24 mt-16">
          {/* Large Quote */}
          <AnimatedSection className="md:col-span-full" animation="fadeIn">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-24"></div>
            <blockquote className="text-3xl md:text-5xl text-coffi-purple/80 font-light italic text-center max-w-4xl mx-auto">
              &ldquo;{t("mainContent.quote")}&rdquo;
            </blockquote>
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-24"></div>
          </AnimatedSection>

          {/* What Makes a Great Work-Friendly Spot Section */}
          <AnimatedSection
            className="md:col-span-full flex flex-col mb-16"
            animation="fadeUp"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
              {/* Section Header */}
              <div className="md:col-span-4 md:col-start-2">
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("mainContent.whatMakes.sectionTitle")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-j-deep-black">
                  {t("mainContent.whatMakes.title").split("Work-Friendly")[0]}
                  <br />
                  <span className="text-coffi-purple">{t("mainContent.whatMakes.title").split("Great ")[1]}</span>
                </h2>
              </div>

              {/* Main Content */}
              <div className="md:col-span-5 md:col-start-7">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl md:text-2xl font-light leading-relaxed">
                    {t("mainContent.whatMakes.mainContent")}
                  </p>
                </div>
              </div>

              {/* Feature Points */}
              <div className="md:col-span-3 md:col-start-2 relative">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/30 to-transparent absolute right-0 top-0"></div>
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    01
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.whatMakes.features.wifi.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.whatMakes.features.wifi.description")}
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 relative">
                <div className="h-full w-px bg-gradient-to-b from-transparent via-coffi-purple/30 to-transparent absolute right-0 top-0"></div>
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    02
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.whatMakes.features.comfort.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.whatMakes.features.comfort.description")}
                  </p>
                </div>
              </div>

              <div className="md:col-span-3 md:col-start-8 relative">
                <div className="pr-8">
                  <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="text-6xl font-black text-coffi-purple/10 block mb-4"
                  >
                    03
                  </motion.span>
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.whatMakes.features.ambiance.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.whatMakes.features.ambiance.description")}
                  </p>
                </div>
              </div>

              {/* Pull Quote */}
              <div className="md:col-span-8 md:col-start-3 mt-12">
                <motion.blockquote 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="border-l-4 border-coffi-purple pl-6 py-2"
                >
                  <p className="text-2xl md:text-3xl font-light text-coffi-purple/90 italic">
                    &quot;{t("mainContent.whatMakes.pullQuote")}&quot;
                  </p>
                </motion.blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Best Cafes Section */}
          <AnimatedSection
            className="md:col-span-full grid grid-cols-1 md:grid-cols-12 gap-8"
            animation="fadeUp"
          >
            <motion.div 
              className="md:col-span-5 md:col-start-2"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block"
              >
                {t("mainContent.bestCafes.sectionTitle")}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-6"
              >
                {t("mainContent.bestCafes.title")}
              </motion.h2>
            </motion.div>
            <motion.div 
              className="md:col-span-5 prose prose-lg max-w-none"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <p>
                {t("mainContent.bestCafes.description")}
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Cafe Listings */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
          >
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-l-4 border-coffi-purple pl-6"
              >
                <h3 className="text-2xl font-bold mb-2">{t("mainContent.bestCafes.cafes.generalBar.name")}</h3>
                <span className="text-sm text-coffi-purple/70 mb-3 block">{t("mainContent.bestCafes.cafes.generalBar.location")}</span>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.bestCafes.cafes.generalBar.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-l-4 border-coffi-purple pl-6"
              >
                <h3 className="text-2xl font-bold mb-2">{t("mainContent.bestCafes.cafes.milNueve.name")}</h3>
                <span className="text-sm text-coffi-purple/70 mb-3 block">{t("mainContent.bestCafes.cafes.milNueve.location")}</span>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.bestCafes.cafes.milNueve.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-l-4 border-coffi-purple pl-6"
              >
                <h3 className="text-2xl font-bold mb-2">{t("mainContent.bestCafes.cafes.cafeDragon.name")}</h3>
                <span className="text-sm text-coffi-purple/70 mb-3 block">{t("mainContent.bestCafes.cafes.cafeDragon.location")}</span>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.bestCafes.cafes.cafeDragon.description")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Alternative Workspaces */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="fadeUp"
            delay={0.2}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              {t("mainContent.alternatives.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.alternatives.title").split("Beyond")[0]} <span className="text-coffi-purple">{t("mainContent.alternatives.title").split("Workspaces ")[1]}</span>
            </h3>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-l-4 border-coffi-blue pl-6"
              >
                <h4 className="text-2xl font-bold mb-2">{t("mainContent.alternatives.spaces.bukz.name")}</h4>
                <span className="text-sm text-coffi-blue/70 mb-3 block">{t("mainContent.alternatives.spaces.bukz.location")}</span>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.alternatives.spaces.bukz.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-l-4 border-coffi-blue pl-6"
              >
                <h4 className="text-2xl font-bold mb-2">{t("mainContent.alternatives.spaces.lookout.name")}</h4>
                <span className="text-sm text-coffi-blue/70 mb-3 block">{t("mainContent.alternatives.spaces.lookout.location")}</span>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.alternatives.spaces.lookout.description")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* How Coffi Helps */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
            delay={0.4}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              {t("mainContent.coffiHelps.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.coffiHelps.title").split("Coffi")[0]}<span className="text-coffi-purple">{t("mainContent.coffiHelps.title").split("How ")[1]}</span>
            </h3>

            <div className="prose prose-lg max-w-none">
              <p>
                {t("mainContent.coffiHelps.mainContent")}
              </p>

              <ul className="space-y-3 list-none pl-0 mt-6">
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.coffiHelps.features.discover")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.coffiHelps.features.liveUpdates")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.coffiHelps.features.filter")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.coffiHelps.features.contribute")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.coffiHelps.features.save")}</span>
                </motion.li>
              </ul>
            </div>
          </AnimatedSection>

          {/* FAQ Section */}
          <AnimatedSection
            className="md:col-span-full mt-24 mb-32"
            animation="fadeIn"
          >
            {/* Top divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mb-16"></div>

            {/* Section Title */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 mb-16">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="md:col-span-4 md:col-start-2"
              >
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 block mb-3">
                  {t("mainContent.faq.sectionTitle")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                  {t("mainContent.faq.title")}
                </h2>
              </motion.div>
            </div>

            {/* FAQ Items */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
              <AnimatedSection
                className="md:col-span-5 md:col-start-2"
                animation="fadeUp"
              >
                <div className="space-y-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    viewport={{ once: true }}
                    className="border-b border-coffi-purple/10 pb-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-coffi-purple">{t("mainContent.faq.questions.bestCafe.question")}</h3>
                    <p className="text-j-deep-black/80 leading-relaxed">
                      {t("mainContent.faq.questions.bestCafe.answer")}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    viewport={{ once: true }}
                    className="border-b border-coffi-purple/10 pb-6"
                  >
                    <h3 className="text-xl font-semibold mb-3 text-coffi-purple">{t("mainContent.faq.questions.quietPlaces.question")}</h3>
                    <p className="text-j-deep-black/80 leading-relaxed">
                      {t("mainContent.faq.questions.quietPlaces.answer")}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                  >
                    <h3 className="text-xl font-semibold mb-3 text-coffi-purple">{t("mainContent.faq.questions.realTime.question")}</h3>
                    <p className="text-j-deep-black/80 leading-relaxed">
                      {t("mainContent.faq.questions.realTime.answer")}
                    </p>
                  </motion.div>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="md:col-span-4 md:col-start-8 text-2xl md:text-3xl font-light text-coffi-purple/80 italic flex items-center justify-center"
                animation="fadeIn"
                delay={0.3}
              >
                <blockquote className="text-center">
                  &quot;{t("mainContent.faq.quote")}&quot;
                </blockquote>
              </AnimatedSection>
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16"></div>
          </AnimatedSection>

          {/* Concluding Section */}
          <AnimatedSection
            className="md:col-span-full text-center mt-24 relative"
            animation="fadeIn"
          >
            <div className="absolute -top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent"></div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto">
              {t("mainContent.concluding.title.0")} <span className="text-coffi-purple">{t("mainContent.concluding.title.1")}</span>
            </h2>

            <p className="text-xl max-w-3xl mx-auto mb-12 text-j-deep-black/80">
              {t("mainContent.concluding.description")}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ once: true }}
              className="flex flex-wrap justify-center gap-6 mt-8"
            >
              <SimpleButton
                text={t("mainContent.concluding.buttonExplore")}
                action={() => window.open("https://coffi.com.co", "_blank")}
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
        </section>
      </main>
    </section>
    </>
  );
}
