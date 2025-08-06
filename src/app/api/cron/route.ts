import { NextResponse } from 'next/server'
import { fetchAndStoreWord } from '@/lib/fetchWord'
import { revalidatePath } from 'next/cache'

export async function GET(request: Request) {
	const key = request.headers.get('x-api-key')
	const expected = process.env.INTERNAL_API_SECRET_KEY

	if (!key || key !== expected) {
		console.log('Unauthorized cron attempt:', {
			hasKey: !!key,
			keyMatch: key === expected,
			timestamp: new Date().toISOString(),
		})
		return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
	}

	try {
		console.log('Starting daily word fetch:', new Date().toISOString())
		const storedWord = await fetchAndStoreWord()
		console.log('Successfully stored word:', storedWord.word)

		revalidatePath('/')

		return NextResponse.json({
			status: 'success',
			message: 'Word fetched and stored successfully',
			word: storedWord.word,
			timestamp: new Date().toISOString(),
		})
	} catch (error) {
		console.error('Cron job failed:', {
			error: error instanceof Error ? error.message : 'Unknown error',
			stack: error instanceof Error ? error.stack : undefined,
			timestamp: new Date().toISOString(),
		})

		return NextResponse.json(
			{
				error: 'Failed to fetch/store word',
				timestamp: new Date().toISOString(),
			},
			{ status: 500 }
		)
	}
}
