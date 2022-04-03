import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter'
import { MarkdownProps } from '../interfaces';
import 'github-markdown-css/github-markdown-light.css';

const Markdown = (props: MarkdownProps) => {
    return(
        <div className="markdown-body">
        <ReactMarkdown 
        children={props.text}
        components={{
            code({node, inline, className, children, ...mdProps}) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
                <SyntaxHighlighter
                children={String(children).replace(/\n$/, '')}
                language={match[1]}
                PreTag="div"
                {...mdProps}
                />
            ) : (
                <code className={className} {...mdProps}>
                {children}
                </code>
            )
            }
        }}          
        remarkPlugins={[remarkGfm]}
        />
        </div>
    );
}

export default Markdown;
