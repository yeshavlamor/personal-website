import { BookOpen, Lightbulb, Compass } from "lucide-react";

// array of categories for iteration use cases (rendering category tabs)
export const baseCategories = [
  { key: "all", label: "All", icon: null },
  { key: "literature", label: "Literature", icon: BookOpen },
  { key: "tech", label: "Tech", icon: Lightbulb },
  { key: "travels", label: "Travels", icon: Compass },
];

// transform array into objects for faster lookup 
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


