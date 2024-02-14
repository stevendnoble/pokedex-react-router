import styles from "./Home.module.css";

export function Home() {
  return (
    <div className={styles.homeContainer}>
      <div className={styles.textContainer}>Welcome to My Pokédex App</div>
    </div>
  );
}
