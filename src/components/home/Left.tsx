import { motion } from "framer-motion";
import { Link as LinkScroll } from "react-scroll";
import { HERO, PROFILE, staggerContainer, fadeInLeft } from "../../constants";

export default function Left() {
  return (
    <motion.div
      className="flex-1 flex flex-col gap-stack-sm"
      variants={staggerContainer(0.12, 0.2)}
      initial="hidden"
      animate="visible"
    >
      <motion.p variants={fadeInLeft} className="term-prompt flex items-center gap-2">
        <span>
          {HERO.prompt} <span className="cursor-block" aria-hidden="true" />
        </span>
        <span className="text-on-primary font-mono text-[12px]">{HERO.version}</span>
      </motion.p>

      <motion.h1
        variants={fadeInLeft}
        className="font-headline text-headline-lg-mobile lg:text-headline-xl text-on-primary leading-[1.15]"
      >
        {HERO.headline.map((line) => (
          <span key={line} className="block">
            {line}
          </span>
        ))}
      </motion.h1>

      <motion.p
        variants={fadeInLeft}
        className="font-body text-body-lg max-w-2xl text-inverse-primary"
      >
        {HERO.body}
      </motion.p>

      <motion.div variants={fadeInLeft} className="flex gap-4 pt-4 flex-wrap">
        <LinkScroll
          to="work"
          smooth={true}
          offset={-70}
          duration={500}
          className="btn-solid cursor-pointer"
        >
          {HERO.ctaWork}
        </LinkScroll>
        <a
          href={PROFILE.resumeUrl}
          target="_blank"
          rel="noreferrer"
          className="btn-ghost"
        >
          {HERO.ctaResume}
        </a>
      </motion.div>
    </motion.div>
  );
}
