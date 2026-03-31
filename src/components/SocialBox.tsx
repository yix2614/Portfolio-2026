import React from 'react';
import { motion } from 'framer-motion';
import { socialBoxStyles, socialBoxClasses } from './SocialBox.styles';

const ArrowIcon = () => (
  <svg style={socialBoxStyles.arrowIconShape} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.9127 6.09229H17.2853C16.733 6.09229 16.2853 6.54 16.2853 7.09229V11.076C16.2853 11.6346 16.7429 12.0849 17.3014 12.0759L31.9248 11.84L7.09298 36.6694C6.70242 37.06 6.7024 37.6932 7.09294 38.0837L9.9213 40.9121C10.3118 41.3026 10.945 41.3026 11.3356 40.912L36.1648 16.08L35.9291 30.7036C35.9201 31.2621 36.3704 31.7197 36.929 31.7197H40.9127C41.465 31.7197 41.9127 31.272 41.9127 30.7197V9.09229C41.9127 7.43543 40.5696 6.09229 38.9127 6.09229Z" fill="currentColor" />
  </svg>
);

const GithubIcon = () => (
  <svg viewBox="0 0 1024 1024" width="100%" height="100%" fill="currentColor">
    <path d="M872.448 872.6016h-151.6544v-237.568c0-56.6784-1.1776-129.5872-79.0528-129.5872-79.0528 0-91.136 61.6448-91.136 125.3888v241.7664H399.0016V384h145.6128v66.56h1.9968c20.3264-38.4 69.8368-78.848 143.7696-78.848 153.6512 0 182.0672 101.0688 182.0672 232.704v268.1856zM227.6864 317.1328c-48.8448 0-88.064-39.4752-88.064-88.064s39.2704-88.064 88.064-88.064a88.064 88.064 0 0 1 0 176.128z m75.9808 555.52h-152.064V384h152.064v488.6016zM948.2752 0H75.5712C33.792 0 0 33.024 0 73.728v876.544C0 990.976 33.792 1024 75.5712 1024h872.5504c41.728 0 75.8784-32.9728 75.8784-73.728V73.728C1024 33.0752 989.8496 0 948.1216 0h0.1536z" />
  </svg>
);

const WechatIcon = () => (
  <svg viewBox="0 0 1193 1024" width="100%" height="100%" fill="currentColor">
    <path d="M806.287212 309.998684c13.642769 0 27.127442 1.050875 40.528417 2.631837C810.407012 133.842355 629.080008 1.032275 422.076327 1.032275 190.688636 1.032275 1.112733 167.275045 1.112733 378.379926c0 121.864245 63.061771 221.92052 168.465415 299.536438l-42.100079 133.470365 147.122433-77.783315c52.692523 10.992333 94.922799 22.27296 147.475825 22.27296 13.20568 0 26.309062-0.678884 39.310147-1.757657-8.2396-29.666281-13.001085-60.727528-13.001085-92.960546 0-193.8538 157.910172-351.159486 357.901823-351.159487z m-226.356512-120.301883c31.684332 0 52.683223 21.975367 52.683222 55.370858 0 33.255994-20.998891 55.519654-52.692522 55.519654-31.544835 0-63.191968-22.27296-63.191968-55.519654 0-33.39549 31.647133-55.370858 63.191968-55.370858zM285.323142 300.596612c-31.554135 0-63.405863-22.27296-63.405863-55.528953 0-33.39549 31.851728-55.370858 63.405863-55.370858 31.544835 0 52.543726 21.975367 52.543726 55.370858 0 33.255994-20.998891 55.519654-52.543726 55.519654z" />
    <path d="M1190.460898 655.8201c0-177.393199-168.400317-321.986094-357.557732-321.986094-200.289244 0-358.04132 144.592894-358.041319 321.986094 0 177.700092 157.752075 321.976794 358.041319 321.976794 41.923384 0 84.237358-11.159729 126.328138-22.27296l115.447401 66.651484-31.656433-110.881212c84.507051-66.80958 147.438625-155.417832 147.438626-255.474106z m-473.618918-55.519654c-20.961692 0-42.127979-21.966067-42.127978-44.387824 0-22.114864 21.166287-44.369224 42.127978-44.369224 31.823828 0 52.683223 22.25436 52.683223 44.369224 0 22.412457-20.859394 44.387824-52.683223 44.387824z m231.536487 0c-20.831495 0-41.830386-21.966067-41.830386-44.387824 0-22.114864 20.998891-44.369224 41.830386-44.369224 31.544835 0 52.683223 22.25436 52.683223 44.369224 0 22.412457-21.138388 44.387824-52.683223 44.387824z" />
  </svg>
);

const InstagramIcon = () => (
  <svg viewBox="0 0 1024 1024" width="100%" height="100%" fill="currentColor">
    <path d="M512 92.192c136.8 0 152.992 0.608 206.784 3.008 50.016 2.208 76.992 10.592 95.008 17.6a158.464 158.464 0 0 1 58.784 38.208 160.48 160.48 0 0 1 38.4 58.816c7.008 18.016 15.392 45.216 17.6 95.008 2.4 54.016 3.008 70.208 3.008 206.816s-0.608 152.992-3.008 206.816c-2.208 50.016-10.592 76.992-17.6 95.008a158.08 158.08 0 0 1-38.208 58.784 160.64 160.64 0 0 1-58.784 38.4c-18.016 7.008-45.216 15.392-95.008 17.6-54.016 2.4-70.208 3.008-206.816 3.008s-152.992-0.608-206.816-3.008c-50.016-2.208-76.992-10.592-95.008-17.6a158.464 158.464 0 0 1-58.816-38.208 160.64 160.64 0 0 1-38.4-58.784c-7.008-18.016-15.392-45.216-17.6-95.008-2.4-54.016-3.008-70.208-3.008-206.816s0.608-152.992 3.008-206.816c2.208-50.016 10.592-76.992 17.6-95.008a158.848 158.848 0 0 1 38.208-58.816 160.48 160.48 0 0 1 58.816-38.4c18.016-7.008 45.184-15.392 95.008-17.6 53.792-2.4 70.016-3.008 206.816-3.008zM512 0c-139.008 0-156.384 0.608-211.008 3.008-54.4 2.4-91.808 11.2-124.192 23.808-33.792 13.184-62.4 30.592-90.784 59.2a250.656 250.656 0 0 0-59.2 90.592C14.208 209.216 5.408 246.4 3.008 300.8 0.608 355.616 0 372.992 0 512s0.608 156.384 3.008 211.008c2.4 54.4 11.2 91.808 23.808 124.192 13.216 33.792 30.592 62.4 59.2 90.784a250.24 250.24 0 0 0 90.592 59.008c32.608 12.608 69.792 21.408 124.192 23.808 54.592 2.4 72 3.008 211.008 3.008s156.416-0.608 211.008-3.008c54.4-2.4 91.808-11.2 124.192-23.808 33.6-12.992 62.208-30.592 90.592-59.008s46.016-56.992 59.008-90.592c12.608-32.608 21.408-69.792 23.808-124.192 2.4-54.592 3.008-72 3.008-211.008s-0.608-156.384-3.008-211.008c-2.4-54.4-11.2-91.808-23.808-124.192a240.192 240.192 0 0 0-58.592-91.008A250.24 250.24 0 0 0 847.424 26.976C814.816 14.368 777.632 5.568 723.232 3.168c-54.784-2.592-72.192-3.2-211.2-3.2z" />
    <path d="M512 248.992c-145.184 0-263.008 117.792-263.008 263.008s117.792 263.008 263.008 263.008 263.008-117.792 263.008-263.008-117.792-263.008-263.008-263.008z m0 433.056c-93.92 0-170.048-76.128-170.048-170.048S418.08 341.952 512 341.952 682.048 418.08 682.048 512 605.92 682.048 512 682.048z" />
    <path d="M828.896 253.92a61.984 61.984 0 1 1-61.984-61.984 62.016 62.016 0 0 1 61.984 61.984z" />
  </svg>
);

export const SocialBox: React.FC = () => {
  return (
    <div style={socialBoxStyles.container}>
      <div style={socialBoxStyles.imageContainer}>
        <motion.img 
          src="https://framerusercontent.com/images/06WZmP1XWROpiKFsq42ccuj9Uc.jpeg"
          style={socialBoxStyles.image as any}
          whileHover={{ filter: "blur(8px)", opacity: 1 }}
        />
      </div>

      <div style={socialBoxStyles.overlay} />

      <p className={socialBoxClasses.contactHeader} style={socialBoxStyles.contactHeader}>Contact</p>
      <div style={socialBoxStyles.arrowContainer}>
        <ArrowIcon />
      </div>

      <div style={socialBoxStyles.infoContainer}>
        <div className={socialBoxClasses.infoGroup} style={socialBoxStyles.infoGroup}>
          <div style={socialBoxStyles.separator} />
          <div style={socialBoxStyles.rowContent}>
            <p style={socialBoxStyles.rowLabel}>Phone:</p>
            <p style={socialBoxStyles.rowValue}>+86 13920189354</p>
          </div>
        </div>
        
        <div className={socialBoxClasses.infoGroup} style={socialBoxStyles.infoGroup}>
          <div style={socialBoxStyles.separator} />
          <div style={socialBoxStyles.rowContent}>
            <p style={socialBoxStyles.rowLabel}>E-mail:</p>
            <div style={socialBoxStyles.rowValueContainer}>
              <p style={socialBoxStyles.rowValue}>yix2614@gmail.com</p>
              <p style={socialBoxStyles.rowValue}>xiangyi_work@163.com</p>
            </div>
          </div>
        </div>
      </div>

      <div style={socialBoxStyles.resumeContainer}>
        <div style={socialBoxStyles.separator} />
        <div style={socialBoxStyles.resumeContent}>
          <p style={socialBoxStyles.resumeLabel}>Other:</p>
          <p style={socialBoxStyles.resumeLink}>My Resume</p>
        </div>
      </div>

      <div style={socialBoxStyles.socialIcons}>
        <motion.div 
          className={socialBoxClasses.iconWrapper}
          style={{ ...socialBoxStyles.icon, opacity: 0.5 } as any}
          whileHover={{ opacity: 1 }}
          onClick={() => window.open('https://www.linkedin.com/in/yi-xiang-9a01b7154/', '_blank', 'noopener,noreferrer')}
        >
          <GithubIcon />
        </motion.div>
        <motion.div 
          className={socialBoxClasses.iconWrapper}
          style={{ ...socialBoxStyles.icon, opacity: 0.5 } as any}
          whileHover={{ opacity: 1 }}
          onClick={() => window.open('https://www.instagram.com/xxiang_yix/', '_blank', 'noopener,noreferrer')}
        >
          <InstagramIcon />
        </motion.div>
        <motion.div 
          className={socialBoxClasses.iconWrapper}
          style={{ ...socialBoxStyles.icon, opacity: 0.5 } as any}
          whileHover={{ opacity: 1 }}
        >
          <WechatIcon />
        </motion.div>
      </div>
    </div>
  );
};

export default SocialBox;
