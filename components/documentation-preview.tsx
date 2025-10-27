"use client";

import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";

interface DocumentationPreviewProps {
  documentation: string;
  isLoading: boolean;
}

export function DocumentationPreview({
  documentation,
  isLoading,
}: DocumentationPreviewProps) {
  const [displayedDoc, setDisplayedDoc] = useState("");

  useEffect(() => {
    if (isLoading) {
      setDisplayedDoc("");
    } else if (documentation) {
      setDisplayedDoc(documentation);
    }
  }, [documentation, isLoading]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-lg font-semibold">Preview</h2>
        {isLoading && (
          <span className="text-xs text-primary animate-pulse">
            Generating...
          </span>
        )}
      </div>
      <div className="flex-1 border border-border rounded-lg overflow-auto bg-card p-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm text-muted-foreground">
                Generating response...
              </p>
            </div>
          </div>
        ) : displayedDoc ? (
          <div className="prose prose-invert max-w-none text-sm">
            <ReactMarkdown
              components={{
                h1: ({ node, ...props }) => (
                  <h1 className="text-2xl   font-bold mt-4 mb-2" {...props} />
                ),
                h2: ({ node, ...props }) => (
                  <h2 className="text-xl font-bold mt-3 mb-2" {...props} />
                ),
                h3: ({ node, ...props }) => (
                  <h3 className="text-lg font-semibold mt-2 mb-1" {...props} />
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-2 text-foreground/90" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul
                    className="list-disc list-inside mb-2 space-y-1"
                    {...props}
                  />
                ),
                li: ({ node, ...props }) => (
                  <li className="text-foreground/90" {...props} />
                ),
                code: (props) => {
                  const { inline, children, ...rest } = props as any;
                  return inline ? (
                    <code
                      className="bg-muted px-1.5 py-0.5 rounded text-accent font-mono text-xs"
                      {...rest}
                    >
                      {children}
                    </code>
                  ) : (
                    <code
                      className="block bg-muted  p-3 rounded mb-2 overflow-x-auto font-mono text-xs"
                      {...rest}
                    >
                      {children}
                    </code>
                  );
                },
                table: ({ node, ...props }) => (
                  <table
                    className="w-full border-collapse mb-2 text-xs"
                    {...props}
                  />
                ),
                th: ({ node, ...props }) => (
                  <th
                    className="border border-border bg-muted p-2 text-left"
                    {...props}
                  />
                ),
                td: ({ node, ...props }) => (
                  <td className="border border-border p-2" {...props} />
                ),
              } }
            >
              {displayedDoc}
            </ReactMarkdown>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-center">
            <div>
              <p className="text-muted-foreground">
                Paste code and click "Generate" 
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
