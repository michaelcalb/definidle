# Definidle  
**Guess the word by its definition.**  
[definidle](https://definidle.vercel.app/)

## ⚙️ Under the Hood

- A random word is fetched daily from the [Random Word API](https://random-word-api.vercel.app/).
- Definitions and metadata come from [dictionaryapi.dev](https://dictionaryapi.dev/).
- The word of the day is stored in **MongoDB**.
- An [Upstash Scheduler](https://upstash.com/scheduler) triggers the word update once a day.
- Hosted on **Vercel (free plan)**.

## ⚠️ Limitations

- Some words may **lack examples or synonyms/antonyms** due to API coverage gaps.
- Since most logic is client-sided, **cheating is easy** (intentionally to keep server lightweight).

*Built for learning purposes*
