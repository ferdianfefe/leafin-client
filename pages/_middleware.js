import { NextResponse } from "next/server";
import config from "../config";

export async function middleware(req) {
  const res = NextResponse.next();
  const url = req.nextUrl.pathname;

  console.log(
    url.includes("/assets/") ||
      url.includes(".svg") ||
      url.includes(".png") ||
      url.includes(".ico") ||
      url.includes(".js") ||
      url.includes(".json")
  );
  if (
    url.includes("/assets/") ||
    url.includes(".svg") ||
    url.includes(".png") ||
    url.includes(".ico") ||
    url.includes(".js") ||
    url.includes(".json")
  ) {
    return res;
  }
  try {
    const data = await fetch(`${config.apiURL}/user/private`, {
      method: "GET",
      headers: {
        cookie: `refreshToken=${req.cookies.refreshToken}; accessToken=${req.cookies.accessToken};`,
        content: "application/json",
      },
    });
    const result = data.status;
    const cookie = data.headers.get("set-cookie")?.split(";");
    if (cookie != null) {
      res.cookie("accessToken", cookie[0].split("=")[1], {
        httpOnly: true,
        maxAge: cookie[1].split("=")[1] * 1000,
        // domain: con,
      });
    }

    if (
      result == 200 &&
      (url == "/signin" || url == "/signup" || url == "/home")
    ) {
      return res && NextResponse.redirect(new URL("/", req.url));
    } else if (
      result != 200 &&
      url !== "/signin" &&
      url !== "/signup" &&
      url !== "/home"
    ) {
      return NextResponse.redirect(new URL("/home", req.url));
    } else {
      return res;
    }
  } catch (err) {
    console.log("Error disini:" + err);
    if (
      url !== "/signin" &&
      url !== "/signup" &&
      url !== "/home" &&
      !url.includes("/assets/")
    ) {
      return NextResponse.redirect(new URL("/home", req.url));
    }
  }
}
