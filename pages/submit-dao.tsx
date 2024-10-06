import type { NextPage } from "next";
import { css } from "@emotion/css";
import NAVBAR from "../components/n-a-v-b-a-r";
import Footer from "../components/Footer";
import SubmitDAOForm from "../components/SubmitDAOForm";

const SubmitDAO: NextPage = () => {
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
          flex: 1 0 auto;
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
          align-items: center;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          width: 100%;
          margin-top: 2rem;
        `}
      >
        <h1
          className={css`
            font-size: var(--font-size-21xl);
            line-height: 3.844rem;
            font-weight: 600;
            margin-bottom: 1rem;
            text-align: center;
          `}
        >
          Submit a New DAO 🌟
        </h1>
        <h3
          className={css`
            font-size: var(--font-size-5xl);
            line-height: 2.469rem;
            font-weight: 400;
            font-family: var(--font-hanken-grotesk);
            margin-bottom: 2rem;
            text-align: center;
          `}
        >
          Add your Activity DAO to our directory and join the movement!
        </h3>
        <SubmitDAOForm />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default SubmitDAO;
