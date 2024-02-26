import { createPortal } from "react-dom";

interface Props { children: any, setVisible: any }

export default function ModalScreen(props: Props) {
  const { children, setVisible } = props
  return createPortal(
    <div
      onClick={(e) => {
        e.stopPropagation();
        setVisible(false);
      }}
      className="z-50 rounded-none backdrop-blur-xl bg-light/10 dark:bg-dark/10 fixed top-0 md:top-10 flex items-center justify-center float-right w-screen h-screen"
    >
      <div
        data-aos="fade-up"
        className="relative rounded-none sm:-mt-20 w-screen h-screen overflow-y-scroll max-h-none sm:max-h-[90vh] py-0 flex flex-col gap-2 bg-white dark:border-2 dark:border-primary/25 dark:bg-dark dark:shadow-none sm:h-fit sm:w-fit sm:rounded-xl shadow-card max-w-none sm:max-w-[90%]"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.getElementById("modal")!
  );
}