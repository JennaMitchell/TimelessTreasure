export const returnTrueWhenBreakPointIsMatched = (
  breakpoint: number,
  stateEnabler: boolean
) => {
  const breakpointMatched = window.matchMedia(`(max-width:${breakpoint}px)`);
  if (breakpointMatched.matches) {
    return true;
  }
  if (!stateEnabler && !breakpointMatched.matches) {
    return false;
  }
  return false;
};
export const returnFalseWhenBreakPointIsMatched = (
  breakpoint: number,
  stateEnabler: boolean
) => {
  const breakpointMatched = window.matchMedia(`(max-width:${breakpoint}px)`);
  if (breakpointMatched.matches) {
    return false;
  }
  if (!stateEnabler && !breakpointMatched.matches) {
    return true;
  }
  return true;
};
