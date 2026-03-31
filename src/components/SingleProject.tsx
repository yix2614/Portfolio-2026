import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as styles from './SingleProject.styles';

interface SingleProjectProps {
  no: string;
  name: string;
  type: string;
  type2: string;
  time: string;
  link?: string;
  comingSoon?: boolean;
}

const SingleProject: React.FC<SingleProjectProps> = ({
  no,
  name,
  type,
  type2,
  time,
  link,
  comingSoon = false,
}) => {
  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <motion.a
      href={link || '#'}
      target={link && link !== '#' ? '_blank' : undefined}
      rel="noopener noreferrer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        ...styles.linkStyles,
        opacity: isHovered ? 1 : 0.5,
      }}
      layout
    >
      {/* 1. Number (10%) */}
      <motion.div
        layout
        style={styles.numberStyles}
      >
        {no}
      </motion.div>

      {/* 2. Icon (4% - visible on hover) */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: '4%', opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            layout
            style={styles.iconWrapperStyles}
          >
            <motion.div
              layoutId={`icon-${name}`}
              style={{
                width: '100%',
                rotate: -90,
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M38.9134 41.9082H17.286C16.7337 41.9082 16.286 41.4605 16.286 40.9082V36.9245C16.286 36.3659 16.7436 35.9156 17.3022 35.9246L31.9255 36.1605L7.09371 11.331C6.70315 10.9405 6.70314 10.3073 7.09367 9.91679L9.92203 7.08844C10.3126 6.6979 10.9458 6.69792 11.3363 7.08848L36.1655 31.9205L35.9298 17.2969C35.9208 16.7384 36.3711 16.2808 36.9297 16.2808H40.9134C41.4657 16.2808 41.9134 16.7285 41.9134 17.2808V38.9082C41.9134 40.5651 40.5703 41.9082 38.9134 41.9082Z"
                  fill="white"
                />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Name (50% -> 46%) */}
      <motion.div
        layout
        animate={{ width: isHovered ? '46%' : '50%' }}
        style={styles.nameStyles}
      >
        {name}
      </motion.div>

      {/* 4. Type (30% - fixed) */}
      <motion.div
        layout
        style={styles.typeContainerStyles}
      >
        <div>{type}</div>
        <div>{type2}</div>
      </motion.div>

      {/* 5. Time (10% - fixed) */}
      <motion.div
        layout
        style={styles.timeStyles}
      >
        {time}
      </motion.div>

      {/* Coming Soon Badge */}
      {comingSoon && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          style={styles.badgeStyles}
        >
          Coming soon
        </motion.div>
      )}
    </motion.a>
  );
};

export default SingleProject;
