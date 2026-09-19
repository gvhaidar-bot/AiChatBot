import { clerkClient } from "@clerk/express";

export const auth = async (req, res, next) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res.json({ success: false, message: "please sign in your account" });
    }

    // get user
    const user = await clerkClient.users.getUser(userId);
    //Resource "users" di Clerk API
    //Ambil detail user berdasarkan ID
    // set plan into clerk

    req.plan = user.publicMetadata?.plan === "premium" ? "premium" : "free"; //Backend + Frontend (bisa dilihat client)
    req.free_usage = user.privateMetadata?.free_usage || 0; //Backend saja (rahasia, nggak bocor ke frontend)

    next();
  } catch (error) {
    console.log(error.message);
    return res.json({ success: false, message: error.message });
  }
};
