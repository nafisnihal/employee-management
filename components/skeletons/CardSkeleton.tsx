export default function CardSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 px-6 mt-4">
      {new Array(12).fill(0).map((_, i) => (
        <div
          key={i}
          className="w-[320px] h-[400px] rounded-xl bg-muted/50 animate-pulse my-4"
        />
      ))}
    </div>
  );
}
