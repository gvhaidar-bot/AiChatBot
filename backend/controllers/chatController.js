import sql from "../configs/db.js";

export const getChatHistory = async (req, res) => {
  try {
    const { userId } = req.auth();

    const messages =
      await sql`select m1.id,m1.content,m1.mode,m1.created_at , (SELECT m2.content from messages m2 where m2.clerk_user_id=m1.clerk_user_id AND m2.role='assistant' AND m2.id > m1.id ORDER BY m2.id ASC limit 1  )as result  from messages m1 where m1.clerk_user_id=${userId} AND m1.role ='user' ORDER BY m1.created_at DESC  LIMIT 20`;

    res.json({ success: true, messages });
  } catch (error) {
    console.error("histori is error : ", error.message);
    res.status(500).json({ success: false, message: "could not fetch history" });
  }
};
