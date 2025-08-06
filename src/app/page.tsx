import Game from '@/components/Game/Game'
import clientPromise from '@/lib/mongo'
import type { WordOfTheDay } from '@/models/word'
import { notFound } from 'next/navigation'

export default async function Page() {
	try {
		const client = await clientPromise
		const db = client.db('definidle')
		const collection = db.collection<WordOfTheDay>('dailyWords')

		const wordData = await collection.findOne({ _id: 'current' })

		if (!wordData) {
			notFound()
		}

		return <Game wordData={wordData} />
	} catch (error) {
		console.error('Error fetching word data:', error)
		notFound()
	}
}
