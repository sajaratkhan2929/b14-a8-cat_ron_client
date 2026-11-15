export default function Spinner({ label = "Loading" }: { label?: string }) {
  return (
    <div
      className="flex min-h-[50vh] items-center justify-center"
      role="status"
      aria-label={label}
    >
      <span className="loading loading-spinner loading-lg text-primary" />
    </div>
  );
}