# 🤖 Chatbot Deployment Guide

This guide explains how to deploy your personal website with the integrated RAG chatbot.

## 🏗️ **Architecture Overview**

Your website will be deployed as a **single application** with:
- **Frontend**: React app (your existing website)
- **Backend**: Serverless API functions (handled by Vercel)
- **Database**: ChromaDB (hosted separately)

```
┌─────────────────────────────────────┐
│           Your Website              │
│  ┌─────────────┐  ┌─────────────┐   │
│  │   React     │  │   Vercel    │   │
│  │  Frontend   │  │  Serverless │   │
│  │             │  │    API      │   │
│  └─────────────┘  └─────────────┘   │
│  (About Section)   (RAG Logic)      │
│  + Chat Input                      │
└─────────────────────────────────────┘
                    │
                    ▼
            ┌─────────────┐
            │  ChromaDB   │
            │  (Hosted)   │
            └─────────────┘
```

## 🎨 **Design Integration**

The chatbot is now **integrated directly into the About section** as:
- **Inline text input**: Users can type questions directly in the About section
- **Expandable chat**: Conversation history appears when users start chatting
- **Seamless design**: Matches your existing gradient borders and card styles
- **Contextual placement**: Perfectly positioned to answer questions about your background

## 📁 **Knowledge Base Management**

The chatbot's knowledge comes from markdown files in the `data/` folder:

### **Easy Content Management**
- **Dedicated folder**: All chatbot content in one place (`data/`)
- **Simple markdown**: Write content in plain markdown format
- **Easy updates**: Just add/edit markdown files and run the setup script
- **Organized structure**: Separate files for different topics (background, skills, projects, etc.)

### **Content Structure**
```
data/
├── README.md          # Instructions and guidelines
├── background.md      # Personal background and story
├── skills.md          # Technical skills and expertise
├── projects.md        # Projects and work experience
├── education.md       # Academic background
├── experience.md      # Work experience and internships
└── interests.md       # Hobbies and personal interests
```

### **Adding New Content**
1. Create a new `.md` file in the `data/` folder
2. Write your content using markdown formatting
3. Run `npm run setup-chromadb` to update the knowledge base
4. The chatbot will immediately have access to the new information

## 🚀 **Step-by-Step Deployment**

### **Step 1: Set Up ChromaDB**

You have several options for hosting ChromaDB:

#### **Option A: ChromaDB Cloud (Recommended)**
1. Go to [ChromaDB Cloud](https://www.trychroma.com/)
2. Create a free account
3. Create a new database
4. Get your connection URL

#### **Option B: Self-hosted ChromaDB**
```bash
# Run locally for development
docker run -p 8000:8000 chromadb/chroma
```

#### **Option C: Railway/Render**
Deploy ChromaDB as a separate service on Railway or Render.

### **Step 2: Set Up Environment Variables**

Create a `.env.local` file in your project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
CHROMA_DB_URL=your_chromadb_url_here
```

### **Step 3: Populate ChromaDB**

Run the setup script to add your content to ChromaDB:
```bash
npm run setup-chromadb
```

### **Step 4: Deploy to Vercel**

#### **Option A: Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add OPENAI_API_KEY
vercel env add CHROMA_DB_URL
```

#### **Option B: Vercel Dashboard**
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

## 🔧 **Configuration Details**

### **Environment Variables**
- `OPENAI_API_KEY`: Your OpenAI API key
- `CHROMA_DB_URL`: Your ChromaDB connection URL

### **API Endpoint**
The chatbot API will be available at:
```
https://your-domain.vercel.app/api/chat
```

### **ChromaDB Collection**
- **Name**: `personal-website-content`
- **Content**: Markdown files from `data/` folder + your writings

## 💰 **Costs Breakdown**

### **Free Tier (Recommended for Portfolio)**
- **Vercel**: Free hosting
- **ChromaDB Cloud**: Free tier available
- **OpenAI**: ~$0.002 per 1K tokens (very cheap for personal use)

### **Estimated Monthly Costs**
- **Low usage** (< 100 conversations): ~$1-5/month
- **Medium usage** (100-1000 conversations): ~$5-20/month
- **High usage** (> 1000 conversations): ~$20+/month

## 🧪 **Testing Locally**

1. **Start development server**:
```bash
npm run dev
```

2. **Set up local ChromaDB**:
```bash
docker run -p 8000:8000 chromadb/chroma
```

3. **Populate ChromaDB**:
```bash
npm run setup-chromadb
```

4. **Test the chatbot**:
- Open your website
- Go to the About section
- Type questions in the chatbot input
- Ask about your background, skills, or projects

## 🔍 **Troubleshooting**

### **Common Issues**

#### **"Failed to get response" Error**
- Check if ChromaDB is running
- Verify environment variables
- Check OpenAI API key

#### **ChromaDB Connection Issues**
- Verify the connection URL
- Check if ChromaDB service is running
- Ensure network connectivity

#### **API Rate Limits**
- OpenAI has rate limits on free tier
- Consider upgrading if you hit limits

### **Debug Mode**
Add logging to `api/chat.js`:
```javascript
console.log('Query:', message);
console.log('ChromaDB results:', queryResults);
```

## 📈 **Monitoring & Analytics**

### **Vercel Analytics**
- View API function performance
- Monitor error rates
- Track usage patterns

### **OpenAI Usage**
- Monitor token usage
- Track API costs
- View response quality

## 🔒 **Security Considerations**

### **API Key Security**
- Never commit API keys to Git
- Use environment variables
- Rotate keys regularly

### **Rate Limiting**
- Consider adding rate limiting
- Monitor for abuse
- Set up alerts

## 🚀 **Advanced Features**

### **Future Enhancements**
1. **Conversation History**: Store chat history
2. **File Upload**: Allow users to upload documents
3. **Analytics**: Track popular questions
4. **Customization**: Personalize responses
5. **Integration**: Connect with other services

### **Scaling Up**
- Upgrade ChromaDB plan
- Use more powerful OpenAI models
- Add caching layer
- Implement CDN

## 📞 **Support**

If you encounter issues:
1. Check the troubleshooting section
2. Review Vercel logs
3. Test locally first
4. Check environment variables
5. Verify ChromaDB connection

## 🎉 **Success Checklist**

- [ ] ChromaDB is running and accessible
- [ ] Environment variables are set
- [ ] Content is populated in ChromaDB
- [ ] API endpoint responds correctly
- [ ] Frontend connects to API
- [ ] Chatbot UI works properly
- [ ] Deployment is successful
- [ ] Domain is configured
- [ ] SSL certificate is active

## 💡 **Pro Tips**

1. **Start Simple**: Deploy with basic functionality first
2. **Monitor Costs**: Keep an eye on API usage
3. **Test Thoroughly**: Test all features before going live
4. **Backup Data**: Regularly backup your ChromaDB content
5. **Update Content**: Keep your knowledge base current
6. **Optimize Responses**: Fine-tune prompts for better answers
7. **User Feedback**: Collect feedback to improve the chatbot

---

**Ready to deploy?** Follow the steps above and you'll have a fully functional RAG chatbot integrated with your personal website! 🚀
