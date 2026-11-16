export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="border-b border-base-300 bg-base-200/60">
      <div className="mx-auto max-w-7xl px-4 py-12 text-center sm:px-6">
        <h1 className="text-4xl font-semibold">{title}</h1>
        {subtitle && <p className="mt-2 text-base-content/70">{subtitle}</p>}
      </div>
    </section>
  );
}