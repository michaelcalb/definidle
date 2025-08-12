import Game from '@/components/Game/Game'
import clientPromise from '@/lib/mongo'
import type { WordOfTheDay } from '@/models/word'
import { notFound } from 'next/navigation'
import { unstable_cache } from 'next/cache'

const getWordData = unstable_cache(
	async () => {
		const client = await clientPromise
		const db = client.db('definidle')
		const collection = db.collection<WordOfTheDay>('dailyWords')
		const wordData = await collection.findOne({ _id: 'current' })
		return wordData
	},
	['word-data-cache'],
	{ tags: ['daily-word'] }
)

export default async function Page() {
	try {
		const wordData = await getWordData()

		if (!wordData) {
			notFound()
		}

		return <Game wordData={wordData} />
	} catch (error) {
		console.error('Error fetching word data:', error)
		notFound()
	}
}
