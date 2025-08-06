import React from 'react'
import styles from './styles.module.css'
import clsx from 'clsx'

interface QuoteProps {
	type: string
	content: React.ReactNode
}

export default function Quote({ type, content }: QuoteProps) {
	return (
		<div className={styles.quote}>
			<p className={styles.type}>{type}</p>
			<p className={styles.content}>{content}</p>
		</div>
	)
}
