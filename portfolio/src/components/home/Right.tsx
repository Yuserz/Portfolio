import profile from "../../assets/images/profile.svg";
import { motion } from "framer-motion";
export default function Right() {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ rotate: 360, scale: 1 }}
      transition={{
        delay: 0.8,
        type: "spring",
        stiffness: 260,
        damping: 20,
      }}
    >
      <div className="flex w-full justify-end xs:justify-center sm:justify-center md:justify-center ">
        <img
          className=" w-[80%]  xs:w-full sm:w-full md:w-full "
          src={profile}
        ></img>
      </div>
    </motion.div>
  );
}
