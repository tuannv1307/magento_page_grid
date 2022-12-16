import { defineConfig } from "cypress";

export default defineConfig({
  component: {
    devServer: {
      framework: "react",
      bundler: "webpack",
    },
    specPattern: ["src/**.cy.{js,jsx,ts,tsx}", "src/**/**.cy.{js,jsx,ts,tsx}"],
  },
});
// import { defineConfig } from "cypress";

// export default defineConfig({
//   projectId: '2wkiyy',
//   component: {
//     devServer: {
//       framework: "react",
//       bundler: "webpack",
//     },
//     specPattern: ["src/**.cy.{js,jsx,ts,tsx}", "src/**/**.cy.{js,jsx,ts,tsx}"],
//   },
// });
