import styles from "@/components/styles/Home.module.scss";
import { configs } from "../config";

export default function Home() {
  async function a() {
    await fetch(`${configs.serverUrl}/api/hello`);
  }
  a();

  return (
    <section>
      <div className={styles.main}>hey babe {process.env.NEXT_PUBLIC_MARIO} </div>
    </section>
  );
}
