'use client'

import React from 'react'

import { useState, useEffect, useCallback } from 'react'
import type { WordOfTheDay } from '@/models/word'
import Meaning from '@/components/Meaning/Meaning'
import styles from './styles.module.css'

import { Send, Heart } from 'lucide-react'
import GameOverModal from '../GameOverModal/GameOverModal'

interface GameProps {
	wordData: WordOfTheDay
}

interface GameStats {
	losses: number
	attempts: number[]
}

export default function Game({ wordData }: GameProps) {
	const maxAttempts = 5
	const word = wordData.word.toLowerCase()

	const [guess, setGuess] = useState('')
	const [attempts, setAttempts] = useState(0)
	const [currentMeaningIndex, setCurrentMeaningIndex] = useState(0)
	const [gameOver, setGameOver] = useState(false)
	const [gameWon, setGameWon] = useState(false)
	const [showModal, setShowModal] = useState(false)

	const handleGuess = useCallback(() => {
		if (gameOver || gameWon || !guess.trim()) return

		const normalizedGuess = guess.trim().toLowerCase()

		if (normalizedGuess === word) {
			setGameWon(true)
			setGameOver(true)
			setShowModal(true)
		} else {
			const newAttempts = attempts + 1
			setAttempts(newAttempts)

			if (newAttempts >= maxAttempts) {
				setGameOver(true)
				setShowModal(true)
			} else if (currentMeaningIndex < wordData.meanings.length - 1) {
				attempts < wordData.meanings.length - 1 ? setCurrentMeaningIndex(attempts + 1) : attempts === wordData.meanings.length - 1 ? setCurrentMeaningIndex(attempts) : null
			}
		}

		setGuess('')
	}, [
		guess,
		gameOver,
		gameWon,
		word,
		showModal,
		attempts,
		maxAttempts,
		currentMeaningIndex,
		wordData.meanings.length,
	])

	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter') {
				handleGuess()
			}
		},
		[handleGuess]
	)

	return (
		<main className={styles.main}>
			<div className={styles.gameContent}>
				<Meaning
					wordData={wordData}
					attempts={attempts}
					currentMeaningIndex={currentMeaningIndex}
					setMeaningIndex={setCurrentMeaningIndex}
					gameOver={gameOver}
				/>
				<div className={styles.guessBox}>
					<input
						type='text'
						value={guess}
						onChange={(e) => setGuess(e.target.value)}
						disabled={gameOver || gameWon}
						placeholder='Enter your guess'
						onKeyDown={handleKeyDown}
						autoFocus
						spellCheck={false}
						className={styles.guessInput}
					/>
					<button
						onClick={handleGuess}
						disabled={gameOver || gameWon || !guess.trim()}
						className={styles.guessBtn}
					>
						<Send size={30}/>
					</button>
				</div>
				<div className={styles.lifeBox}>
					{Array.from({ length: maxAttempts - attempts }, (_, index) => (
						<Heart key={index} size={25} className={styles.life} />
					))}
					{Array.from({ length: attempts }, (_, index) => (
						<Heart key={index} size={25} className={styles.heart} />
					))}
				</div>

				{gameOver && showModal && (
					<GameOverModal
						attempts={attempts}
						gameWon={gameWon}
						word={wordData.word}
						setShowModal={setShowModal}
					/>
				)}
			</div>
		</main>
	)
}
