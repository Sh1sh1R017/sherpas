import { auth as clerkAuth } from "@clerk/nextjs/server";

export const auth = async () => {
  // BYPASS LOGIN FOR NOW
  // Always return a dummy user ID so the app thinks someone is logged in
  return { userId: "dummy_bypass_user_123" };
};
