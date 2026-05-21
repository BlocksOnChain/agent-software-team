export const OPENAI_API_KEY = process.env.OPENAI_API_KEY
export const TAVILY_API_KEY = process.env.TAVILY_API_KEY
export const QWEN_MODEL_URL = process.env.QWEN_MODEL_URL || "http://localhost:1234/v1"
export const QWEN_MODEL_NAME = process.env.QWEN_MODEL_NAME || "qwen/qwen3.5-9b"
export const USE_LOCAL_MODEL = process.env.USE_LOCAL_MODEL === "true"