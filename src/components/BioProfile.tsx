import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { bioProfileStyles, bioProfileClasses } from './BioProfile.styles';

// Custom Time Component to replace Framer's TimeComponent
const TimeDisplay = ({ format }: { format: 'time' | 'date' }) => {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setDate(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (format === 'time') {
    // Format: HH:MM:SS
    return (
      <span className={bioProfileClasses.timeText} style={bioProfileStyles.timeText}>
        {date.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </span>
    );
  } else {
    // Format: Day, Month Date, Year (e.g. Wednesday, January 29, 2026)
    return (
      <span className={bioProfileClasses.timeText} style={bioProfileStyles.timeText}>
        {date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
      </span>
    );
  }
};

export const BioProfile: React.FC = () => {
  return (
    <motion.div 
      style={bioProfileStyles.container}
      layoutId="UjCcZTG6Q"
    >
      <div style={bioProfileStyles.header}>
        <motion.div 
          style={bioProfileStyles.statusDot} 
          layoutId="mPPaLHJoU"
        />
        <motion.div style={bioProfileStyles.headerText} layoutId="lhqGUHMZm">
          <motion.p style={bioProfileStyles.name} layoutId="HZY55POVA">Yi Xiang</motion.p>
          <motion.p style={bioProfileStyles.role} layoutId="UB59BJdox">Product Designer</motion.p>
        </motion.div>
      </div>

      <motion.div className={bioProfileClasses.dividerWrapper} style={bioProfileStyles.dividerWrapper} layoutId="Qz0FDZvrz">
        <motion.div style={bioProfileStyles.divider} layoutId="I4KjaR1wl" />
      </motion.div>

      <motion.div className={bioProfileClasses.content} style={bioProfileStyles.content} layoutId="R8fgI10ge">
        <motion.div className={bioProfileClasses.headingRow} style={bioProfileStyles.headingRow} layoutId="tV8vjXTpq">
          <motion.p className={bioProfileClasses.headingText} style={bioProfileStyles.headingText} layoutId="MdA5vBQo7">I am a</motion.p>
          <div className={bioProfileClasses.typewriter} style={bioProfileStyles.typewriter}>
            <Typewriter
              options={{
                strings: ['developer.', 'designer.', 'creative.', 'PM.', 'communicator.'],
                autoStart: true,
                loop: true,
                delay: 100,
                deleteSpeed: 50,
              }}
            />
          </div>
        </motion.div>

        <motion.div style={bioProfileStyles.description} layoutId="Jp0G9uG_b">
          <motion.div layoutId="n6Z1E9w_5">
            <p className={bioProfileClasses.descriptionText} style={bioProfileStyles.descriptionText}>Specialize in visual communication as a UX designer, with strong</p>
            <p className={bioProfileClasses.descriptionText} style={bioProfileStyles.descriptionText}>creative problem-solving and execution skills. I bring my work to life by coding</p>
            <p className={bioProfileClasses.descriptionText} style={bioProfileStyles.descriptionText}>websites, apps, and games.I thrive on pushing boundaries, taking risks,</p>
            <p className={bioProfileClasses.descriptionText} style={bioProfileStyles.descriptionText}>and infusing narrative into my work.</p>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className={bioProfileClasses.footer} style={{...bioProfileStyles.footer, alignItems: "center"}}>
        <div style={{ height: "auto", display: "flex", alignItems: "center" }}>
          <TimeDisplay format="date" />
        </div>
        <div style={{ height: "auto", display: "flex", alignItems: "center" }}>
          <TimeDisplay format="time" />
        </div>
      </div>
    </motion.div>
  );
};

export default BioProfile;
