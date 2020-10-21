// const devEnv = "http://www.kudu.live";
// const devEnv = "https://et-daily-deal-backend.herokuapp.com";
// const devEnv = "http://localhost:5000";
const devEnv = process.env.NODE_ENV === "production" ? "https://et-daily-deal-backend.herokuapp.com" : "http://localhost:5000"
export { devEnv };