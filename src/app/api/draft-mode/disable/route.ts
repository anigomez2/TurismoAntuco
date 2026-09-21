import { draftMode } from "next/headers";
import { NextResponse } from "next/server";

/** Sale de la vista previa de borradores. */
export async function GET(request: Request) {
  (await draftMode()).disable();
  const url = new URL(request.url);
  return NextResponse.redirect(new URL("/", url.origin));
}
