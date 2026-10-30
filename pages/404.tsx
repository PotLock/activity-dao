import Head from "next/head";
import Link from "next/link";
import { css } from "@emotion/css";

export default function NotFound() {
  return (
    <main className={css`min-height:100vh;display:flex;align-items:center;justify-content:center;background:#fffdf3;color:#171717;
      padding:clamp(20px,5vw,64px);font-family:system-ui,sans-serif;`}>
      <Head>
        <title>Page not found | ActivityDAO</title>
        <meta name="robots" content="noindex,follow" />
      </Head>
      <div className={css`max-width:620px;text-align:center`}>
        <p className={css`font-size:14px;letter-spacing:.14em;font-weight:800`}>404 · PAGE NOT FOUND</p>
        <h1 className={css`font-size:clamp(38px,7vw,72px);line-height:1.1;margin:20px 0`}>The activity you're looking for isn't here.</h1>
        <p className={css`line-height:1.65;font-size:18px`}>This community may have moved, or the link may be incorrect. Explore the directory to find a community around an activity you love.</p>
        <nav aria-label="404 navigation" className={css`display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:28px`}>
          <Link href="/daos" className={css`background:#facc15;color:#171717;border-radius:999px;padding:12px 20px;min-height:44px;display:inline-flex;align-items:center;font-weight:700`}>Explore communities</Link>
          <Link href="/" className={css`border:1px solid #171717;color:#171717;border-radius:999px;padding:12px 20px;min-height:44px;display:inline-flex;align-items:center`}>Return home</Link>
        </nav>
      </div>
    </main>
  );
}
