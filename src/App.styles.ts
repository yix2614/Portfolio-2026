export const appStyles = {
  pageWrapper: 'page-wrapper',
  mainContainer: 'app-container min-[1200px]:pb-[54px]',
  leftColumn: 'left-column bio-globe-name-container',
  bioGlobeRow: 'bio-globe-row',
  bioWrapper: 'bio-wrapper relative',
  bioInner: 'absolute inset-0',
  globeWrapper: 'globe-wrapper shrink-0 min-w-0',
  nameRow: 'name-row',
  nameInner: 'absolute inset-0 flex',
  rightColumn: 'right-column',
  topRow: 'top-row',
  socialWrapper: 'social-wrapper',
  statisticWrapper: 'statistic-wrapper',
  currentSwitchWrapper: 'current-switch-wrapper',
  currentAtBoxWrapper: 'current-at-box',
  modeSwitchLabel: 'mode-switch-label',
  modeSwitchBox: 'mode-switch-box',
  bottomRow: 'bottom-row',
  clockWrapper: 'clock-wrapper',
  clientsWrapper: 'clients-wrapper',
  clientsInner: 'absolute top-0 left-0 right-0 bottom-0',
  scrollHint: 'scroll-hint flex flex-row items-center justify-end gap-[10px] mt-6 w-full',
  scrollHintIcon: 'flex items-center justify-center bg-[#F05C00] rounded-full w-[22px] h-[22px] shadow-[0px_2px_4px_rgba(0,0,0,0.1)] overflow-hidden relative',
  scrollHintAnim: 'absolute w-full h-full',
  scrollHintIconInner: 'absolute top-0 left-0 w-full h-full flex items-center justify-center',
  scrollHintIconInner2: 'absolute top-[-100%] left-0 w-full h-full flex items-center justify-center',
};

export const appInlineStyles = {
  pageWrapper: { backgroundColor: "var(--color-bg-page)", color: "var(--color-text-primary, rgb(51, 51, 51))" },
  bioWrapper: { flex: '2 1 0%', minWidth: 0 },
  globeWrapper: { flex: '1 1 0%', aspectRatio: '1 / 1' },
  modeSwitchLabel: {
    fontFamily: '"Helvetica Neue Regular", "Helvetica Neue Regular Placeholder", sans-serif',
    fontSize: "12px",
    color: "var(--color-text-muted, rgb(153, 153, 153))",
    margin: 0
  },
  modeSwitchBox: { aspectRatio: '2 / 1', minHeight: 0 },
  clockWrapper: { flex: '0 0 auto', width: 'calc((100% - 8px) / 3)', aspectRatio: '1 / 1' },
  clientsWrapper: { flex: '1 1 0%', position: 'relative' as const },
  scrollHintText: {
    fontFamily: '"Helvetica Neue", "Helvetica Neue Regular", sans-serif',
    fontSize: "16px",
    fontWeight: 400,
    color: "var(--color-text-primary, rgb(51, 51, 51))",
    margin: 0
  },
  horizontalScroll: {
    backgroundColor: "var(--color-bg-page)"
  },
  dockContainer: {
    position: 'fixed' as const,
    bottom: '8px',
    left: '50%',
    transform: 'translateX(-50%)',
    zIndex: 1000
  }
};
