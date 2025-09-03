# Chatbot Knowledge Base

This folder contains markdown files that serve as the knowledge base for your personal AI chatbot.

## How to Add Content

1. **Create a new markdown file** in this folder (e.g., `my-background.md`, `projects.md`, `skills.md`)
2. **Write your content** using standard markdown formatting
3. **Run the setup script** to update the chatbot's knowledge base

## File Naming Convention

Use descriptive names that reflect the content:
- `background.md` - Your personal background and story
- `education.md` - Academic background and achievements
- `experience.md` - Work experience and internships
- `projects.md` - Personal and professional projects
- `skills.md` - Technical skills and technologies
- `interests.md` - Hobbies, interests, and passions
- `achievements.md` - Awards, certifications, and accomplishments

## Content Guidelines

- **Be specific**: Include details, dates, technologies, and outcomes
- **Use clear structure**: Use headers, lists, and paragraphs for readability
- **Include context**: Explain the "why" behind your experiences
- **Keep it personal**: Write in your own voice and style

## Example Content

```markdown
# My Background

I'm a software engineer passionate about creating technology that makes a positive impact on society. I graduated from [University] with a degree in [Field] and have been working in tech for [X] years.

## Education

- **Bachelor's in Computer Science** - [University], 2020-2024
- **Relevant Coursework**: Machine Learning, Data Structures, Web Development
- **GPA**: 3.8/4.0

## Work Experience

### Software Engineer Intern - [Company]
**June 2023 - August 2023**
- Developed a machine learning model that improved efficiency by 25%
- Collaborated with a team of 5 engineers on a full-stack web application
- Technologies used: Python, React, TensorFlow, AWS

## Projects

### Personal Website
A modern portfolio website built with React and Vite, featuring:
- Responsive design with Tailwind CSS
- Interactive animations with Framer Motion
- AI chatbot integration using RAG technology
- Blog system with markdown support

## Technical Skills

**Programming Languages**: Python, JavaScript, TypeScript, Java
**Frameworks & Libraries**: React, Node.js, Express, TensorFlow
**Databases**: PostgreSQL, MongoDB, ChromaDB
**Cloud & DevOps**: AWS, Docker, Git, CI/CD
```

## Updating the Knowledge Base

After adding or modifying files, run:
```bash
npm run setup-chromadb
```

This will:
1. Process all markdown files in this folder
2. Create vector embeddings for semantic search
3. Update the ChromaDB database
4. Make new content available to the chatbot

## Tips for Better Responses

- **Use natural language**: Write as if explaining to a friend
- **Include examples**: Specific projects, technologies, and outcomes
- **Add context**: Explain your motivations and learning journey
- **Keep it updated**: Regularly add new experiences and projects

