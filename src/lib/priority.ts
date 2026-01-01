export const PRIORITY_MAP = {
  1: {
    label: "Normal",
    badge: null,
    icon: null
  },
  2: {
    label: "Empfohlen",
    badge: "Empfohlen",
    icon: "⭐"
  },
  3: {
    label: "Highlight",
    badge: "Highlight",
    icon: "✨"
  },
  4: {
    label: "Top-Event",
    badge: "Top-Event",
    icon: "🔥"
  }
} as const;
