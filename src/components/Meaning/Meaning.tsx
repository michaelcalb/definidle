'use client'

import { WordOfTheDay } from '@/models/word'
import PartOfSpeech from '@/components/PartOfSpeech/PartOfSpeech'
import Quote from '@/components/Quote/Quote'
import styles from './styles.module.css'
import clsx from 'clsx'
import SynAnt from '../SynAnt/SynAnt'

interface MeaningProps {
	wordData: WordOfTheDay
	attempts: number
	currentMeaningIndex: number
	setMeaningIndex: (index: number) => void
	gameOver: boolean
}

export default function Meaning({
	wordData,
	attempts,
	currentMeaningIndex,
	setMeaningIndex,
	gameOver,
}: MeaningProps) {
	const maskWord = (text: string): string => {
		if (attempts >= 5 || gameOver) return text
		
		const regex = new RegExp(wordData.word, 'gi')
		return text.replace(regex, '_____')
	}

	const meaning = wordData.meanings[currentMeaningIndex]
	const definition = meaning.definitions[0]

	/* example logic here so Quote.tsx is used only for rendering (cuz I want to :D ) */
	const attemptsUnlockEx = 2
	const isExUnlocked = attempts >= attemptsUnlockEx || gameOver
	const isExAvailable = definition.examples?.length > 0
	const getExampleContent = () => {
		return isExUnlocked ? (
			isExAvailable ? (
				<span>"{maskWord(definition.examples[0])}"</span>
			) : (
				<span className='notAvailable'>
					No example available
				</span>
			)
		) : (
			<span className='notAvailable'>
				{attemptsUnlockEx - attempts}{' '}
				{attemptsUnlockEx - attempts === 1 ? 'attempt' : 'attempts'} to
				unlock
			</span>
		)
	}

	return (
		<div className={styles.meaningContainer}>
			<div className={styles.meaning}>
				<div className={styles.box}>
					<PartOfSpeech partOfSpeech={meaning.partOfSpeech} />
					<Quote
						type='def'
						content={maskWord(definition.definition)}
					/>
				</div>
				<div className={styles.box}>
					<Quote
						type='e.g.'
						content={getExampleContent()}
					/>
				</div>
				<div className={styles.box}>
					<SynAnt
						attempts={attempts}
						synonyms={definition.synonyms}
						antonyms={definition.antonyms}
						gameOver={gameOver}
					/>
				</div>
			</div>

			<div className={styles.selectMeaningBox}>
				{wordData.meanings.map((_, index) => {
					const isUnlocked = index <= attempts || gameOver

					return (
						<button
							key={index}
							onClick={() => {
								setMeaningIndex(index)
							}}
							disabled={!isUnlocked}
							className={clsx(
								styles.selectMeaningBtn,
								isUnlocked
									? currentMeaningIndex === index
										? styles.selectMeaningBtnActive
										: null
									: null
							)}
						>
							{index + 1}
						</button>
					)
				})}
			</div>
		</div>
	)
}
