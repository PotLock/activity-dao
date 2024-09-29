import type { NextPage } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Footer from "../components/Footer";

const Starter: NextPage = () => {
  return (
    <div
      className={css`
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        background-color: var(--background-default-default);
        color: var(--wwwgetminjiapp-black);
        font-family: var(--font-dynapuff);
      `}
    >
      {/* Centered navbar */}
      <div
        className={css`
          max-width: 1200px;
          margin: 0 auto;
          padding: 1rem;
          width: 100%;
        `}
      >
        <NAVBAR />
      </div>

      {/* Main content */}
      <main
        className={css`
          flex: 1 0 auto; // This will make the main content grow and shrink as needed
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        `}
      >
        <h1>Starter Page</h1>
        <p>Add your content here.</p>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Starter;
