import { useLayoutEffect, useRef } from 'react';
import hljs from "highlight.js";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/atom-one-dark-reasonable.css";

type CodeBlockProps = {
    children: any;
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
        <pre className="my-2" style={{tabSize: 2}}>
            <code ref={codeRef} lang="tsx">
                {children}
            </code>
        </pre>
    );
};

export default CodeBlock;