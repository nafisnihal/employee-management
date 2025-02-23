"use client";

import Card from "@/components/card/Card";

export default function Page() {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
      {new Array(10).fill(0).map((_, i) => (
        <div key={i}>
          <Card />
        </div>
      ))}
    </div>
  );
}
