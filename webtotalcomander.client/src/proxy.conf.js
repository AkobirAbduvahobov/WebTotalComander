const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
    ],
    target: "https://localhost:7142",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
