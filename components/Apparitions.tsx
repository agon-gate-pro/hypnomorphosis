"use client";

import { useEffect } from "react";

// Fait apparaître en douceur les éléments marqués .revele quand ils entrent à l'écran.
// Le décalage dans une rangée se règle dans la page avec la variable CSS --delai.
export default function Apparitions() {
  useEffect(() => {
    const observateur = new IntersectionObserver(
      (entrees) => entrees.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          observateur.unobserve(e.target);
        }
      }),
      { rootMargin: "0px 0px -12% 0px" },
    );
    document.querySelectorAll(".revele").forEach((el) => observateur.observe(el));
    return () => observateur.disconnect();
  }, []);
  return null;
}
