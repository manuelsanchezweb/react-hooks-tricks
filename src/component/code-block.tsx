import React, { useLayoutEffect, useRef } from 'react';
import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/mono-blue.css?inline";

type CodeBlockProps = {
    children: React.ReactNode;
}
const CodeBlock = ({ children }: CodeBlockProps) => {
    const codeRef = useRef(null);

    useLayoutEffect(() => {
        hljs.registerLanguage("typescript", typescript);
        if (codeRef.current) {
            hljs.highlightElement(codeRef.current);
        }
    }, [children]);

    return (
        <pre style={{tabSize: 2}}>
            <code ref={codeRef} lang="tsx">
                {children}
            </code>
        </pre>
    );
};

export default CodeBlock;