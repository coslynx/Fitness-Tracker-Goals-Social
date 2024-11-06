"use client";

import { Metadata } from "next";
import Hero from "@/components/features/Hero";
import Features from "@/components/features/Features";
import CallToAction from "@/components/features/CallToAction";

export default function HomePage() {
  return (
    <main className="container mx-auto">
      <Hero />
      <Features />
      <CallToAction />
    </main>
  );
}

export const metadata = {
  title: "Fitness Tracker",
  description: "Track your fitness goals and progress",
};