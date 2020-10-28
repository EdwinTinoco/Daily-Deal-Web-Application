const devEnv = process.env.NODE_ENV === "production" ? "https://www.kudu.live" : "http://localhost:5000"

export { devEnv };