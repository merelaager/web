module.exports = {
  apps: [
    {
      name: "web",
      script: "./node_modules/.bin/react-router-serve",
      args: "./build/server/index.js",
      node_args: "--env-file=.env",
    },
  ],
};
