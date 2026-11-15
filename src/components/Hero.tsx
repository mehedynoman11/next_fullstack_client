"use client";

import { MapPin, Search, Sparkles } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import globe from "../assets/globe.png";

const TRENDING = ["Product Designer", "AI Engineering", "DevOps Engineer"];

const STARS = [
  "radial-gradient(1.5px 1.5px at 14% 32%, rgba(255,255,255,0.75), transparent)",
  "radial-gradient(1px 1px at 28% 18%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1.5px 1.5px at 41% 51%, rgba(255,255,255,0.45), transparent)",
  "radial-gradient(1px 1px at 57% 24%, rgba(255,255,255,0.6), transparent)",
  "radial-gradient(1.5px 1.5px at 68% 44%, rgba(255,255,255,0.5), transparent)",
  "radial-gradient(1px 1px at 79% 16%, rgba(255,255,255,0.4), transparent)",
  "radial-gradient(1.5px 1.5px at 88% 36%, rgba(255,255,255,0.55), transparent)",
].join(", ");

const Hero = () => {
  const [query, setQuery] = useState("");
  const [location, setLocation] = useState("");

  return (
    <header className="relative isolate overflow-hidden bg-[#07070c] text-white">
      {/* Star field + purple glow behind the content */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[75%] opacity-50"
        style={{ backgroundImage: STARS }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70%] bg-[radial-gradient(60%_55%_at_50%_35%,rgba(109,93,246,0.16),transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-3xl px-4 pt-14 pb-[210px] text-center sm:pt-20 sm:pb-[230px] lg:pb-[18vw]">
        {/* Availability pill */}
        <div className="flex items-center justify-center gap-3">
          <span className="hidden h-px w-20 bg-gradient-to-r from-transparent to-white/25 sm:block" />
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-4 py-1.5 backdrop-blur">
            <Sparkles className="size-3.5 text-amber-400" />
            <span className="text-sm font-bold tracking-tight">50,000+</span>
            <span className="text-[10px] font-medium tracking-[0.18em] text-white/55 uppercase sm:text-[11px]">
              New jobs this month
            </span>
          </span>
          <span className="hidden h-px w-20 bg-gradient-to-l from-transparent to-white/25 sm:block" />
        </div>

        <h1 className="mt-6 text-4xl font-bold tracking-tight text-balance sm:mt-7 sm:text-5xl lg:text-[56px] lg:leading-[1.15]">
          Find Your Dream Job Today
        </h1>

        <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-balance text-white/55 sm:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        {/* Search */}
        <form
          action="/jobs"
          className="mx-auto mt-8 flex w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-white/[0.05] p-1.5 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.9)] backdrop-blur sm:flex-row sm:items-center"
        >
          <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-white/[0.04]">
            <Search className="size-[18px] shrink-0 text-white/40" />
            <input
              type="text"
              name="q"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </label>

          <span className="mx-3 h-px shrink-0 bg-white/10 sm:hidden" />
          <span className="mx-1 hidden h-7 w-px shrink-0 bg-white/10 sm:block" />

          <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-white/[0.04]">
            <MapPin className="size-[18px] shrink-0 text-white/40" />
            <input
              type="text"
              name="location"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="w-full min-w-0 bg-transparent text-sm text-white outline-none placeholder:text-white/35"
            />
          </label>

          <button
            type="submit"
            className="mt-1.5 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6d5df6] text-sm font-medium text-white transition-colors hover:bg-[#5c4ce8] focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none sm:mt-0 sm:size-11 sm:shrink-0 sm:gap-0"
          >
            <Search className="size-[18px]" />
            <span className="sm:sr-only">Search</span>
          </button>
        </form>

        {/* Trending roles */}
        <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
          <span className="text-xs text-white/45 sm:text-[13px]">
            Trending Position
          </span>
          {TRENDING.map((role) => (
            <button
              key={role}
              type="button"
              onClick={() => setQuery(role)}
              className={`rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors sm:text-[13px] ${
                query === role
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              }`}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Globe: only the top of the dome plus the star band above it is visible */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 overflow-hidden"
      >
        <div className="relative mx-auto h-[160px] w-full sm:h-[300px] ">
          <Image
            src={globe}
            alt=""
            width={1440}
            height={1882}
            priority
            sizes="(min-width: 1024px) 78vw, (min-width: 640px) 760px, 560px"
            className="absolute top-0 left-1/2 h-auto max-w-none -translate-x-1/2 -translate-y-[36%] w-[560px] sm:w-[760px] lg:w-[78vw]"
          />
          <div className="absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-[#07070c] to-transparent" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
