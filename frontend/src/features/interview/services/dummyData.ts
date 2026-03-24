import type { InterviewReport } from "../types/types";

export const dummyReport: InterviewReport = {
  candidateName: "Arjun Sharma",
  roleAppliedFor: "Backend Developer — TechFlow Pvt. Ltd.",
  overallMatchScore: "Medium",
  summary:
    "Arjun presents a solid foundation in Node.js, TypeScript, and React, backed by real shipped projects and active DSA practice. His hands-on work with JWT authentication, Prisma ORM, and REST API design aligns well with core job requirements. The primary gaps are around cloud deployment (AWS), Redis caching, and production-level system design — skills typically built through professional experience. For a junior-level position, Arjun is a strong candidate; for this mid-level opening, he is close but will need to demonstrate growth in infrastructure and scalability thinking.",

  strengths: [
    "Strong practical Node.js and Express.js skills demonstrated through multiple shipped projects.",
    "TypeScript proficiency — uses interfaces, generics, and strict mode in real codebases.",
    "JWT authentication with refresh token rotation implemented from scratch.",
    "Comfortable with both PostgreSQL (via Prisma ORM) and MongoDB.",
    "200+ DSA problems solved — shows consistent problem-solving habit.",
    "Built and deployed full-stack projects independently (Railway + Vercel).",
    "Active learner — recently integrated Gemini API and explored AI tooling.",
  ],

  skillGaps: [
    "Cloud Deployment (AWS): No hands-on experience with EC2, S3, RDS, or Lambda. Required for this role.",
    "Redis & Caching: Listed as 'good to have' — candidate has no exposure to caching strategies.",
    "Microservices: No demonstrated experience designing or operating distributed services.",
    "CI/CD Pipelines: No mention of GitHub Actions, Docker Compose for prod, or deployment automation.",
    "Testing: No unit or integration tests mentioned in any project — Jest/Supertest experience missing.",
    "System Design: Limited experience with scalability patterns, load balancing, and distributed systems.",
    "Database Optimization: Basic Prisma usage shown — no evidence of query optimization or indexing knowledge.",
  ],

  technicalQuestions: [
    "Walk me through the architecture of your DevConnect project. How did you structure the backend, and what trade-offs did you make?",
    "You implemented JWT with refresh token rotation. How does that work, and what security vulnerabilities does it protect against?",
    "How would you add Redis caching to one of your existing Express APIs? What would you cache and why?",
    "The job requires PostgreSQL experience. You've used Prisma — can you write a raw SQL query to fetch the top 5 users by post count with their latest post?",
    "Explain the Node.js event loop. What happens when you run a CPU-intensive task inside a request handler?",
    "You've used Prisma ORM. What are the trade-offs of using an ORM vs writing raw SQL in a production backend?",
    "How would you design a rate limiter for a public REST API? Walk me through the data structures and storage you'd use.",
    "In your AI Quiz Generator, how did you handle Gemini API failures? What retry or fallback strategy did you implement?",
    "What is database indexing and when would you add an index to a PostgreSQL table?",
    "How would you deploy your Node.js app to AWS? Which services would you use and why?",
  ],

  behavioralQuestions: [
    "Tell me about a time a feature you built broke in production (or in testing). How did you debug it and what did you learn?",
    "You've worked solo on all your projects. How do you think you'd adapt to working on a shared codebase with code reviews and team conventions?",
    "Describe a situation where you had to learn something completely new under time pressure. What was your approach?",
    "You mentioned solving 200+ DSA problems. Tell me about one problem that genuinely changed how you think about writing code.",
    "How do you decide when a feature is 'done enough' to ship versus when it needs more polish or refactoring?",
    "Where do you see yourself in 2 years? What specific skills are you actively working to build right now?",
    "Tell me about a technical decision you made in a project that you later regretted. What would you do differently?",
  ],

  preparationPlan: [
    "**Address the experience gap honestly:** Prepare a clear 2-minute intro that positions your project work as real-world experience. Don't downplay it — you shipped production apps. Lead with that.",
    "**Deep-dive your own projects:** For each project, prepare to explain: the architecture, why you chose each technology, what broke, how you fixed it, and what you'd change now. Interviewers love specifics.",
    "**Study PostgreSQL beyond Prisma:** Learn raw SQL — JOINs, CTEs, window functions, EXPLAIN ANALYZE. Set up a local DB and practice queries without an ORM for one week.",
    "**Learn Redis basics:** Understand caching strategies (cache-aside, write-through), TTL, and invalidation. Build a small Express endpoint that caches a DB response in Redis.",
    "**AWS fundamentals sprint:** Focus on EC2, S3, RDS, and Elastic Beanstalk or App Runner for deploying a Node.js app. Follow a hands-on tutorial and deploy one of your existing projects.",
    "**Add tests to one project:** Write Jest unit tests and Supertest integration tests for your most complex Express API. This directly addresses the biggest gap on your resume.",
    "**System design prep:** Study the basics — load balancing, horizontal vs vertical scaling, CDN, database replication. Watch 3-4 system design videos on YouTube (ByteByteGo is excellent).",
    "**Prepare smart questions for the interviewer:** Ask about the team's current stack, biggest technical challenge, and how they run code reviews. This signals seniority and genuine interest.",
  ],
};