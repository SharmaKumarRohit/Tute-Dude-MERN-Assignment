import { createPortal } from "react-dom";

const widthClasses = {
  md: "sm:w-md",
  xl: "sm:w-xl",
};

function Model({ children, ModelClose, w = "md" }) {
  return createPortal(
    <>
      <div
        className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40"
        onClick={ModelClose}
      ></div>
      <div
        className={`fixed top-1/2 left-1/2 -translate-1/2 w-full ${widthClasses[w]} px-4 z-50`}
      >
        {children}
      </div>
    </>,
    document.getElementById("model"),
  );
}

export default Model;
