import OpenAI from 'openai';
import { ChromaClient } from 'chromadb';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Initialize ChromaDB client (you'll need to set up a ChromaDB instance)
const chromaClient = new ChromaClient({
  path: process.env.CHROMA_DB_URL || "http://localhost:8000"
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // 1) Retrieve relevant documents from ChromaDB (k=3 like Python impl)
    const collection = await chromaClient.getCollection({ name: "personal-website-content" });
    const queryResults = await collection.query({ queryTexts: [message], nResults: 3 });

    const documents = Array.isArray(queryResults?.documents) && queryResults.documents[0] ? queryResults.documents[0] : [];
    const metadatas = Array.isArray(queryResults?.metadatas) && queryResults.metadatas[0] ? queryResults.metadatas[0] : [];
    const distances = Array.isArray(queryResults?.distances) && queryResults.distances[0] ? queryResults.distances[0] : [];

    // 2) Basic relevance guardrail: require at least one result and a distance threshold if available
    const DISTANCE_THRESHOLD = 0.7; // mirrors Python relevance threshold idea
    const topDistance = typeof distances[0] === 'number' ? distances[0] : null;
    const passesThreshold = topDistance === null ? documents.length > 0 : topDistance <= DISTANCE_THRESHOLD;
    const hasAnyResult = documents.length > 0 && passesThreshold;
    let context = hasAnyResult ? documents.join('\n\n') : '';

    // 3) Prompt template aligned with Python PROMPT_TEMPLATE
    const promptTemplate = [
      'Answer the question based only on the following context:',
      '',
      '{context}',
      '',
      'Answer the question based on the above context: {question}'
    ].join('\n');

    const systemPrompt = promptTemplate
      .replace('{context}', context)
      .replace('{question}', message);

    // 4) Generate response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        ...conversationHistory,
        { role: "user", content: message }
      ],
      max_tokens: 500,
      temperature: 0.0,
    });

    let response = completion.choices?.[0]?.message?.content || '';

    if (!hasAnyResult) {
      response = "I couldn't find relevant context in my knowledge base to answer that confidently. Could you try rephrasing or ask about my background, skills, projects, or experiences?";
    }

    // 5) Return response with sources
    res.status(200).json({
      response,
      sources: metadatas
    });

  } catch (error) {
    console.error('Chat API error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
}

