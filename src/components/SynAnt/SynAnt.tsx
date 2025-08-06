import React, { useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface SynAntProps {
	attempts: number
	synonyms: string[]
	antonyms: string[]
	gameOver: boolean
}

type ListType = 'synonyms' | 'antonyms'

export default function SynAnt({ attempts, synonyms = [], antonyms = [], gameOver }: SynAntProps) {
	const [activeListType, setActiveListType] = useState<ListType>('synonyms')

	const getActiveList = (): string[] => {
		return activeListType === 'synonyms' ? synonyms : antonyms
	}

	const activeList = getActiveList()

	const attemptsUnlock = 4
	const isUnlocked = attempts >= attemptsUnlock || gameOver
	const isAvailable = activeList.length > 0
	const getContent = () => {
		return isUnlocked ? (
			isAvailable ? (
				activeList.map((word, index) => (
					<span
						key={index}
						className={styles.contentListSpan}
					>
						{word}
					</span>
				))
			) : (
				<span className='notAvailable'>
					No {activeListType} available
				</span>
			)
		) : (
			<span className='notAvailable'>
				{attemptsUnlock - attempts}{' '}
				{attemptsUnlock - attempts === 1 ? 'attempt' : 'attempts'}{' '}
				to unlock
			</span>
		)
	}


	return (
		<div className={styles.synAnt}>
			<div className={styles.btnBox}>
				<button
					onClick={() => setActiveListType('synonyms')}
					className={clsx(styles.btn, styles.synBtn, activeListType === 'synonyms' ? styles.activeBtn : null)}
				>
					synonyms
				</button>
				<button
					onClick={() => setActiveListType('antonyms')}
					className={clsx(styles.btn, styles.antBtn, activeListType === 'antonyms' ? styles.activeBtn : null)}
				>
					antonyms
				</button>
			</div>
			<p className={styles.content}>
				{getContent()}
			</p>
		</div>
	)
}
