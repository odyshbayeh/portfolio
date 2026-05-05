import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import { styles } from "../styles";
import { services } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import { SectionWrapper } from "../hoc";

const ServiceCard = ({ index, title, icon, icons }) => {
  return (
    <Tilt className="xs:w-[250px] w-full">
      <motion.div
        variants={fadeIn("right", "spring", 0.5 * index, 0.75)}
        className="w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card"
      >
        <div
          options={{
            max: 45,
            scale: 1,
            speed: 450,
          }}
          className="bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col"
        >
          {icons ? (
            <div className="service-store-icons" aria-label={title}>
              {icons.map((serviceIcon) => (
                <span
                  className="service-store-icon"
                  key={serviceIcon.name}
                  role="img"
                  aria-label={serviceIcon.name}
                  style={{
                    "--service-icon-url": `url(${serviceIcon.src})`,
                  }}
                />
              ))}
            </div>
          ) : (
            <img src={icon} alt={title} className="w-16 h-16 object-contain" />
          )}
          <h3 className="text-white text-[20px] font-bold text-center">
            {title}
          </h3>
        </div>
      </motion.div>
    </Tilt>
  );
};

const About = () => {
  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={styles.sectionSubText}>Introduction</p>
        <h2 className={styles.sectionHeadText}>Overview.</h2>
      </motion.div>

      <motion.p
        variants={fadeIn("", "", 0.1, 1)}
        className="mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]"
      >
        Computer Engineer graduate with a strong foundation in programming,
        software development. Equipped with hands-on experience in Java, Python,
        and C++, along with a solid understanding of web development
        technologies. A quick learner with a passion for problem-solving and a
        collaborative mindset. Eager to contribute to innovative projects and
        leverage academic knowledge in a dynamic professional setting..
      </motion.p>

      <div className="mt-12 sm:mt-20 flex flex-wrap justify-center lg:justify-start gap-6 sm:gap-10">
        {services.map((service, index) => (
          <ServiceCard key={service.title} index={index} {...service} />
        ))}
      </div>
    </>
  );
};

export default SectionWrapper(About, "about");
