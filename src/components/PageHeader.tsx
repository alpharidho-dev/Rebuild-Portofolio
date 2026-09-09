import { Reveal } from "@/components/Reveal";

/**
 * Header halaman sub-route, mengikuti pola SectionHeader di Sections.tsx:
 * komentar "// index", judul besar, hint kecil di kanan.
 */
export function PageHeader({
  index,
  title,
  hint,
}: {
  index: string;
  title: string;
  hint: string;
}) {
  return (
    <Reveal>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-xs text-neutral-500">{`// ${index}`}</p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-white md:text-3xl">
            {title}
          </h1>
        </div>
        <span className="text-xs text-neutral-600">{hint}</span>
      </div>
    </Reveal>
  );
}
