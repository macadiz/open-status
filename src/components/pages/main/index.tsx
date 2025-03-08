import { useEffect } from "react";

export const MainPage = () => {
  useEffect(() => {
    const resp = fetch("http://localhost:3000/hello");

    resp.then((r) => {
      console.log(r);
    });
  });

  return <p>Página principal</p>;
};
