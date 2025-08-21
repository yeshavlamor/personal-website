import { BookOpen, Lightbulb, Compass } from "lucide-react";

export const baseCategories = [
  { key: "all", label: "All", icon: null },
  { key: "literature", label: "Literature", icon: BookOpen },
  { key: "tech", label: "Tech", icon: Lightbulb },
  { key: "travels", label: "Travels", icon: Compass },
];

export const categoryMap = baseCategories.reduce((acc, c) => {
  acc[c.key] = c;
  return acc;
}, {});

export function isValidCategory(key) {
  return Boolean(categoryMap[key]) && key !== "all";
}

export function getCategoryLabel(key) {
  return categoryMap[key]?.label ?? key;
}


