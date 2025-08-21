# Writings Workflow

This directory contains all your writings in markdown format. Each writing is a separate `.md` file with YAML frontmatter.

## How to Add a New Writing

1. **Copy the template**: Copy `_template.md` and rename it to your desired slug (e.g., `my-new-writing.md`)

2. **Edit the frontmatter**: Update the YAML section at the top with your writing's metadata:
   ```yaml
   ---
   title: "Your Writing Title"
   excerpt: "Brief description"
   date: "2024-12-01"
   category: "books|philosophies|travels"
   tags: ["tag1", "tag2"]
   readTimeMinutes: 5
   ---
   ```

3. **Write your content**: Add your writing content below the frontmatter, separating paragraphs with blank lines

4. **Generate the data**: Run `npm run generate-writings` to update the writings data

5. **Build and test**: Run `npm run dev` to see your changes

## Frontmatter Fields

- **title**: The title of your writing
- **excerpt**: A brief description (appears in previews)
- **date**: Publication date in YYYY-MM-DD format
- **category**: One of: "books", "philosophies", "travels"
- **tags**: Array of relevant tags
- **readTimeMinutes**: Estimated reading time (optional - will be auto-calculated if not provided)

## File Naming

Use kebab-case for filenames (e.g., `my-writing-title.md`). The filename becomes the URL slug.

## Automation

The build process automatically:
- Reads all `.md` files in this directory
- Parses frontmatter and content
- Calculates reading time if not provided
- Sorts by date (newest first)
- Generates the `src/data/writings.js` file

## Future Enhancements

Consider these automation possibilities:
- GitHub Actions to auto-deploy when you push new writings
- Integration with Google Docs API for writing in Google Docs
- Webhook integration with Notion or other writing tools
- Auto-publishing to social media platforms
