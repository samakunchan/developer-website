import '../../../core/utils/prism-init';
import React from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '../../../core/utils/lexical-code-wrapper';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import './RichTextEditor.css';

interface RichTextReadOnlyProps {
  content?: string | null;
  title: string;
}

const theme = {
  paragraph: 'lexical-p',
  heading: {
    h1: 'lexical-h1',
    h2: 'lexical-h2',
  },
  list: {
    ul: 'lexical-ul',
    ol: 'lexical-ol',
  },
};

function onError(error: Error) {
  console.error(error);
}

export const RichTextReadOnly: React.FC<RichTextReadOnlyProps> = ({ content, title }) => {
  const initialConfig = {
    namespace: 'RichTextReadOnly',
    theme,
    onError,
    nodes: [
      HeadingNode,
      ListNode,
      ListItemNode,
      QuoteNode,
      CodeNode,
      CodeHighlightNode,
      TableNode,
      TableCellNode,
      TableRowNode,
      AutoLinkNode,
      LinkNode,
    ],
    editorState: content ? content : undefined,
    editable: false,
  };

  return (
    <div className="rich-text-viewer">
      <h1 className="rich-text-viewer__title">{title}</h1>
      <LexicalComposer initialConfig={initialConfig}>
        <div className="lexical-editor-container readonly">
          <div className="lexical-editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="lexical-editor-input" />}
              placeholder={null}
              ErrorBoundary={LexicalErrorBoundary}
            />
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
