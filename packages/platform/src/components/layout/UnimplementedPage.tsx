type Props = {
  title: string;
  group: string;
  onHome: () => void;
  onHelp: () => void;
};

export default function FernPage({ title, group, onHome, onHelp }: Props) {
  return (
    <section className="rounded-xl border bg-white p-6" aria-labelledby="unavailable-page-title" style={{ borderColor: "#dce3ed" }}>
      <p className="mb-2 text-sm" style={{ color: "#526176" }}>{group}</p>
      <h1 id="unavailable-page-title" className="mb-4 text-2xl font-bold" style={{ color: "#0d2464" }}>{title}</h1>
      <p className="mb-2 font-semibold" style={{ color: "#183454" }}>Not available</p>
      <p className="mb-6" style={{ color: "#526176", maxWidth: "60ch" }}>
        This page is not available in this version of FERN. You can return to the homepage or explore Help &amp; Guidance.
      </p>
      <div className="flex flex-wrap gap-3">
        <button type="button" onClick={onHome} className="rounded-lg bg-blue-700 px-5 py-3 font-semibold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Return to Home</button>
        <button type="button" onClick={onHelp} className="rounded-lg border border-blue-700 px-5 py-3 font-semibold text-blue-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2">Help &amp; Guidance</button>
      </div>
    </section>
  );
}
