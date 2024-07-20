import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <div className="col-6 mx-auto text-center py-2">
      <Link href={"/auth/signin"}>Login</Link>
    </div>
  );
}
