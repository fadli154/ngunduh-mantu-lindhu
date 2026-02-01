import { Grey_Qo } from "next/font/google";
import clsx from "clsx";

const greGrey_Qo = Grey_Qo({ subsets: ["latin"], weight: "400" });

export default function Brand() {
  return (
    <div
      className={clsx(
        greGrey_Qo.className,
        "text-3xl lg:text-4xl 2xl:text-5xl tracking-widest text-text-500 font-bold drop-shadow-sm drop-shadow-text-500",
      )}
    >
      Lindu & Fikha
    </div>
  );
}
