import clientPromise from './mongo'
import type { WordOfTheDay, WordMeaning } from '@/models/word'

const RANDOM_WORD_API = 'https://random-word-api.vercel.app/api?words=1'
const DICTIONARY_API = 'https://api.dictionaryapi.dev/api/v2/entries/en/'
const GLOBAL_DELAY = 10_000

function delay(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms))
}

interface DictionaryEntry {
	word: string
	meanings: Array<{
		partOfSpeech: string
		definitions: Array<{
			definition: string
			synonyms?: string[]
			antonyms?: string[]
			example?: string
		}>
	}>
}

export async function fetchAndStoreWord(): Promise<WordOfTheDay> {
	const client = await clientPromise
	const db = client.db('definidle')
	const collection = db.collection<WordOfTheDay>('dailyWords')

	while (true) {
		try {
			const response = await fetch(RANDOM_WORD_API)
			if (!response.ok) {
				await delay(GLOBAL_DELAY)
				continue
			}

			const [word] = await response.json()
			if (!word || typeof word !== 'string') {
				await delay(GLOBAL_DELAY)
				continue
			}

			const dictResponse = await fetch(DICTIONARY_API + word)
			if (!dictResponse.ok) {
				await delay(GLOBAL_DELAY)
				continue
			}

			const dictData: DictionaryEntry[] = await dictResponse.json()
			if (!Array.isArray(dictData) || dictData.length === 0) {
				await delay(GLOBAL_DELAY)
				continue
			}

			const entry = dictData[0]
			if (!entry.meanings || entry.meanings.length === 0) {
				await delay(GLOBAL_DELAY)
				continue
			}

			const meanings: WordMeaning[] = entry.meanings
				.filter((m) => m.definitions && m.definitions.length > 0)
				.map((m) => ({
					partOfSpeech: m.partOfSpeech || 'unknown',
					definitions: m.definitions.map((d) => ({
						definition: d.definition || '',
						synonyms: d.synonyms || [],
						antonyms: d.antonyms || [],
						examples: d.example ? [d.example] : [],
					})),
				}))

			if (meanings.length === 0) {
				await delay(GLOBAL_DELAY)
				continue
			}

			const wordDoc: WordOfTheDay = {
				_id: 'current',
				word: entry.word,
				meanings,
			}

			await collection.updateOne(
				{ _id: 'current' },
				{ $set: wordDoc },
				{ upsert: true }
			)

			return wordDoc
		} catch (error) {
			console.error('Error fetching/storing word:', error)
			await delay(GLOBAL_DELAY)
		}
	}
}
