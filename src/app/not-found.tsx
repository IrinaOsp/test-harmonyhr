import Link from "next/link";

export default function NotFound() {
  return (
    <div className="w-full h-full text-center">
      <h1 className="text-3xl font-bold my-[10%]">
        The page you are looking for was not found
      </h1>
      <Link href="/" className="p-4 text-xl rounded-lg border">
        Go Home
      </Link>
    </div>
  );
}
