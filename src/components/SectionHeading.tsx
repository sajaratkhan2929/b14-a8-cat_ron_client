export default function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-10 text-center">
      <h2 className="text-3xl font-semibold md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-2 text-base-content/70">{subtitle}</p>}
    </div>
  );
}