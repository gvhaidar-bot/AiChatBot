import Aside from "../components/Aside";
import { SignIn, useUser, useAuth } from "@clerk/clerk-react";
import { ImageIcon, Plus, Send, Sparkles, Type } from "lucide-react";
import { useState } from "react";
const Chat = () => {
  const { user } = useUser();
  const getToken = useAuth();
  const [messages, setMessages] = useState([{ role: "assistent", content: "Halo, Aku bisa membantumu dengan Pesan atau Gambar", mode: "text" }]);

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen bg-zinc-950">
        <SignIn />
      </div>
    );
  }

  return (
    <div className="flex h-screen  bg-zinc-950   text-zinc-200 overflow-hidden" style={{ fontFamily: "'DM sans', sans-serif " }}>
      {/* side bar */}
      <Aside />

      <main className="flex flex-col flex-1 min-w-0 relative">
        {/* top Bar */}
        <section className="flex items-center justify-between  px-6 py-3  border-b border-zinc-800  bg-zinc-950">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <svg width="120" height="32" viewBox="0 0 319 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-8 w-auto">
                <path d="m11.896 85.203 4.879-28.693 24.182-24.286 11.895 11.843zM43.104 0l-4.879 28.693-24.182 24.286L2.148 41.136z" fill="#ffff" />
                <text x="74" y="58" fontFamily="Poppins, Arial, sans-serif" fontSize="52" fontWeight="700" fill="#ffffff" letterSpacing="1">
                  SENDAR
                </text>
              </svg>
            </div>
          </div>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 text-xs font-medium transition-colors">
            <Plus size={13} /> New Chat
          </button>
        </section>

        {/* message */}
        <div className="flex-1  overflow-y-auto  px-4 py-6 ">
          <div className="max-w-2xl mx-auto space-y-6 pb-40">
            {messages.map((message, i) => (
              <div key={i} className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : "flex-row"}`}>
                {/* avatar */}
                {message.role === "user" ? (
                  <img src={user.imageUrl} alt="image" className="w-8 h-8  rounded-full  border border-zinc-700 shrink-0 object-cover" />
                ) : (
                  <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center ">
                    <svg width="14" height="14" viewBox="0 0 55 86" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="m11.896 85.203 4.879-28.693 24.182-24.286 11.895 11.843zM43.104 0l-4.879 28.693-24.182 24.286L2.148 41.136z" fill="#ffff" />
                    </svg>
                  </div>
                )}

                {/* content */}
                <div className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.role === "user" ? "bg-indigo-600 text-white rounded-tr-sm" : "bg-zinc-800 text-zinc-200 rounded-tl-sm border border-zinc-700"}`}>
                  {message.mode === "image" && message.role === "assistent" ? (
                    <img src={message.content} className="rounded-xl max-w-full h-auto" alt="" />
                  ) : message.role === "assistent" ? (
                    <div>{message.content}</div>
                  ) : (
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* input area */}
        <div className="absolute bottom-0  left-0 right-0  px-4 pb-5 pt-3 bg-linear-to-t from-zinc-950 via-zinc-950/50  to-transparent ">
          <div className="max-w-2xl  mx-auto space-y-2">
            {/* input box */}
            <div className="bg-zinc-900 border border-zinc-700 rounded-2xl overflow-hidden focus-within:border-indigo-500 transition-colors">
              {/* mode input */}
              <div className="flex gap-1 px-3 py-2.5">
                <button type="button" className={`flex items-center gap-1.5 px-3 py-1 rounded-lg  text-xs font-medium transition-colors `}>
                  <Type size={14} />
                  Text
                </button>
                <button type="button" className={`flex items-center gap-1.5 px-3 py-1 rounded-lg  text-xs font-medium transition-colors `}>
                  <ImageIcon size={14} /> Image
                </button>
              </div>

              {/* input row */}
              <form action="" className="flex items-center gap-2 px-3 py-2.5">
                <input placeholder="Tanyakan aku apa saja" type="text" className="flex-1 bg-transparent text-sm text-zinc-100  placeholder:text-zinc-600 outline-none disabled:opacity-40 disabled:cursor-not-allowed" />
                <button className="w-8 h-8 flex items-center justify-center rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white transition-colors disabled:opacity-30  disabled:cursor-not-allowed shrink-0">
                  <Send size={14} />
                </button>
              </form>
            </div>

            <p className="text-center  text-[10px]  text-zinc-600">AI bisa membuat kesalahan. tolong cek info kembali</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Chat;
