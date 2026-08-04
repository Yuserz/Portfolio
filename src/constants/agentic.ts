/**
 * "Agentic stack" tools shown in the `agentic_stack --tools` section.
 */
export interface AgenticTool {
  id: number;
  /** Machine name used in [TOOL_ID: ...]. */
  toolId: string;
  name: string;
  status: string;
  capability: string;
  /** Fake terminal command displayed at the bottom of the card. */
  command: string;
}

export const AGENTIC_TOOLS: AgenticTool[] = [
  {
    id: 0,
    toolId: "CLAUDE_CODE",
    name: "CLAUDE_CODE",
    status: "ACTIVE",
    capability:
      "Autonomous Coding & Refactoring. High-context agentic development workflows.",
    command: "$ run --agentic-mode",
  },
  {
    id: 1,
    toolId: "GOOGLE_STITCH",
    name: "GOOGLE_STITCH",
    status: "ACTIVE",
    capability:
      "AI-Native UI Design & Prototyping. Seamless bridge between design and code.",
    command: "$ stitch --generate-ui",
  },
  {
    id: 2,
    toolId: "FIGMA",
    name: "FIGMA",
    status: "ACTIVE",
    capability:
      "Collaborative Design Systems & AI Workflows. Industry standard for visual systems.",
    command: "$ open --design-system",
  },
];
