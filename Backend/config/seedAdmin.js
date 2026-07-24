import bcrypt from "bcryptjs";
import userModel from "../models/userModel.js";

// Local-development convenience account. Set DEFAULT_ADMIN_EMAIL/PASSWORD in
// environment variables to override these values before deploying.
export const ensureDefaultAdmin = async () => {
  if (process.env.NODE_ENV === "production") return;

  const email = process.env.DEFAULT_ADMIN_EMAIL || "admin@quickfood.local";
  const password = process.env.DEFAULT_ADMIN_PASSWORD || "QuickFood@2026";
  const existingUser = await userModel.findOne({ email });
  if (existingUser) return;

  await userModel.create({
    name: "QuickFood Admin",
    email,
    password: await bcrypt.hash(password, 10),
    role: "admin",
  });
  console.log(`Development admin account created for ${email}`);
};
