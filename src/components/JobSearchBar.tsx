"use client";

import { Search, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";

const TRENDING = ["Product Designer", "AI Engineering", "DevOps Engineer"];

const JobSearchBar = () => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  // const [location, setLocation] = useState("");
  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    // console.log(data);
    const search = data.q;
    const params = new URLSearchParams();
    params.set("search", search as string);
    router.push(`/browse-jobs?${params.toString()}`);
  };
  return (
    <div>
      <form
        onSubmit={handleSearch}
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

        {/* <label className="flex flex-1 items-center gap-2.5 rounded-xl px-3 py-2.5 transition-colors focus-within:bg-white/[0.04]">
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
        </label> */}

        <button
          type="submit"
          className="mt-1.5 flex h-11 items-center justify-center gap-2 rounded-xl bg-[#6d5df6] text-sm font-medium text-white transition-colors hover:bg-[#5c4ce8] focus-visible:ring-3 focus-visible:ring-white/40 focus-visible:outline-none sm:mt-0 sm:size-11 sm:shrink-0 sm:gap-0"
        >
          <Search className="size-[18px]" />
          <span className="sm:sr-only">Search</span>
        </button>
      </form>

      <div className="mt-7 flex flex-wrap items-center justify-center gap-2">
        <span className="flex items-center gap-1.5 text-xs text-white/45 sm:text-[13px]">
          <Sparkles className="size-3.5 text-amber-400" />
          Trending Position
        </span>
        {TRENDING.map((role) => {
          const isTrending = query === role;

          return (
            <button
              key={role}
              type="button"
              onClick={() => setQuery(role)}
              className={
                isTrending
                  ? "border-white/25 bg-white/10 text-white"
                  : "border-white/10 bg-white/[0.04] text-white/65 hover:border-white/25 hover:bg-white/[0.08] hover:text-white"
              }
            >
              {role}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default JobSearchBar;
