import Link from "next/link";

export default function Home() {
  return (
    <div className="col-6 mx-auto text-center py-2 d-flex flex-column gap-2">
      <Link href={"/auth/signin"}>Login</Link>
      <Link href={"/rfq/post"}>RFQ POST</Link>

    </div>
  );
}
