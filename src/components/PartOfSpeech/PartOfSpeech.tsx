'use client'

import styles from './styles.module.css'
import clsx from "clsx"

interface PartOfSpeechProps {
    partOfSpeech: string
}

export default function PartOfSpeech({ partOfSpeech }: PartOfSpeechProps) {
    return (
        <div className={clsx(styles.container, styles[partOfSpeech])}>
            <span>
                {partOfSpeech}
            </span>
        </div>
    )
}