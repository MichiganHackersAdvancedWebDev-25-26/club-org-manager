"use client";

import { Faq } from "@/components/FAQ";
import { Feature } from "@/components/feature";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

// Animated gradient blob component
function AnimatedBlob({
  className,
  delay = 0,
}: {
  className: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      animate={{
        scale: [1, 1.2, 1],
        x: [0, 30, 0],
        y: [0, -20, 0],
        rotate: [0, 90, 0],
      }}
      transition={{
        duration: 20,
        repeat: Infinity,
        delay,
        ease: "easeInOut",
      }}
    />
  );
}

// Floating particles effect
function FloatingParticle({ delay, size }: { delay: number; size: number }) {
  const randomX = Math.random() * 100;
  const randomDuration = 15 + Math.random() * 10;

  return (
    <motion.div
      className="absolute rounded-full bg-gradient-to-br from-indigo-400/20 to-purple-400/20 backdrop-blur-sm"
      style={{
        width: size,
        height: size,
        left: `${randomX}%`,
        bottom: -50,
      }}
      animate={{
        y: [0, -800],
        x: [0, Math.sin(randomX) * 100],
        opacity: [0, 1, 0],
      }}
      transition={{
        duration: randomDuration,
        repeat: Infinity,
        delay,
        ease: "linear",
      }}
    />
  );
}

// Stats counter animation
function AnimatedCounter({ target, label }: { target: number; label: string }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += target / steps;
      if (current >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [target]);

  return (
    <div className="text-center">
      <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
        {count}+
      </div>
      <div className="text-muted-foreground mt-2 text-lg">{label}</div>
    </div>
  );
}

// Word rotation animation
const words = ["community", "passion", "friendships", "future"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="inline-block overflow-hidden h-[1.2em] align-bottom">
      <motion.span
        key={words[index]}
        className="inline-block bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent"
        initial={{ y: "100%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-100%", opacity: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        {words[index]}
      </motion.span>
    </span>
  );
}

export default function Home() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <main className="min-h-screen overflow-hidden">
      {/* Hero Section with Animated Background */}
      <section className="relative min-h-[90vh] flex items-center justify-center px-4 sm:px-8">
        {/* Animated gradient background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background" />
          <AnimatedBlob
            className="absolute -top-40 -left-40 w-96 h-96 bg-gradient-to-br from-indigo-500/30 to-purple-500/30 rounded-full blur-3xl"
            delay={0}
          />
          <AnimatedBlob
            className="absolute -bottom-40 -right-40 w-96 h-96 bg-gradient-to-br from-purple-500/30 to-fuchsia-500/30 rounded-full blur-3xl"
            delay={5}
          />
          <AnimatedBlob
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-br from-indigo-500/10 to-fuchsia-500/10 rounded-full blur-3xl"
            delay={10}
          />

          {/* Floating particles */}
          {[...Array(8)].map((_, i) => (
            <FloatingParticle key={i} delay={i * 2} size={8 + i * 4} />
          ))}

          {/* Grid pattern overlay */}
          <div
            className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05]"
            style={{
              backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-10 w-full max-w-4xl mx-auto text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-6">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 text-sm font-medium text-indigo-600 dark:text-indigo-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              Now open for all campus clubs
            </span>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight leading-[1.15] mb-6"
          >
            <span className="block sm:inline">Discover your </span>
            <RotatingWord />
            <span className="block sm:inline"> on campus</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10"
          >
            Connect with like-minded students, explore new interests, and build
            lasting friendships through our vibrant club ecosystem.
          </motion.p>

          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button
              asChild
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white border-0 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300"
            >
              <Link href="/login">
                <span className="relative z-10">Get Started</span>
                <motion.span
                  className="absolute inset-0 bg-gradient-to-r from-fuchsia-500 via-purple-500 to-indigo-500"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 hover:bg-accent/50 transition-all duration-300"
            >
              <Link href="/org">Explore Clubs</Link>
            </Button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
          >
            <motion.div
              className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex items-start justify-center p-2"
              animate={{ y: [0, 5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <motion.div
                className="w-1.5 h-1.5 bg-muted-foreground/50 rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <motion.section
        className="py-20 px-4 sm:px-8 bg-gradient-to-b from-background to-muted/30"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-8">
          <AnimatedCounter target={150} label="Active Clubs" />
          <AnimatedCounter target={5000} label="Members" />
          <AnimatedCounter target={300} label="Events Monthly" />
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="py-24 px-4 sm:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Feature className="mx-auto max-w-4xl" />
      </motion.section>

      {/* FAQ Section */}
      <motion.section
        className="py-24 px-4 sm:px-8 bg-gradient-to-b from-muted/30 to-background"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <Faq className="mx-auto max-w-3xl" />
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-24 px-4 sm:px-8 relative overflow-hidden"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-fuchsia-500/5" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
            Ready to join the{" "}
            <span className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 bg-clip-text text-transparent">
              community
            </span>
            ?
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Start managing your club or discover new ones to join today.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-fuchsia-500 text-white border-0 shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300"
          >
            <Link href="/login">Get Started Now</Link>
          </Button>
        </div>
      </motion.section>
    </main>
  );
}
