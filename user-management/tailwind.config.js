module.exports = {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      width: {
        98: "31.25rem", // Custom width class for 500px
        "1/2": "50%", // Custom width class for 50%
        "1/3": "33.333%", // Custom width class for 33.333%
        "2/3": "66.666%", // Custom width class for 66.666%
        "1/4": "25%", // Custom width class for 25%
        "3/4": "75%", // Custom width class for 75%
        "1/5": "20%", // Custom width class for 20%
        "2/5": "40%", // Custom width class for 40%
        "3/5": "60%", // Custom width class for 60%
        "4/5": "80%", // Custom width class for 80%
        "1/6": "16.666%", // Custom width class for 16.666%
        "5/6": "83.333%", // Custom width class for 83.333%
      },
    },
  },
  plugins: [],
};
