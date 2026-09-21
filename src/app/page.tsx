import { redirect } from "next/navigation";

/** La raíz redirige al idioma principal (español). */
export default function RootPage() {
  redirect("/es");
}
