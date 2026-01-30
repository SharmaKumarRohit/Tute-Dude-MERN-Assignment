import { createPortal } from "react-dom";
import { motion } from "motion/react";

const widthClasses = {
  md: "sm:w-md",
  xl: "sm:w-xl",
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modelVariants = {
  hidden: { opacity: 0, y: -40, filter: "blur(10px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { type: "spring", stiffness: 300, damping: 15 },
  },
  exit: { opacity: 0, y: 40, filter: "blur(10px)", scale: 0.95 },
};

function Model({ children, ModelClose, w = "md" }) {
  return createPortal(
    <>
      <motion.div
        variants={overlayVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        className="fixed inset-0 bg-black/10 backdrop-blur-xs z-40"
        onClick={ModelClose}
      ></motion.div>
      <motion.div
        variants={modelVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className={`fixed top-1/2 left-1/2 -translate-1/2 w-full ${widthClasses[w]} px-4 z-50`}
      >
        {children}
      </motion.div>
    </>,
    document.getElementById("model"),
  );
}

export default Model;
