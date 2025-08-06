export interface Definition {
	definition: string
	synonyms: string[]
	antonyms: string[]
	examples: string[]
}

export interface WordMeaning {
	partOfSpeech: string
	definitions: Definition[]
}

export interface WordOfTheDay {
	_id: string
	word: string
	meanings: WordMeaning[]
}
