import PlaceholderForm from '@/components/PlaceholderForm'
import styles from './page.module.scss'

export default function Home() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>空画像ジェネレーター</h1>
      <PlaceholderForm />
    </div>
  )
}