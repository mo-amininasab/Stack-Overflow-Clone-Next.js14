import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Loading = () => {
  return (
    <section>
      <h1 className="h1-bold text-dark100_light900">All Users</h1>

      <div className="mb-12 mt-11 flex flex-wrap gap-5">
        <Skeleton className="h-14 flex-1 bg-gray-200 dark:bg-gray-900" />
        <Skeleton className="h-14 w-28 bg-gray-200 dark:bg-gray-900" />
      </div>

      <div className="flex flex-wrap gap-4">
        {Array.from<number>({ length: 10 }).map((item) => (
          <Skeleton
            key={item}
            className="h-60 w-full rounded-2xl bg-gray-200 sm:w-[260px] dark:bg-gray-900"
          />
        ))}
      </div>
    </section>
  );
};

export default Loading;
