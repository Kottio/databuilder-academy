"use client";

import { useState, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import { Copy, Check } from "lucide-react";
import "highlight.js/styles/github-dark.css";

interface MarkdownContentProps {
  content: string;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setCopied(false), 2000);
  }, [text]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded bg-zinc-700/50 hover:bg-zinc-700 text-zinc-500 hover:text-zinc-300 transition-colors"
      aria-label="Copy code"
    >
      {copied ? <Check size={14} /> : <Copy size={14} />}
    </button>
  );
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  return (
    <div className="prose prose-invert max-w-none prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-strong:text-zinc-200 prose-li:text-zinc-300">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeHighlight]}
        components={{
          pre: ({ children, ...props }: any) => {
            const codeEl = children?.props;
            const text =
              typeof codeEl?.children === "string"
                ? codeEl.children
                : Array.isArray(codeEl?.children)
                  ? codeEl.children
                      .map((c: any) =>
                        typeof c === "string" ? c : c?.props?.children ?? "",
                      )
                      .join("")
                  : "";

            return (
              <div className="relative group">
                <pre {...props}>{children}</pre>
                <CopyButton text={text} />
              </div>
            );
          },
          code: ({ node, inline, className, children, ...props }: any) => {
            return inline ? (
              <code
                className="bg-zinc-800 px-1.5 py-0.5 rounded text-sm text-emerald-300"
                {...props}
              >
                {children}
              </code>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          a: ({ node, children, ...props }: any) => (
            <a
              className="text-emerald-400 hover:text-emerald-300 hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
              {...props}
            >
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
