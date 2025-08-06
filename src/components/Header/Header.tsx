import styles from './styles.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <h1 className={styles.title}>definidle</h1>
            <p className={styles.desc}>Guess the word by its definition</p>
        </header>
    )
}