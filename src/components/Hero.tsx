import { FEATURES } from "@/lib/constants";
import FeatureCard from "./FeatureCard";
import ScrollToTool from "./ScrollToTool";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20">
      {/* Grid background */}
      <div className="hero-grid hero-grid-fade pointer-events-none absolute inset-0" />

      {/* Radial glow */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: 800,
          height: 600,
          background: "radial-gradient(ellipse, rgba(255,164,28,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-4xl text-center">
        <div className="animate-fade-in mb-6">
          <span className="inline-block rounded-full border border-rive-border bg-rive-surface px-4 py-1.5 text-xs font-medium tracking-wide text-rive-text-secondary">
            100% client-side &middot; No uploads &middot; Free forever
          </span>
        </div>

        <h1 className="animate-slide-up mb-5 text-4xl font-bold tracking-tight text-rive-text sm:text-5xl md:text-6xl">
          Rive Asset{" "}
          <span className="text-rive-accent">Exporter</span>
        </h1>

        <p className="animate-slide-up-delay mx-auto mb-14 max-w-xl text-base leading-relaxed text-rive-text-secondary md:text-lg">
          Extract images, fonts, and audio from your Rive files instantly.
          Preview animations, inspect structure, and export assets.
        </p>

        <div className="animate-slide-up-delay mb-14 grid grid-cols-1 gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <FeatureCard key={feature.title} {...feature} />
          ))}
        </div>

        <div className="animate-slide-up-delay-2">
          <ScrollToTool />
        </div>
      </div>
    </section>
  );
}
