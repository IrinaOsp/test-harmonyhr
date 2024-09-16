import { redirect } from "next/navigation";

export default function Home() {
  redirect("/my-info/time-off");
}
