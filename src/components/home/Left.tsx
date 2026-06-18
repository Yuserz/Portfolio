import { motion } from "framer-motion";
import arrow from "../../assets/icons/arrow.svg";
import {
  PROFILE,
  gmailComposeUrl,
  staggerContainer,
  fadeInLeft,
} from "../../constants";
import MagneticButton from "../ui/MagneticButton";
import SocialLinks from "../ui/SocialLinks";

export default function Left() {
  return (
    <motion.div
      className="flex w-fit flex-col gap-4"
      variants={staggerContainer(0.12, 0.2)}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="my-name whitespace-nowrap" variants={fadeInLeft}>
        Hi, I&rsquo;m {PROFILE.name},
      </motion.h1>
      <motion.h2 className="title whitespace-nowrap" variants={fadeInLeft}>
        {PROFILE.role}
      </motion.h2>

      <motion.p className="caption" variants={fadeInLeft}>
        {PROFILE.bio}
      </motion.p>

      <motion.div className="contact-container" variants={fadeInLeft}>
        <MagneticButton
          className="contact-btn whitespace-nowrap"
          onClick={() =>
            window.open(gmailComposeUrl(PROFILE.email), "_blank", "noopener")
          }
        >
          Get in touch{" "}
          <img
            className="mt-[2px] h-4 w-8"
            src={arrow}
            alt=""
            aria-hidden="true"
          />
        </MagneticButton>

        <SocialLinks className="xs:mt-2 sm:mt-2" />
      </motion.div>
    </motion.div>
  );
}
