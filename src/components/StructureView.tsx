"use client";

interface StateMachineInput {
  name: string;
  type: number;
}

interface StateMachineContents {
  name: string;
  inputs: StateMachineInput[];
}

interface ArtboardContents {
  name: string;
  animations: string[];
  stateMachines: StateMachineContents[];
}

interface StructureViewProps {
  artboards: ArtboardContents[];
}

function inputTypeLabel(type: number): string {
  switch (type) {
    case 56:
      return "Bool";
    case 55:
      return "Num";
    case 58:
      return "Trigger";
    default:
      return `#${type}`;
  }
}

export default function StructureView({ artboards }: StructureViewProps) {
  if (artboards.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-3 text-rive-text-muted">
          <path d="M3 6h18M3 12h18M3 18h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
        <p className="text-sm text-rive-text-muted">No structure data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-0.5 p-3 font-mono text-xs">
      {artboards.map((ab) => (
        <details key={ab.name} open>
          <summary className="cursor-pointer rounded-lg px-2.5 py-1.5 text-rive-text transition-colors hover:bg-rive-accent-muted">
            <span className="ml-1 font-medium text-rive-accent">Artboard</span>{" "}
            <span>{ab.name}</span>
          </summary>

          <div className="ml-4 border-l border-rive-border/60 pl-3">
            {ab.animations.length > 0 && (
              <details open>
                <summary className="cursor-pointer rounded-lg px-2.5 py-1.5 text-rive-text-secondary transition-colors hover:bg-rive-accent-muted">
                  Animations
                  <span className="ml-1 text-rive-text-muted">({ab.animations.length})</span>
                </summary>
                <ul className="ml-4 border-l border-rive-border/40 pl-3">
                  {ab.animations.map((a) => (
                    <li key={a} className="px-2.5 py-1 text-rive-text-secondary">
                      {a}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {ab.stateMachines.length > 0 && (
              <details open>
                <summary className="cursor-pointer rounded-lg px-2.5 py-1.5 text-rive-text-secondary transition-colors hover:bg-rive-accent-muted">
                  State Machines
                  <span className="ml-1 text-rive-text-muted">({ab.stateMachines.length})</span>
                </summary>
                <div className="ml-4 border-l border-rive-border/40 pl-3">
                  {ab.stateMachines.map((sm) => (
                    <details key={sm.name}>
                      <summary className="cursor-pointer rounded-lg px-2.5 py-1 text-rive-text-secondary transition-colors hover:bg-rive-accent-muted">
                        {sm.name}
                        {sm.inputs.length > 0 && (
                          <span className="ml-1 text-rive-text-muted">
                            ({sm.inputs.length})
                          </span>
                        )}
                      </summary>
                      {sm.inputs.length > 0 && (
                        <ul className="ml-4 border-l border-rive-border/30 pl-3">
                          {sm.inputs.map((inp) => (
                            <li key={inp.name} className="flex items-center gap-2 px-2.5 py-1 text-rive-text-muted">
                              <span>{inp.name}</span>
                              <span className="rounded bg-rive-bg px-1.5 py-0.5 text-[10px] text-rive-text-muted">
                                {inputTypeLabel(inp.type)}
                              </span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </details>
                  ))}
                </div>
              </details>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
