#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { marked } from 'marked';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure marked for custom rendering
marked.setOptions({
  gfm: true,
  breaks: true
});

// Simple parser that converts markdown to your content structure
function parseMarkdownToContent(markdown) {
  const lines = markdown.split('\n');
  const content = [];
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;
    
    // Headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)[0].length;
      const text = line.replace(/^#+\s*/, '');
      content.push({
        type: "header",
        level: level,
        content: text + "\r"
      });
    }
    // Code blocks
    else if (line.startsWith('```')) {
      const language = line.replace('```', '').trim();
      let codeContent = '';
      i++;
      while (i < lines.length && !lines[i].trim().startsWith('```')) {
        codeContent += lines[i] + '\n';
        i++;
      }
      content.push({
        type: "code",
        content: codeContent.trim(),
        language: language || "text"
      });
    }
    // Lists
    else if (line.match(/^[-*+]\s/)) {
      const items = [];
      let currentItem = line.replace(/^[-*+]\s/, '');
      items.push(currentItem);
      
      // Collect subsequent list items
      while (i + 1 < lines.length && lines[i + 1].trim().match(/^[-*+]\s/)) {
        i++;
        items.push(lines[i].trim().replace(/^[-*+]\s/, ''));
      }
      
      content.push({
        type: "list",
        items: items,
        ordered: false
      });
    }
    // Ordered lists
    else if (line.match(/^\d+\.\s/)) {
      const items = [];
      let currentItem = line.replace(/^\d+\.\s/, '');
      items.push(currentItem);
      
      // Collect subsequent ordered list items
      while (i + 1 < lines.length && lines[i + 1].trim().match(/^\d+\.\s/)) {
        i++;
        items.push(lines[i].trim().replace(/^\d+\.\s/, ''));
      }
      
      content.push({
        type: "list",
        items: items,
        ordered: true
      });
    }
    // Blockquotes
    else if (line.startsWith('>')) {
      const quote = line.replace(/^>\s*/, '');
      content.push({
        type: "blockquote",
        content: quote
      });
    }
    // Images
    else if (line.match(/^!\[.*\]\(.*\)/)) {
      const match = line.match(/^!\[(.*?)\]\((.*?)\)/);
      if (match) {
        content.push({
          type: "image",
          src: match[2],
          alt: match[1]
        });
      }
    }
    // Regular paragraphs
    else {
      content.push({
        type: "paragraph",
        content: line
      });
    }
  }
  
  return content;
}

function parseMarkdownFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: markdownContent } = matter(content);
  
  // Parse markdown content using our custom parser
  const contentArray = parseMarkdownToContent(markdownContent);

  return {
    id: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    slug: data.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    title: data.title,
    excerpt: data.excerpt,
    date: data.date,
    category: data.category,
    tags: data.tags || [],
    readTimeMinutes: data.readTimeMinutes || 1,
    content: contentArray
  };
}

function generateWritingsFile() {
  const writingsDir = path.join(__dirname, '../src/content/writings');
  const outputFile = path.join(__dirname, '../src/data/writings.js');
  
  if (!fs.existsSync(writingsDir)) {
    console.error('Writings directory not found:', writingsDir);
    return;
  }

  const markdownFiles = fs.readdirSync(writingsDir)
    .filter(file => file.endsWith('.md'))
    .sort((a, b) => {
      // Sort by date descending (newest first)
      const aPath = path.join(writingsDir, a);
      const bPath = path.join(writingsDir, b);
      const aContent = fs.readFileSync(aPath, 'utf8');
      const bContent = fs.readFileSync(bPath, 'utf8');
      const aDate = matter(aContent).data.date;
      const bDate = matter(bContent).data.date;
      return new Date(bDate) - new Date(aDate);
    });

  const writings = markdownFiles.map(file => {
    const filePath = path.join(writingsDir, file);
    return parseMarkdownFile(filePath);
  });

  const output = `// Auto-generated file - do not edit manually
// Run 'npm run generate-writings' to regenerate

export const writings = ${JSON.stringify(writings, null, 2)};

export function getWritingBySlug(slug) {
  return writings.find((w) => w.slug === slug);
}
`;

  fs.writeFileSync(outputFile, output);
  console.log(`Generated writings.js with ${writings.length} writings`);
}

// Run if called directly
const scriptPath = fileURLToPath(import.meta.url);
const argvPath = process.argv[1];

if (scriptPath === argvPath) {
  generateWritingsFile();
}

export { generateWritingsFile };
