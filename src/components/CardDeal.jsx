import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { card } from "../assets";
import styles, { layout } from "../style";
import Button from "./Button";

const CardDeal = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const section = document.getElementById("card-deal-section");
      if (section) {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const windowHeight = window.innerHeight;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

        // Determine if section is in view
        if (scrollTop > sectionTop - windowHeight + sectionHeight / 2) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section id="card-deal-section" className={layout.section}>
      {/* Framer Motion animation for div coming from the top */}
      <motion.div
        className={layout.sectionInfo}
        initial={{ opacity: 0, y: -50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -50 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className={styles.heading2}>
          Find a better card deal <br className="sm:block hidden" />
          in few easy steps
        </h2>
        <p className={`${styles.paragraph} max-w-[470px] mt-5`}>
          Acru tortor, purus in mattis at sedinteger faucibus. Aliquet quis
          aliquet eget mauris tortor.c Aliquet ultrices ac, ametau.
        </p>
        <Button styles="mt-10" />
      </motion.div>

      {/* Framer Motion animation for div coming from below */}
      <motion.div
        className={layout.sectionImg}
        initial={{ opacity: 0, y: 50 }}
        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
        transition={{ duration: 0.5 }}
      >
        <img src={card} alt="card" className="w-[100%] h-[100%]" />
      </motion.div>
    </section>
  );
};

export default CardDeal;
