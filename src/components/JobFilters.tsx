"use client";

import { cn } from "cn";
import { SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export type JobFilterGroup = {
  id: string; // also used as the URL param name, e.g. ?type=Remote&type=Contract
  title: string;
  options: string[];
};

type JobFiltersProps = {
  groups: JobFilterGroup[];
};

const JobFilters = ({ groups }: JobFiltersProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [mobileOpen, setMobileOpen] = useState(false);

  const isSelected = (groupId: string, option: string) =>
    searchParams.getAll(groupId).includes(option);

  const toggleOption = (groupId: string, option: string, checked: boolean) => {
    // copy current params so `search` and other filters are preserved
    const params = new URLSearchParams(searchParams.toString());

    const values = params.getAll(groupId).filter((value) => value !== option);
    if (checked) values.push(option);

    params.delete(groupId);
    for (const value of values) params.append(groupId, value);

    // reset pagination when filters change
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());
    for (const group of groups) params.delete(group.id);
    params.delete("page");

    const queryString = params.toString();
    router.push(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  const activeFilterCount = groups.reduce(
    (total, group) => total + searchParams.getAll(group.id).length,
    0,
  );

  return (
    <div>
      <button
        type="button"
        onClick={() => setMobileOpen((open) => !open)}
        className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm font-medium text-white transition-colors hover:bg-white/[0.07] lg:hidden"
      >
        <span className="flex items-center gap-2">
          <SlidersHorizontal className="size-4 text-white/60" />
          Filters
        </span>
        {activeFilterCount > 0 ? (
          <Badge
            variant="outline"
            className="border-white/10 bg-white/[0.06] text-white/80"
          >
            {activeFilterCount}
          </Badge>
        ) : null}
      </button>

      <aside
        className={cn(
          "rounded-2xl border border-white/10 bg-white/[0.04] p-5 lg:block lg:sticky lg:top-24 lg:self-start",
          !mobileOpen && "hidden",
        )}
      >
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-white">Filters</h2>
          {activeFilterCount > 0 ? (
            <button
              type="button"
              onClick={clearFilters}
              className="text-xs text-white/50 transition-colors hover:text-white"
            >
              Clear all
            </button>
          ) : null}
        </div>

        <div className="mt-5 flex flex-col gap-6">
          {groups.map((group) => (
            <div key={group.id}>
              <h3 className="text-sm font-semibold text-white">
                {group.title}
              </h3>
              <div className="mt-3.5 flex flex-col gap-2.5">
                {group.options.map((option) => {
                  const checkboxId = `${group.id}-${option}`;

                  return (
                    <label
                      key={checkboxId}
                      htmlFor={checkboxId}
                      className="flex cursor-pointer items-center gap-2.5"
                    >
                      <Checkbox
                        id={checkboxId}
                        checked={isSelected(group.id, option)}
                        onCheckedChange={(checked) =>
                          toggleOption(group.id, option, checked === true)
                        }
                      />
                      <span className="text-sm text-white/70">{option}</span>
                    </label>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
};

export default JobFilters;