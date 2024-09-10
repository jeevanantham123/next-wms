import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col w-full h-full justify-center gap-2 items-center">
      <h2>404 Not Found!</h2>
      <p>Could not find requested resource</p>
      <Link href="/" className="bg-blue-400 rounded-[6px] p-2">
        Return Home
      </Link>
    </div>
  );
}
