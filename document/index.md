components={{
h1: ({ children }) => <h1 className="text-base font-bold text-white mt-3 mb-1">{children}</h1>,
h2: ({ children }) => <h2 className="text-sm font-bold text-white mt-2 mb-1">{children}</h2>,
h3: ({ children }) => <h3 className="text-sm font-semibold text-zinc-100 mt-2 mb-1">{children}</h3>,
p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-0.5">{children}</ul>,
ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-0.5">{children}</ol>,
li: ({ children }) => <li className="text-zinc-300">{children}</li>,
strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
em: ({ children }) => <em className="italic text-zinc-400">{children}</em>,
code: ({ inline, children }) => inline
? <code className="bg-zinc-900 text-indigo-300 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
: <code className="block bg-zinc-900 text-indigo-300 p-3 rounded-lg text-xs font-mono overflow-x-auto my-2 border border-zinc-700">{children}</code>,
pre: ({ children }) => <pre className="my-2">{children}</pre>,
blockquote: ({ children }) => <blockquote className="border-l-2 border-indigo-500 pl-3  text-zinc-400 italic my-2">{children} </blockquote>
a:({href, children }) => <a href={href} target="_blank" rel="noopenar noreferrer" className="text-indigo-400 hover:underline">{children} </a>
}}
