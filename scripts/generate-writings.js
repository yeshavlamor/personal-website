import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Paths
const writingsDir = path.join(__dirname, '../src/content/writings');
const outputFile = path.join(__dirname, '../src/data/writings.js');

function calculateReadTime(content) {
  const wordsPerMinute = 200;
  const wordCount = content.split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
}

function generateSlug(filename) {
  return filename.replace(/\.md$/, '');
}

function processWritings() {
  try {
    // Create writings directory if it doesn't exist
    if (!fs.existsSync(writingsDir)) {
      fs.mkdirSync(writingsDir, { recursive: true });
    }

    const files = fs.readdirSync(writingsDir)
      .filter(file => file.endsWith('.md'))
      .filter(file => !file.startsWith('_') && file !== 'README.md');
    
    const writings = files.map(filename => {
      const filePath = path.join(writingsDir, filename);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data, content } = matter(fileContent);
      
      const slug = generateSlug(filename);
      const paragraphs = content
        .trim()
        .split('\n\n')
        .filter(para => para.trim().length > 0)
        .map(para => para.replace(/\r\n/g, '\n').trim());
      
      // Build-time markdown → HTML (no external deps)
      function escapeHtml(input) {
        return input
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          .replace(/\"/g, '&quot;')
          .replace(/'/g, '&#39;');
      }

      function sanitizeHref(href) {
        const trimmed = href.trim();
        const allowed = /^(https?:\/\/|\/|\.\/|\.\.\/)/i;
        return allowed.test(trimmed) ? trimmed : '#';
      }

      function sanitizeSrc(src) {
        const trimmed = src.trim();
        const allowed = /^(https?:\/\/|\/|\.\/|\.\.\/)/i;
        return allowed.test(trimmed) ? trimmed : '';
      }

      function processInline(text) {
        let s = escapeHtml(text);
        // images ![alt](src)
        s = s.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_, alt, src) => {
          const safeSrc = sanitizeSrc(src);
          const safeAlt = alt;
          return safeSrc ? `<img src="${safeSrc}" alt="${safeAlt}" />` : '';
        });
        // links [text](href)
        s = s.replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, href) => {
          const safeHref = sanitizeHref(href);
          const safeLabel = label;
          return `<a href="${safeHref}" rel="noopener noreferrer">${safeLabel}</a>`;
        });
        // inline code `code`
        s = s.replace(/`([^`]+)`/g, (_, code) => `<code>${code}</code>`);
        // bold then italics
        s = s.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
        s = s.replace(/__(.+?)__/g, '<strong>$1</strong>');
        // underline via ++text++ (custom)
        s = s.replace(/\+\+(.+?)\+\+/g, '<u>$1</u>');
        s = s.replace(/\*(.+?)\*/g, '<em>$1</em>');
        s = s.replace(/_(.+?)_/g, '<em>$1</em>');
        return s;
      }

      function renderMarkdownToHtml(md) {
        const lines = md.replace(/\r\n/g, '\n').split('\n');
        const htmlParts = [];
        let i = 0;
        let inCode = false;
        let codeLang = '';
        let codeBuffer = [];
        let listBuffer = null; // { ordered: boolean, items: string[] }
        let blockquoteBuffer = [];
        let paraBuffer = [];

        function flushParagraph() {
          if (paraBuffer.length) {
            const text = paraBuffer.join(' ');
            htmlParts.push(`<p>${processInline(text)}</p>`);
            paraBuffer = [];
          }
        }

        function flushBlockquote() {
          if (blockquoteBuffer.length) {
            const text = blockquoteBuffer.join(' ');
            htmlParts.push(`<blockquote><p>${processInline(text)}</p></blockquote>`);
            blockquoteBuffer = [];
          }
        }

        function flushList() {
          if (listBuffer && listBuffer.items.length) {
            const tag = listBuffer.ordered ? 'ol' : 'ul';
            const itemsHtml = listBuffer.items
              .map(item => `<li>${processInline(item)}</li>`)
              .join('');
            htmlParts.push(`<${tag}>${itemsHtml}</${tag}>`);
            listBuffer = null;
          }
        }

        while (i < lines.length) {
          const raw = lines[i];
          const line = raw; // keep exact spacing for code blocks only

          // fenced code blocks
          const fenceMatch = line.match(/^```(.*)$/);
          if (fenceMatch) {
            if (!inCode) {
              // starting code
              flushParagraph();
              flushBlockquote();
              flushList();
              inCode = true;
              codeLang = fenceMatch[1].trim();
              codeBuffer = [];
              i++;
              continue;
            } else {
              // closing code
              const escaped = escapeHtml(codeBuffer.join('\n'));
              const cls = codeLang ? ` class="language-${codeLang}"` : '';
              htmlParts.push(`<pre><code${cls}>${escaped}</code></pre>`);
              inCode = false;
              codeLang = '';
              codeBuffer = [];
              i++;
              continue;
            }
          }

          if (inCode) {
            codeBuffer.push(line);
            i++;
            continue;
          }

          // blank line → flush all open blocks
          if (line.trim() === '') {
            flushParagraph();
            flushBlockquote();
            flushList();
            i++;
            continue;
          }

          // headings
          const heading = line.match(/^(#{1,6})\s+(.*)$/);
          if (heading) {
            flushParagraph();
            flushBlockquote();
            flushList();
            const level = heading[1].length;
            const text = heading[2];
            htmlParts.push(`<h${level}>${processInline(text)}</h${level}>`);
            i++;
            continue;
          }

          // blockquote
          const bq = line.match(/^>\s?(.*)$/);
          if (bq) {
            flushParagraph();
            flushList();
            blockquoteBuffer.push(bq[1]);
            i++;
            continue;
          }

          // lists
          const ul = line.match(/^[-*+]\s+(.*)$/);
          const ol = line.match(/^\d+\.\s+(.*)$/);
          if (ul || ol) {
            flushParagraph();
            flushBlockquote();
            const isOrdered = Boolean(ol);
            const itemText = (ul ? ul[1] : ol[1]).trim();
            if (!listBuffer) {
              listBuffer = { ordered: isOrdered, items: [] };
            }
            // If list type changes, flush and start anew
            if (listBuffer && listBuffer.ordered !== isOrdered) {
              flushList();
              listBuffer = { ordered: isOrdered, items: [] };
            }
            listBuffer.items.push(itemText);
            i++;
            continue;
          }

          // default → paragraph content
          flushList();
          paraBuffer.push(line.trim());
          i++;
        }

        // flush any remaining buffers
        flushParagraph();
        flushBlockquote();
        flushList();

        return htmlParts.join('\n');
      }

      const html = renderMarkdownToHtml(content);

      return {
        id: slug,
        slug: slug,
        title: data.title,
        excerpt: data.excerpt,
        date: data.date,
        category: data.category,
        readTimeMinutes: data.readTimeMinutes || calculateReadTime(content),
        content: paragraphs,
        markdown: content.trim(),
        html,
      };
    });

    // Sort by date (newest first)
    writings.sort((a, b) => new Date(b.date) - new Date(a.date));

    // Generate the JavaScript file
    const jsContent = `// Auto-generated file - do not edit manually
// Run 'npm run generate-writings' to regenerate

export const writings = ${JSON.stringify(writings, null, 2)};

export function getWritingBySlug(slug) {
  return writings.find((w) => w.slug === slug);
}
`;

    fs.writeFileSync(outputFile, jsContent);
    console.log(`✅ Generated ${writings.length} writings in ${outputFile}`);
    
  } catch (error) {
    console.error('❌ Error generating writings:', error);
    process.exit(1);
  }
}

processWritings();
