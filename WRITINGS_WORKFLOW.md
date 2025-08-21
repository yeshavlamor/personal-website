# Writings Workflow Guide

## Overview
This guide explains how to use the new markdown-based writing system for your personal website. The system automatically converts markdown files into the structured format your app expects.

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Create Your First Writing
Create a new markdown file in `src/content/writings/` with the following structure:

```markdown
---
title: "Your Writing Title"
excerpt: "A brief description of your writing"
date: "2024-12-01"
category: "books"
tags: ["tag1", "tag2"]
readTimeMinutes: 5
---

# Your Content Here

Write your content using standard markdown syntax...
```

### 3. Generate the Writings File
```bash
npm run generate-writings
```

This will automatically update `src/data/writings.js` with your new content.

## Workflow Options

### Option A: Manual Generation (Recommended for now)
- Write your markdown files
- Run `npm run generate-writings` when you want to update
- Commit both the markdown files and the generated writings.js

### Option B: Auto-watch (Future enhancement)
- Run `npm run watch-writings` in a separate terminal
- Automatically regenerates when you save markdown files
- Requires nodemon (install with `npm install -g nodemon`)

## Markdown Features Supported

### Text Formatting
- **Bold**: `**text**` or `__text__`
- *Italic*: `*text*` or `_text_`
- __Underline__: `__text__` (double underscores)
- ~~Strikethrough~~: `~~text~~`
- `Inline code`: backticks

### Headers
```markdown
# H1 Header
## H2 Header
### H3 Header
```

### Lists
```markdown
- Unordered item
- Another item

1. Ordered item
2. Second item
```

### Code Blocks
```markdown
```javascript
function example() {
  return "Hello World";
}
```
```

### Blockquotes
```markdown
> This is a blockquote
> You can use it for quotes or important notes
```

### Images
```markdown
![Alt text](/path/to/image.jpg)
```

### Links
```markdown
[Link text](https://example.com)
```

## File Naming Convention
- Use descriptive names: `my-awesome-writing.md`
- Avoid spaces and special characters
- The system will automatically generate slugs from the title

## Categories Available
- `books` - Book reviews and notes
- `philosophies` - Personal philosophies and thoughts
- `travels` - Travel experiences and stories
- Add new categories in `src/data/categories.js`

## Advanced Features

### Custom Frontmatter
You can add custom fields to your frontmatter:

```markdown
---
title: "Example"
excerpt: "Description"
date: "2024-12-01"
category: "books"
tags: ["tag1", "tag2"]
readTimeMinutes: 5
featured: true
draft: false
---
```

### Image Management
- Store images in `public/images/`
- Reference them in markdown: `![Alt](/images/filename.jpg)`
- The system will automatically handle image paths

### Code Syntax Highlighting
Specify the language for code blocks:

```markdown
```python
def hello():
    print("Hello World")
```

```javascript
console.log("Hello World");
```
```

## Troubleshooting

### Common Issues

1. **Markdown not parsing correctly**
   - Check that your frontmatter is properly formatted with `---` delimiters
   - Ensure all required fields are present

2. **Images not showing**
   - Verify the image path is correct
   - Check that the image exists in the public folder

3. **Generated file not updating**
   - Run `npm run generate-writings` manually
   - Check the console for error messages

### Debug Mode
Add `console.log` statements to the parser script to debug issues:

```javascript
// In scripts/parse-writings.js
console.log('Parsing file:', filePath);
console.log('Frontmatter:', data);
console.log('Content:', markdownContent);
```

## Future Enhancements

### Planned Features
- [ ] Auto-save drafts
- [ ] Rich text editor integration
- [ ] Image optimization and lazy loading
- [ ] SEO meta tags generation
- [ ] Social media preview cards
- [ ] Reading progress tracking
- [ ] Related writings suggestions

### Automation Ideas
- [ ] GitHub Actions for auto-deployment
- [ ] Webhook integration for instant updates
- [ ] Content scheduling system
- [ ] Analytics integration
- [ ] Newsletter integration

## Best Practices

### Writing Tips
1. **Keep excerpts concise** - They appear in previews
2. **Use descriptive titles** - They become URLs
3. **Tag thoughtfully** - Helps with organization and discovery
4. **Include images** - Makes content more engaging
5. **Write regularly** - Consistency builds audience

### Technical Tips
1. **Version control everything** - Both markdown and generated files
2. **Test locally** - Always preview before publishing
3. **Backup regularly** - Your content is valuable
4. **Optimize images** - Compress before uploading
5. **Use semantic HTML** - Markdown generates clean HTML

## Support

If you encounter issues:
1. Check this guide first
2. Review the console output
3. Check the generated writings.js file
4. Verify markdown syntax
5. Ensure all dependencies are installed

## Examples

See `src/content/writings/example-writing.md` for a complete example of all features.
