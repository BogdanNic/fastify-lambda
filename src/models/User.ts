export const userSchema = {
  type: "object",
  properties: {
    name: { type: "string" },
    email: { type: "string" },
    age: { type: "integer" },
  },
  required: ["name", "email", "age"],
} as const;
