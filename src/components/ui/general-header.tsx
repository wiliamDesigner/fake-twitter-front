import { faArrowAltCircleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { ReactNode } from "react"; 

type Props = {
  children: ReactNode;
  backHref: string;
};

export const GeneralHeader = ({ children, backHref }: Props) => {
  return (
    <header className="flex items-start gap-4 px-6 py-4">
      
      <Link
        href={backHref}
        className="flex justify-center items-center border-2 border-gray-500 size-12 rounded-full"
      >
        <FontAwesomeIcon icon={faArrowAltCircleLeft} className="size-6" />
      </Link>

      <div className="flex-1">{children}</div> 

    </header>
  );
};