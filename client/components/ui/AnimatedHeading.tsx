// import React from "react";

// interface Props {
//   children: React.ReactNode;
//   level?: 2 | 3 | 4;
//   className?: string;
// }

// export default function AnimatedHeading({ children, level = 2, className = "" }: Props) {
//   const text = typeof children === "string" ? children : String(children);
//   const lines = text.split("\n").map((l) => l.trim()).filter(Boolean);

//   const Tag = (`h${level}` as unknown) as any;

//   return (
//     <Tag className={`animated-heading ${className}`.trim()}>
//       {lines.map((line, i) => (
//         <span
//           key={i}
//           className="reveal-line"
//           style={{ transitionDelay: `${i * 10}ms` }}
//         >
//           {line}
//         </span>
//       ))}
//     </Tag>
//   );
// }
import React from "react";

interface Props {
  children: React.ReactNode;
  level?: 2 | 3 | 4;
  className?: string;
  animateBy?: "words" | "lines"; // Choose animation style
}

export default function AnimatedHeading({ 
  children, 
  level = 2, 
  className = "", 
  animateBy = "words" 
}: Props) {
  // Recursively extract text content from React children
  const getText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (typeof node === "number") return String(node);
    if (node === null || node === undefined) return "";
    if (Array.isArray(node)) return node.map(getText).join("");
    if (React.isValidElement(node) && node.props.children) {
      return getText(node.props.children);
    }
    return "";
  };

  const text = getText(children);
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  if (animateBy === "lines") {
    // Split by newlines or use entire text as one line
    const lines = text.includes("\n") 
      ? text.split("\n").map(l => l.trim()).filter(Boolean)
      : [text];

    return (
      <Tag className={`animated-heading ${className}`.trim()}>
        {lines.map((line, i) => (
          <span
            key={i}
            className="reveal-line block"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            {line}
          </span>
        ))}
      </Tag>
    );
  }

  // Word-by-word animation (default)
  const words = text.split(" ").filter(Boolean);

  return (
    <Tag className={`animated-heading ${className}`.trim()}>
      {words.map((word, i) => (
        <span
          key={i}
          className="reveal-word"
          style={{ 
            transitionDelay: `${i * 30}ms`,
            display: "inline-block",
            marginRight: i < words.length - 1 ? "0.25em" : "0"
          }}
        >
          {word}
        </span>
      ))}
    </Tag>
  );
}