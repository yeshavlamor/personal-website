#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import readline from 'readline';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function question(query) {
  return new Promise(resolve => rl.question(query, resolve));
}

function generateSlug(title) {
  return title.toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getCurrentDate() {
  const now = new Date();
  return now.toISOString().split('T')[0];
}

async function createWriting() {
  console.log('🎯 Creating a new writing...\n');

  // Get writing details
  const title = await question('Title: ');
  const excerpt = await question('Excerpt: ');
  const category = await question('Category (books/philosophies/travels): ');
  const tags = await question('Tags (comma-separated): ');
  const readTime = await question('Estimated read time (minutes): ');

  // Generate filename and slug
  const slug = generateSlug(title);
  const filename = `${slug}.md`;
  const filepath = path.join(__dirname, '../src/content/writings', filename);

  // Create frontmatter
  const frontmatter = `---
title: "${title}"
excerpt: "${excerpt}"
date: "${getCurrentDate()}"
category: "${category}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
readTimeMinutes: ${parseInt(readTime) || 5}
---

# ${title}

${excerpt}

## Introduction

Start your writing here...

## Main Content

Add your main content sections here...

## Conclusion

Wrap up your thoughts here...
`;

  // Write the file
  try {
    fs.writeFileSync(filepath, frontmatter);
    console.log(`\n✅ Writing created successfully!`);
    console.log(`📁 File: ${filepath}`);
    console.log(`🔗 Slug: ${slug}`);
    console.log(`\n📝 Next steps:`);
    console.log(`1. Edit the markdown file with your content`);
    console.log(`2. Run 'npm run generate-writings' to update your site`);
    console.log(`3. Test locally with 'npm run dev'`);
  } catch (error) {
    console.error('❌ Error creating writing:', error.message);
  }

  rl.close();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  createWriting();
}

export { createWriting };
