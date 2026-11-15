import { betterAuth } from "better-auth";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { db } from "./mongodb";

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 6,
    autoSignIn: false, // after register, the user goes to the Login page
  },
});