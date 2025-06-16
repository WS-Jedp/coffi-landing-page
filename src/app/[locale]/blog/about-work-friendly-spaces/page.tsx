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

export default function WorkFriendlySpacesPage() {
  const locale = useLocale();
  const t = useTranslations("blogWorkFriendlySpaces");
  const { ref: sectionRef, scrollY } = useParallax();

  // Blog post data for SEO
  const blogData = {
    slug: "about-work-friendly-spaces",
    title: {
      en: "Understanding Work-Friendly Spaces: The Future of Productive Environments",
      es: "Entendiendo los Espacios de Trabajo Amigables: El Futuro de los Ambientes Productivos"
    },
    description: {
      en: "Discover what makes a space truly work-friendly. Learn about the evolution from traditional coworking to flexible, productive environments in Medellín's digital nomad community.",
      es: "Descubre qué hace que un espacio sea verdaderamente amigable para el trabajo. Aprende sobre la evolución del coworking tradicional a ambientes productivos flexibles en la comunidad de nómadas digitales de Medellín."
    },
    keywords: {
      en: [
        "work-friendly spaces",
        "coworking spaces Medellín", 
        "digital nomad workspace",
        "productive environments",
        "remote work Medellín"
      ],
      es: [
        "espacios de trabajo amigables",
        "coworking Medellín",
        "espacios nómadas digitales", 
        "ambientes productivos",
        "trabajo remoto Medellín"
      ]
    },
    publishDate: "2024-12-16",
    lastModified: "2024-12-16",
    readingTime: "8 min read",
    category: "Workspace Guide",
    author: {
      name: "Coffi Team",
      url: "https://coffi.com.co/about-us"
    }
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
            className="text-6xl md:text-8xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple mb-12"
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

          {/* What Are Work-Friendly Spaces Section */}
          <AnimatedSection
            className="md:col-span-full flex flex-col mb-16"
            animation="fadeUp"
          >
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-8 gap-y-8">
              {/* Section Header */}
              <div className="md:col-span-4 md:col-start-2">
                <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
                  {t("mainContent.definition.sectionTitle")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-j-deep-black">
                  {t("mainContent.definition.title").split("Work-Friendly")[0]}
                  <br />
                  <span className="text-coffi-purple">{t("mainContent.definition.title").split("What Are ")[1]}</span>
                </h2>
              </div>

              {/* Main Content */}
              <div className="md:col-span-5 md:col-start-7">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl md:text-2xl font-light leading-relaxed">
                    {t("mainContent.definition.mainContent")}
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
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.definition.features.wifi.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.definition.features.wifi.description")}
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
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.definition.features.comfort.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.definition.features.comfort.description")}
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
                  <h3 className="text-2xl font-medium mb-4">{t("mainContent.definition.features.ambiance.title")}</h3>
                  <p className="text-j-deep-black/80 leading-relaxed">
                    {t("mainContent.definition.features.ambiance.description")}
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
                    &quot;{t("mainContent.definition.pullQuote")}&quot;
                  </p>
                </motion.blockquote>
              </div>
            </div>
          </AnimatedSection>

          {/* Decentralization Section */}
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
                {t("mainContent.decentralization.sectionTitle")}
              </motion.span>
              <motion.h2 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-4xl font-bold mb-6"
              >
                {t("mainContent.decentralization.title")}
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
                {t("mainContent.decentralization.description")}
              </p>
            </motion.div>
          </AnimatedSection>

          {/* Why Moving Away from Traditional Coworking */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              {t("mainContent.traditional.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
              {t("mainContent.traditional.title")}
            </h3>

            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">{t("mainContent.traditional.issues.cost.title")}</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.traditional.issues.cost.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">{t("mainContent.traditional.issues.ambiance.title")}</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.traditional.issues.ambiance.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-semibold mb-2">{t("mainContent.traditional.issues.location.title")}</h4>
                <p className="text-j-deep-black/80 leading-relaxed">
                  {t("mainContent.traditional.issues.location.description")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Ideal Work-Friendly Space Features */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="fadeUp"
            delay={0.2}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              {t("mainContent.ideal.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.ideal.title").split("Ideal")[0]} <span className="text-coffi-purple">{t("mainContent.ideal.title").split("Features of the ")[1]}</span>
            </h3>

            <div className="prose prose-lg max-w-none">
              <p>
                {t("mainContent.ideal.introduction")}
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
                  <span>{t("mainContent.ideal.features.internet")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.ideal.features.comfort")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.ideal.features.outlets")}</span>
                </motion.li>
                <motion.li
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  viewport={{ once: true }}
                  className="flex items-start"
                >
                  <span className="text-2xl text-coffi-purple mr-3">→</span>
                  <span>{t("mainContent.ideal.features.noise")}</span>
                </motion.li>
              </ul>
            </div>
          </AnimatedSection>

          {/* Coworking 2.0 - Coffi's Vision */}
          <AnimatedSection
            className="md:col-span-4 flex flex-col"
            animation="slideIn"
            delay={0.4}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3">
              {t("mainContent.coffiVision.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.coffiVision.title").split("2.0")[0]}<span className="text-coffi-purple">{t("mainContent.coffiVision.title").split("Coworking ")[1]}</span>
            </h3>

            <div className="prose prose-lg max-w-none">
              <p>
                {t("mainContent.coffiVision.mainContent")}
              </p>

              <p>
                {t("mainContent.coffiVision.secondaryContent")}
              </p>
            </div>
          </AnimatedSection>

          {/* Coffi Platform Features Section */}
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
                  {t("mainContent.platformFeatures.sectionTitle")}
                </span>
                <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-br from-coffi-blue to-coffi-purple">
                  {t("mainContent.platformFeatures.title")}
                </h2>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                viewport={{ once: true }}
                className="md:col-span-5 md:col-start-7 flex items-end"
              >
                <p className="text-xl md:text-2xl font-light text-j-deep-black/80 italic">
                  {t("mainContent.platformFeatures.subtitle")}
                </p>
              </motion.div>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
              <AnimatedSection
                className="md:col-span-6 md:col-start-2"
                animation="fadeUp"
              >
                <p className="text-lg md:text-xl leading-relaxed mb-8">
                  <span className="text-3xl text-coffi-purple font-light leading-tight block mb-4">
                    {t("mainContent.platformFeatures.mainContent").split(" users can:")[0]}
                  </span>
                  {t("mainContent.platformFeatures.mainContent").split("With Coffi, ")[1]}
                </p>

                <p className="text-lg leading-relaxed mb-6">
                  {t("mainContent.platformFeatures.secondaryContent")}
                </p>
              </AnimatedSection>

              <AnimatedSection
                className="md:col-span-3 md:col-start-9 flex flex-col justify-start"
                animation="slideIn"
                delay={0.2}
              >
                <div className="border-l-2 border-coffi-purple/30 pl-6 mb-8">
                  <h4 className="text-xl font-medium mb-2">{t("mainContent.platformFeatures.discover.title")}</h4>
                  <p className="text-j-deep-black/80">
                    {t("mainContent.platformFeatures.discover.description")}
                  </p>
                </div>

                <div className="border-l-2 border-coffi-purple/30 pl-6 mb-8">
                  <h4 className="text-xl font-medium mb-2">{t("mainContent.platformFeatures.filter.title")}</h4>
                  <p className="text-j-deep-black/80">
                    {t("mainContent.platformFeatures.filter.description")}
                  </p>
                </div>

                <div className="border-l-2 border-coffi-purple/30 pl-6">
                  <h4 className="text-xl font-medium mb-2">{t("mainContent.platformFeatures.realTime.title")}</h4>
                  <p className="text-j-deep-black/80">
                    {t("mainContent.platformFeatures.realTime.description")}
                  </p>
                </div>
              </AnimatedSection>

              <AnimatedSection
                className="md:col-span-8 md:col-start-3 text-2xl md:text-3xl font-light text-coffi-purple/80 italic text-center border-t border-b border-coffi-purple/10 py-12 my-8"
                animation="fadeIn"
                delay={0.3}
              >
                <blockquote>
                  &quot;{t("mainContent.platformFeatures.quote")}&quot;
                </blockquote>
              </AnimatedSection>
            </div>

            {/* Bottom divider */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent mt-16"></div>
          </AnimatedSection>

          {/* Why Decentralization Matters */}
          <AnimatedSection className="md:col-span-6" animation="fadeUp">
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
              {t("mainContent.whyDecentralization.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.whyDecentralization.title").split("Matters")[0]} <span className="text-coffi-purple">{t("mainContent.whyDecentralization.title").split("Why Decentralization ")[1]}</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">{t("mainContent.whyDecentralization.benefits.economic.title")}</h4>
                <p className="text-j-deep-black/80">
                  {t("mainContent.whyDecentralization.benefits.economic.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">{t("mainContent.whyDecentralization.benefits.environmental.title")}</h4>
                <p className="text-j-deep-black/80">
                  {t("mainContent.whyDecentralization.benefits.environmental.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">{t("mainContent.whyDecentralization.benefits.satisfaction.title")}</h4>
                <p className="text-j-deep-black/80">
                  {t("mainContent.whyDecentralization.benefits.satisfaction.description")}
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="border-l-2 border-coffi-purple/30 pl-4"
              >
                <h4 className="font-semibold text-xl mb-2">{t("mainContent.whyDecentralization.benefits.talent.title")}</h4>
                <p className="text-j-deep-black/80">
                  {t("mainContent.whyDecentralization.benefits.talent.description")}
                </p>
              </motion.div>
            </div>
          </AnimatedSection>

          {/* Future of Remote Work */}
          <AnimatedSection
            className="md:col-span-6"
            animation="fadeUp"
            delay={0.2}
          >
            <span className="text-sm uppercase tracking-widest text-coffi-purple/60 mb-3 block">
              {t("mainContent.futureWork.sectionTitle")}
            </span>
            <h3 className="text-3xl font-bold mb-8">
              {t("mainContent.futureWork.title").split("Future")[0]} <span className="text-coffi-purple">{t("mainContent.futureWork.title").split("The ")[1]}</span>
            </h3>

            <div className="space-y-6 prose prose-lg max-w-none">
              <p>
                {t("mainContent.futureWork.description")}
              </p>

              <p className="text-xl font-medium text-coffi-purple/90">
                {t("mainContent.futureWork.callout")}
              </p>
            </div>
          </AnimatedSection>

          {/* Concluding Section */}
          <AnimatedSection
            className="md:col-span-full text-center mt-24 relative"
            animation="fadeIn"
          >
            <div className="absolute -top-40 left-0 right-0 h-px bg-gradient-to-r from-transparent via-coffi-purple/20 to-transparent"></div>

            <h2 className="text-4xl md:text-6xl font-bold mb-8 max-w-4xl mx-auto">
              {t("mainContent.concluding.title.0")} <span className="text-coffi-purple">{t("mainContent.concluding.title.1")}</span> {t("mainContent.concluding.title.2")} <span className="text-coffi-blue">{t("mainContent.concluding.title.3")}</span>
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
