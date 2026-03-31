import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SingleProject from './SingleProject';
import * as styles from './ProjectOverlay.styles';

// Close Icon SVG (White for dark theme)
const CloseIcon = () => (
  <svg viewBox="0 0 1024 1024" width="24" height="24" fill="#ffffff">
    <path d="M597.795527 511.488347 813.564755 295.718095c23.833825-23.833825 23.833825-62.47489 0.001023-86.307691-23.832801-23.832801-62.47489-23.833825-86.307691 0L511.487835 425.180656 295.717583 209.410404c-23.833825-23.833825-62.475913-23.833825-86.307691 0-23.832801 23.832801-23.833825 62.47489 0 86.308715l215.769228 215.769228L209.410915 727.258599c-23.833825 23.833825-23.833825 62.47489 0 86.307691 23.832801 23.833825 62.473867 23.833825 86.307691 0l215.768205-215.768205 215.769228 215.769228c23.834848 23.833825 62.475913 23.832801 86.308715 0 23.833825-23.833825 23.833825-62.47489 0-86.307691L597.795527 511.488347z" />
  </svg>
);

const projects = [
  {
    id: "01",
    name: "Mel:mory Cube",
    type: "UX • IxD • TUI • User Research • Product Design",
    subType: "Brandind • 3D Rendering",
    time: "2022.05 - 07",
    link: "./mel:mory-cube",
    isComingSoon: false
  },
  {
    id: "02",
    name: "Nike Runing shoe finder",
    type: "UI • UX • IxD • User Research",
    subType: "Creative problem solving • 3D rendering",
    time: "2023.04 - 06",
    link: "https://www.xiangyizhuangbi.com/run.html",
    isComingSoon: false
  },
  {
    id: "03",
    name: "Google i/o",
    type: "UI • UX • IxD • Web design",
    subType: "Creative problem solving • 3D rendering",
    time: "2022 - 2024",
    link: "https://www.xiangyizhuangbi.com/gds.html",
    isComingSoon: false
  },
  {
    id: "04",
    name: "Nike wildwood",
    type: "UI • UX • IxD",
    subType: "Creative problem solving • Narrative • Motion design",
    time: "2022 - 2024",
    link: "https://www.xiangyizhuangbi.com/wildwood.html",
    isComingSoon: false
  },
  {
    id: "05",
    name: "Google play points",
    type: "UX • IxD • Web design",
    subType: "text",
    time: "2022.08 - 09",
    link: "#",
    isComingSoon: true
  },
  {
    id: "06",
    name: "NIKE memberdays",
    type: "UI • UX • IxD",
    subType: "Creative problem solving • Narrative • Motion design",
    time: "2022.05 - 07",
    link: "#",
    isComingSoon: true
  },
  {
    id: "07",
    name: "NIKE APP anniversary",
    type: "UI • UX • IxD",
    subType: "Creative problem solving • Narrative • 3D",
    time: "2022.05 - 07",
    link: "#",
    isComingSoon: true
  },
  {
    id: "08",
    name: "JP Nike Shoe Chart",
    type: "UI • UX • Creative • Web",
    subType: "",
    time: "2022.05 - 07",
    link: "#",
    isComingSoon: true
  }
];

interface ProjectOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectOverlay({ isOpen, onClose }: ProjectOverlayProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          style={styles.overlayBackdropStyles}
          onClick={onClose}
        >
          {/* Main Content Container */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ type: "spring", duration: 0.6, bounce: 0.2 }}
            style={styles.mainContainerStyles}
            onClick={(e) => e.stopPropagation()}
          >
             {/* Close Button Container */}
             <div style={styles.closeButtonContainerStyles}>
                <button
                  onClick={onClose}
                  style={styles.closeButtonStyles}
                >
                  <CloseIcon />
                </button>
             </div>

             {/* Header */}
             <div style={styles.headerStyles}>
                <div style={{ width: '10%' }}>No.</div>
                <div style={{ width: '50%' }}>Project</div>
                <div style={{ width: '30%' }}>Type</div>
                <div style={{ width: '10%' }}>Time</div>
             </div>

             {/* Projects List */}
             <div style={styles.projectsListStyles}>
                {projects.map((project) => (
                  <SingleProject
                    key={project.id}
                    no={`${project.id}.`}
                    name={project.name}
                    type={project.type}
                    type2={project.subType || "text"}
                    time={project.time}
                    link={project.link}
                    comingSoon={project.isComingSoon}
                  />
                ))}
             </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
