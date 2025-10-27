"use client";

import { useState } from "react";
import {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { Maximize2, Minimize2, Split } from "lucide-react";
import { CodeEditor } from "@/components/code-editor";
import { DocumentationPreview } from "@/components/documentation-preview";

interface ResizableLayoutProps {
  code: string;
  setCode: (code: string) => void;
  documentation: string;
  isGenerating: boolean;
}

export function ResizableLayout({
  code,
  setCode,
  documentation,
  isGenerating,
}: ResizableLayoutProps) {
  const [isCodeCollapsed, setIsCodeCollapsed] = useState(false);
  const [isDocCollapsed, setIsDocCollapsed] = useState(false);

  const bothVisible = !isCodeCollapsed && !isDocCollapsed;

  return (
    <div className="relative w-full h-[75vh] border border-border rounded-lg overflow-hidden bg-background">
      <div className="absolute top-2 right-2 z-10 flex gap-2">
        {bothVisible ? (
          <>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsCodeCollapsed(true)}
              title="Collapse Code Editor"
            >
              <Minimize2 className="w-4 h-4 mr-1" /> Code
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setIsDocCollapsed(true)}
              title="Collapse Documentation"
            >
              <Minimize2 className="w-4 h-4 mr-1" /> Docs
            </Button>
          </>
        ) : (
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              setIsCodeCollapsed(false);
              setIsDocCollapsed(false);
            }}
            title="Split View"
          >
            <Split className="w-4 h-4 mr-1" /> Split
          </Button>
        )}
      </div>

      {bothVisible ? (
        <ResizablePanelGroup direction="horizontal" className="w-full h-full">
          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="p-4 h-full overflow-auto">
              <CodeEditor code={code as any} setCode={setCode} />
            </div>
          </ResizablePanel>

          <ResizableHandle withHandle />

          <ResizablePanel defaultSize={50} minSize={25}>
            <div className="p-4 h-full overflow-auto">
              <DocumentationPreview
                documentation={documentation}
                isLoading={isGenerating}
              />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      ) : isCodeCollapsed ? (
        <div className="p-4 h-full overflow-auto">
          <DocumentationPreview
            documentation={documentation}
            isLoading={isGenerating}
          />
        </div>
      ) : (
        <div className="p-4 h-full overflow-auto">
          <CodeEditor code={code as any} setCode={setCode} />
        </div>
      )}
    </div>
  );
}
