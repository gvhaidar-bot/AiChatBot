import { useUser, UserButton, useClerk } from "@clerk/clerk-react";
const Header = () => {
  const { user } = useUser();
  const { openSignIn } = useClerk();
  return (
    <>
      <style>{`
                .button-wrapper::before {
                    animation: spin-gradient 4s linear infinite;
                }
            
                @keyframes spin-gradient {
                    from {
                        transform: rotate(0deg);
                    }
            
                    to {
                        transform: rotate(360deg);
                    }
                }
            `}</style>

      <header className="w-full px-6 p-4 flex justify-between items-center border-b border-slate-800/60 backdrop-blur-md z-50">
        <div className="tracking-tight text-xl font-bold flex items-center justify-center  gap-2 cursor-pointer">
          <svg width="36" height="30" viewBox="0 0 86 82" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M40.645 0S35.39 16.94 27.453 24.957C18.847 33.648 0 38.505 0 38.505h25.645c8.284 0 15-6.716 15-15zm0 82S35.39 65.06 27.453 57.043C18.847 48.352 0 43.495 0 43.495h25.645c8.284 0 15 6.716 15 15zm4.277-82s5.254 16.94 13.191 24.957c8.606 8.691 27.453 13.548 27.453 13.548H59.922c-8.284 0-15-6.716-15-15zm0 82s5.254-16.94 13.191-24.957c8.606-8.691 27.453-13.548 27.453-13.548H59.922c-8.284 0-15 6.716-15 15z"
              fill="#ffff"
            />
          </svg>
          CHATBOT SENDAR
        </div>

        <nav className="">
          {user ? (
            <UserButton />
          ) : (
            <div className="relative inline-block p-0.5 rounded-full overflow-hidden hover:scale-105 transition duration-300 active:scale-100 before:content-[''] before:absolute before:inset-0 before:bg-[conic-gradient(from_0deg,_#00F5FF,_#00F5FF30,_#00F5FF)] button-wrapper">
              <button onClick={openSignIn} className="cursor-pointer relative z-10 bg-gray-800 text-white rounded-full px-8 py-3 font-medium text-sm">
                Log In
              </button>
            </div>
          )}
        </nav>
      </header>
    </>
  );
};

export default Header;
