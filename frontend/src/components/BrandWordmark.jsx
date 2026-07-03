import { motion } from "framer-motion";
import { useBrand } from "@/hooks/useBrand";

export const WORDMARK_EASE = [0.22, 1, 0.36, 1];

export const letterContainer = {
  animate: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
};

export const letterVariant = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: WORDMARK_EASE },
  },
};

const logoVariant = {
  initial: { opacity: 0, y: 28, filter: "blur(8px)", scale: 0.92 },
  animate: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: { duration: 0.55, ease: WORDMARK_EASE },
  },
};

const SIZE_CLASSES = {
  hero: "text-6xl md:text-8xl lg:text-9xl",
  nav: "text-lg",
};

const LOGO_HEIGHT = {
  hero: "h-16 md:h-24 lg:h-28",
  nav: "h-8",
};

function splitWordmark(name) {
  return [...name];
}

function BrandLogo({ size, animateLetters, className = "" }) {
  const { brand } = useBrand();
  const logo = brand.assets.logo;
  const label = brand.legalName || brand.name;
  const heightClass = LOGO_HEIGHT[size];

  if (animateLetters) {
    return (
      <motion.div
        className="flex items-center justify-center"
        initial="initial"
        animate="animate"
      >
        <motion.img
          src={logo}
          alt={label}
          variants={logoVariant}
          className={`w-auto object-contain object-left ${heightClass} ${className}`}
        />
      </motion.div>
    );
  }

  return (
    <img
      src={logo}
      alt={label}
      className={`w-auto object-contain object-left ${heightClass} ${className}`}
    />
  );
}

export default function BrandWordmark({
  size = "nav",
  animateLetters = false,
  className = "",
}) {
  const { brand } = useBrand();

  if (brand.assets.logo) {
    return <BrandLogo size={size} animateLetters={animateLetters} className={className} />;
  }

  const word = splitWordmark(brand.name);
  const textClass = `font-display font-black uppercase tracking-tighter text-brand-text leading-none ${SIZE_CLASSES[size]} ${className}`;

  if (animateLetters) {
    return (
      <motion.div
        className="flex items-center justify-center"
        variants={letterContainer}
        initial="initial"
        animate="animate"
        aria-label={brand.name}
      >
        {word.map((ch, i) => (
          <motion.span
            key={i}
            variants={letterVariant}
            aria-hidden="true"
            className={textClass}
          >
            {ch}
          </motion.span>
        ))}
      </motion.div>
    );
  }

  return (
    <span className={textClass} aria-label={brand.name}>
      {brand.name}
    </span>
  );
}
