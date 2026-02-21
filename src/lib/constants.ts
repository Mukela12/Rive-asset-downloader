export const FEATURES = [
  {
    title: "Preview",
    description: "See your Rive animation playing live and interact with it directly in the browser.",
    iconId: "preview" as const,
  },
  {
    title: "Inspect",
    description: "Browse artboards, animations, state machines, and their inputs in a structured tree.",
    iconId: "inspect" as const,
  },
  {
    title: "Export",
    description: "Download individual assets or everything at once as a neatly organized ZIP archive.",
    iconId: "export" as const,
  },
] as const;
