import { useEffect, useRef, useState } from "react";
import { stats } from "../constants";
import styles from '../style';

const StatsCounter = ({ id, value }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log("IntersectionObserver:", entry.isIntersecting);
        if (entry.isIntersecting) {
          let start = 0;
          let end = 0;

          // Extract numeric value from string
          if (value.includes("+")) {
            start = 100;
            end = parseInt(value.replace("+", ""));
          } else if (value.includes("M")) {
            start = 5;
            end = parseInt(value.replace("$", "").replace("M", "")) * 1000000;
          } else {
            start = 10;
            end = parseInt(value.replace("+", ""));
          }

          const duration = 3000; // Duration of the count animation in milliseconds
          const increment = Math.ceil((end - start) / (duration / 30)); // Adjust increment to fit duration

          const updateCount = () => {
            setCount((prevCount) => {
              const newCount = prevCount + increment;
              if (newCount < end) {
                setTimeout(updateCount, 30);
              } else {
                setCount(end); // Ensure the final count matches the end value exactly
              }
              return Math.min(newCount, end);
            });
          };

          updateCount();
        }
      });
    });

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [value]);

  return <h4 ref={ref} className="font-poppins font-semibold xs:text-[40px] text-[30px] xs:leading-[53px] leading-[43px] text-white">{isNaN(count) ? value : count + (value.includes("+") ? "+" : "")}</h4>;
};

const Stats = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        console.log("Section is in view:", entry.isIntersecting);
        if (entry.isIntersecting) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      });
    });

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className={`${styles.flexCenter} flex-row flex-wrap sm:mb-20 mb-6`}>
      {stats.map((stat) => (
        <div key={stat.id} className={`flex-1 flex justify-start items-center flex-row m-3`}>
          <StatsCounter id={stat.id} value={isVisible ? stat.value : "0"} />
          <p className="font-poppins font-normal xs:text-[20px] text-[15px] xs:leading-[26px] leading-[21px] text-gradient uppercase ml-3">{stat.title}</p>
        </div>
      ))}
    </section>
  );
};

export default Stats;
