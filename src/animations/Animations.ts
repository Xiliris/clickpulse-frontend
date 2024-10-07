const lineVariant = {
  initial: {
    width: "0",
    marginLeft: "50%",
  },
  animate: {
    width: "100%",
    marginLeft: "0%",
    transition: {
      duration: 0.5,
      type: "linear",
    },
  },
};

const upperItemVariant = {
  initial: ({ yHeight }: any) => ({
    y: yHeight || 40,
    opacity: 0,
  }),

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      type: "tween",
    },
  },
};

const lowerItemVariant = {
  initial: {
    y: -40,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      delay: 0.4,
      type: "tween",
    },
  },
};

const fadeUp = {
  initial: {
    y: 40,
    opacity: 0,
  },

  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

const fadeLeft = {
  initial: {
    x: -40,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

const fadeRight = {
  initial: {
    x: 40,
    opacity: 0,
  },

  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      type: "tween",
    },
  },
};

export {
  lineVariant,
  upperItemVariant,
  lowerItemVariant,
  fadeUp,
  fadeLeft,
  fadeRight,
};
