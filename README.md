**Aquafuel Lab - Full-stack E-commerce Project with AI Shopping Assistant**

This is a Full Stack project designed to demonstrate modern web development practices. The goal was to build a scalable e-commerce platform, focusing on technical implementation (Front-end & Back-end architecture) rather than just UI design.
While the project was originally based on a JSMastery tutorial, it has been customized and re-branded for a fictional vitamin water brand, "Aquafuel Lab".
The application features an AI-powered customer support agent. Built with Google Gemini and RAG, the AI assistant answers questions using store data and provides product recommendations.
Some features are not available, and the interface is not optimized for mobile devices.

🌐 **Live Demo:** https://aquafuel-lab-store.vercel.app/



🛠️ **Key Features**

- AI Assistant: Context-aware chat assistant powered by Google Gemini Flash fueled with store data.
- Streaming Responses: Real-time text generation using Vercel AI SDK.
- Rate Limiting: Secured with Upstash Redis to prevent spam and abuse.
- Dynamic Content: Product data and assets are fetched from Sanity.io Headless CMS.
- Global State Management: Shopping cart logic powered by React Context API.
- Payments: Checkout integration with Stripe.
- Responsive UI: Custom animations, carousel effects, and hover interactions.
  

🏗️ **Tech Stack**

- Next.js
- React
- JavaScript
- Sanity.io
- Stripe
- Upstash Redis
- Google Gemini API & Vercel AI SDK
  

📁 **Project Structure**

- app/api/chat/route.js: Backend logic for the AI chatbot (handling prompts & rate limiting).
- components/ChatBot.js: Frontend UI for the chat interface.
- context/StateContext.js: Global state for managing the shopping cart.
- lib/client.js: Sanity client configuration.

  
🚀 **Getting Started**

- Clone repository: git clone https://github.com/jonijjoke/aquafuel-lab-store.git.
- Install dependencies: npm install
- Set up environment variables: Create a .env.local file in the root directory and add your API keys.
- Run development server: npm run dev
  

🧠 **Key Takeaways**

This practice project allowed me to deepen my expertise and provided valuable hands-on experience in the following areas:
- Full-stack Development: Managing the seamless integration between the frontend and third-party APIs like Sanity and Stripe.
- AI Integration & RAG: Implementing a context-aware AI assistant using Google Gemini. I learned how to use RAG (Retrieval-Augmented Generation) to ensure the AI provides accurate answers based on specific store data.
- State Management: Building and managing complex shopping cart logic, ensuring a consistent user experience across different components.
- Security: Understanding the critical importance of environment variables (.env) and how to properly secure sensitive API keys and secrets. Secure the AI assistant from spamming and abuse.

🔮 **Future Improvements**

- Mobile Optimization
- Codebase Maintainability: Adding code comments and to improve readability and long-term maintainability.
