import * as React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula as theme } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ghcolors as lightTheme } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const Code: React.FC<{
  language?: string;
}> = props => {
  return (
    <SyntaxHighlighter
      language={props.language}
      style={theme}
    >
      {props.children}
    </SyntaxHighlighter>
  );
};

Code.defaultProps = {
  language: 'jsx',
};
