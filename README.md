# 📖 Definidle  
**Guess the word by its definition.**  
[definidle](https://definidle.vercel.app/)

## 🧠 What is it?

**Definidle** is a simple Wordle-style game where you guess a daily word based on its:

- ✅ Definition  
- 💬 Examples *(when available)*  
- 🔄 Synonyms & Antonyms *(when available)*  

## ⚙️ How it works

- A random word is fetched daily from the [Random Word API](https://random-word-api.vercel.app/).
- Definitions and metadata come from [dictionaryapi.dev](https://dictionaryapi.dev/).
- The word of the day is stored in **MongoDB**.
- An [Upstash Scheduler](https://upstash.com/scheduler) triggers the word update once a day.
- Hosted on **Vercel (free plan)**.

## ⚠️ Limitations

- Some words may **lack examples or synonyms/antonyms** due to API coverage gaps.
- Since most logic is client-side, **cheating is easy** (intentionally kept lightweight).

## 🛠️ Built with

- [Next.js](https://nextjs.org/)  
- [random-word-api](https://random-word-api.vercel.app/)  
- [dictionaryapi.dev](https://dictionaryapi.dev/)  
- [MongoDB](https://www.mongodb.com/)  
- [Upstash Scheduler](https://upstash.com/scheduler)  
- [Vercel](https://vercel.com/) *(free tier)*  

💡 *Built just for fun and learning Next.js.*
