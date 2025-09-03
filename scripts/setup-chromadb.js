import { ChromaClient, OpenAIEmbeddingFunction } from 'chromadb';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const CHROMA_DB_URL = process.env.CHROMA_DB_URL || "http://localhost:8000";
const COLLECTION_NAME = "personal-website-content";

async function setupChromaDB() {
  console.log('🚀 Setting up ChromaDB for RAG chatbot...\n');

  try {
    // Initialize ChromaDB client
    const client = new ChromaClient({ path: CHROMA_DB_URL });

    // Configure client-side embedding (avoids server-side embedding config requirements)
    const openaiApiKey = process.env.OPENAI_API_KEY;
    if (!openaiApiKey) {
      console.log('⚠️  OPENAI_API_KEY is not set. Set it so the setup script can embed documents.');
      console.log('   Example (PowerShell):  setx OPENAI_API_KEY "sk-..."');
      throw new Error('Missing OPENAI_API_KEY');
    }

    const embeddingFunction = new OpenAIEmbeddingFunction({
      openai_api_key: openaiApiKey,
      model: 'text-embedding-3-small'
    });

    // Create or get collection with embeddingFunction
    const collection = await client.getOrCreateCollection({
      name: COLLECTION_NAME,
      metadata: { description: 'Personal website content for RAG chatbot' },
      embeddingFunction
    });
    console.log('✅ Collection ready:', COLLECTION_NAME);

    // Prepare content from the data folder
    const dataDir = path.join(process.cwd(), 'data');
    const content = [];

    if (fs.existsSync(dataDir)) {
      const files = fs.readdirSync(dataDir)
        .filter(file => file.endsWith('.md'))
        .filter(file => file !== 'README.md');

      console.log(`📁 Found ${files.length} markdown files in data folder`);

      for (const file of files) {
        const filePath = path.join(dataDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        
        // Extract filename without extension for ID
        const fileName = file.replace('.md', '');
        
        content.push({
          id: `data-${fileName}`,
          text: fileContent,
          metadata: {
            type: 'data',
            source: file,
            title: fileName.charAt(0).toUpperCase() + fileName.slice(1).replace(/-/g, ' '),
            category: 'personal-info'
          }
        });

        console.log(`📄 Processed: ${file}`);
      }
    }

    // Also include content from writings (optional - for additional context)
    const writingsDir = path.join(process.cwd(), 'src/content/writings');
    if (fs.existsSync(writingsDir)) {
      const writingFiles = fs.readdirSync(writingsDir)
        .filter(file => file.endsWith('.md'))
        .filter(file => !file.startsWith('_') && file !== 'README.md');

      console.log(`📚 Found ${writingFiles.length} writing files for additional context`);

      for (const file of writingFiles) {
        const filePath = path.join(writingsDir, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const { data, content: markdownContent } = matter(fileContent);
        
        content.push({
          id: `writing-${file.replace('.md', '')}`,
          text: `${data.title}\n\n${data.excerpt}\n\n${markdownContent}`,
          metadata: {
            type: 'writing',
            title: data.title,
            category: data.category,
            tags: data.tags || [],
            date: data.date,
            source: file
          }
        });
      }
    }

    if (content.length === 0) {
      console.log('⚠️  No content found to add to ChromaDB');
      console.log('💡 Create markdown files in the data/ folder to get started');
      return;
    }

    // Add documents to collection
    await collection.add({
      ids: content.map(item => item.id),
      documents: content.map(item => item.text),
      metadatas: content.map(item => item.metadata)
    });

    console.log(`✅ Added ${content.length} documents to ChromaDB`);
    console.log(`📊 Collection: ${COLLECTION_NAME}`);
    console.log(`🔗 ChromaDB URL: ${CHROMA_DB_URL}`);

    // Test query
    const testResults = await collection.query({
      queryTexts: ["What does Yesha do?"],
      nResults: 2
    });

    console.log('\n🧪 Test query results:');
    console.log('Query: "What does Yesha do?"');
    console.log('Results:', testResults.documents[0].length, 'documents found');

    // Show content summary
    console.log('\n📋 Content Summary:');
    const dataFiles = content.filter(item => item.metadata.type === 'data');
    const writingFiles = content.filter(item => item.metadata.type === 'writing');
    
    console.log(`📁 Data files: ${dataFiles.length}`);
    dataFiles.forEach(item => {
      console.log(`   - ${item.metadata.title} (${item.metadata.source})`);
    });
    
    if (writingFiles.length > 0) {
      console.log(`📚 Writing files: ${writingFiles.length}`);
      writingFiles.forEach(item => {
        console.log(`   - ${item.metadata.title} (${item.metadata.source})`);
      });
    }

  } catch (error) {
    console.error('❌ Error setting up ChromaDB:', error);
    process.exit(1);
  }
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  setupChromaDB();
}
