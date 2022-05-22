import styles from "../styles/Home.module.css";
import { Toolbar } from "../component/Toolbar";

export default function Home() {
  return (
    <div className="page-container">
      <Toolbar />
      <div className={styles.main}>
        <h1>Next.js new app</h1>
      </div>
    </div>
  );
}
