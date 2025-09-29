// Utility function for combining and merging class names in React components using Tailwind CSS.
// - Uses 'clsx' to conditionally join class names from various input types (strings, arrays, objects).
// - Uses 'tailwind-merge' to intelligently merge Tailwind CSS classes, resolving conflicts (e.g., 'p-2' vs 'p-4').
// - Exported 'cn' function helps build clean, conflict-free className strings for use in components.
//
// Example usage:
//   cn('p-2', { 'bg-red-500': isError }, 'p-4')
//   // => 'bg-red-500 p-4' (if isError is true)
//
// This ensures dynamic, readable, and conflict-free class names in  UI

import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs) => {
    return twMerge(clsx(inputs));
}; 