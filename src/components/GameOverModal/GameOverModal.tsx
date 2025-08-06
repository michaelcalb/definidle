import { useEffect, useState } from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

import { X } from 'lucide-react'

interface GameOverModalProps {
    attempts: number
    gameWon: boolean
	word: string
	setShowModal: (state: boolean) => void
}

export default function GameOverModal({ attempts, gameWon, word, setShowModal }: GameOverModalProps) {
    const [timeLeft, setTimeLeft] = useState('')
	const [invisible, setInvisible] = useState(true)

    useEffect(() => {
		const updateTimer = () => {
			const now = new Date()
			const nextMidnight = new Date(
				Date.UTC(
					now.getUTCFullYear(),
					now.getUTCMonth(),
					now.getUTCDate() + 1,
					0,
					0,
					0
				)
			)
			const diffMs = nextMidnight.getTime() - now.getTime()

			if (diffMs <= 0) {
				setTimeLeft('00:00:00')
				window.location.reload()
			}

			const h = Math.floor(diffMs / (1000 * 60 * 60))
				.toString()
				.padStart(2, '0')
			const m = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
				.toString()
				.padStart(2, '0')
			const s = Math.floor((diffMs % (1000 * 60)) / 1000)
				.toString()
				.padStart(2, '0')

			setTimeLeft(`${h}:${m}:${s}`)
		}

		updateTimer()
		const interval = setInterval(updateTimer, 1000)
		return () => clearInterval(interval)
	}, [])

	useEffect(() => {
		const timeout = setTimeout(() => setInvisible(false), 100)
		return () => clearTimeout(timeout)
	}, [])
   
    return (
        <div className={clsx(styles.gameOverModal, invisible ? styles.invisible : null)}>
            <div className={styles.modalContent}>
				<button className={styles.closeBtn}
					onClick={() => setShowModal(false)}
				>
					<X size={30}/>
				</button>
				<h2 className={styles.title}>{gameWon ? 'GG! :D' : 'Game Over :('}</h2>
				<div className={styles.group}>
					<p className={styles.wordText}>Today's word was: <span className={styles.word}>{word}</span></p>
					{gameWon && (
						<p className={styles.attemptsText}>
							You guessed it in <span className={styles.attempts}>{attempts + 1}{' '}</span>
							{attempts === 0 ? 'attempt' : 'attempts'}!
						</p>
					)}
				</div>
				<p className={styles.nextWord}>Next word in: <span className={styles.nextWordTimer}>{timeLeft}</span></p>
			</div>
        </div>
    )
}