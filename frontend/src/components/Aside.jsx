import { LogOut, MessageCircle, Plus } from "lucide-react";
import { useClerk, useUser, Protect, useAuth } from "@clerk/clerk-react";
const Aside = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const { signOut } = useClerk();
  return (
    <aside className="w-60 flex flex-col h-full  bg-zinc-900  border-r border-zinc-800 " style={{ fontFamily: "sans-serif" }}>
      {/* brand */}
      <div className="flex items-center gap-2 px-4 py-4 border-b border-zinc-800">
        <svg viewBox="0 0 319 86" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-9 w-auto">
          <path d="m11.896 85.203 4.879-28.693 24.182-24.286 11.895 11.843zM43.104 0l-4.879 28.693-24.182 24.286L2.148 41.136z" fill="#FFFF" />
          <text x="74" y="58" fontFamily="Poppins, Arial, sans-serif" fontSize="52" fontWeight="700" fill="#ffffff" letterSpacing="1">
            SENDAR
          </text>
        </svg>
      </div>
      {/* new chat */}
      <div className="px-3 pt-2 pb-2 ">
        <button className="w-full bg-indigo-600 flex items-center justify-center rounded-full  px-4 py-2.5 text-white hover:bg-indigo-900 transition-colors hover:cursor-pointer gap-2 font-medium text-xs  ">
          <Plus size={14} />
          New Chat
        </button>
      </div>

      {/* histori */}
      <div className="  flex-1 overflow-y-auto px-3 py-2">
        <p className="px-2 text-[10px] font-semibold uppercase tracking-widest  mb-2 mt-1 text-zinc-600 ">History</p>

        <div className="space-y-0.5">
          <button className="flex w-full items-start gap-2.5 text-left px-2.5 py-2 rounded-lg transition-colors shrink-0  text-zinc-400 hover:bg-zinc-800  hover:text-zinc-200 ">
            <span className="mt-0.5 shrink-0 text-zinc-600 group-hover:text-indigo-400  transition-colors">
              <MessageCircle size={20} />
            </span>

            <div className="flex flex-col min-w-0">
              <span className="truncate text-xs leading-relaxed">Histori Message</span>
              <span className="text-[10px] text-zinc-600 mt-0.5">12-09-2026</span>
            </div>
          </button>
        </div>
      </div>

      {/* User Profile */}
      <div className="px-3 py-3  border-t border-zinc-800">
        <div className="flex items-center gap-2.5  px-2 py-2  rounded-xl hover:bg-zinc-800 transition-colors">
          <img src={user.imageUrl} alt="image" className="w-8 h-8 rounded-full object-cover shrink-0 border border-zinc-700" />
          <div className="flex flex-col min-w-0 flex-1 ">
            <span className="text-xs font-semibold text-zinc-200 truncate">{user.fullName}</span>
            <Protect plan="premium" fallback={<span className="text-[10px]  text-zinc-500">Free Plan</span>}>
              <span className="text-[10px] text-indigo-400  font-medium">Premium</span>
            </Protect>
          </div>

          <button onClick={signOut} className="p-1.5 rounded-lg hover:text-red-400 hover:bg-red-400/10  cursor-pointer  shrink-0 transition-colors">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Aside;
