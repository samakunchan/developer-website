import '../../../core/utils/prism-init';
import React, { useState } from 'react';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { LinkPlugin } from '@lexical/react/LexicalLinkPlugin';
import { TablePlugin } from '@lexical/react/LexicalTablePlugin';
import { LexicalErrorBoundary } from '@lexical/react/LexicalErrorBoundary';
import { LexicalToolbar } from './LexicalToolbar';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import { TableNode, TableCellNode, TableRowNode } from '@lexical/table';
import { ListItemNode, ListNode } from '@lexical/list';
import { CodeHighlightNode, CodeNode } from '../../../core/utils/lexical-code-wrapper';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { EditorState } from 'lexical';
import './RichTextEditor.css';
import { Button } from '../../../components/Button';

interface RichTextEditorProps {
  initialContent?: string | null;
  onSave: (title: string, content: string) => void;
  title: string;
  isSaving?: boolean;
}

const theme = {
  // Add theme details if needed, but we mostly use CSS
  paragraph: 'lexical-p',
  heading: {
    h1: 'lexical-h1',
    h2: 'lexical-h2',
  },
  list: {
    ul: 'lexical-ul',
    ol: 'lexical-ol',
  },
  text: {
    bold: 'lexical-text-bold',
    italic: 'lexical-text-italic',
    underline: 'lexical-text-underline',
    strikethrough: 'lexical-text-strikethrough',
    underlineStrikethrough: 'lexical-text-underline-strikethrough',
    code: 'lexical-text-code',
  },
};

function onError(error: Error) {
  console.error(error);
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({ initialContent, onSave, title, isSaving = false }) => {
  const [editorState, setEditorState] = useState<EditorState | null>(null);
  const [currentTitle, setCurrentTitle] = useState(title);

  const initialConfig = {
    namespace: 'RichTextEditor',
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
    editorState: initialContent ? initialContent : undefined,
  };

  const handleSave = () => {
    if (!editorState) return;
    onSave(currentTitle, JSON.stringify(editorState.toJSON()));
  };

  return (
    <div className="rich-text-editor">
      <div className="rich-text-editor__header">
        <input
          id="document-title"
          type="text"
          value={currentTitle}
          onChange={(e) => setCurrentTitle(e.target.value)}
          placeholder="Document Title"
        />
      </div>

      <LexicalComposer initialConfig={initialConfig}>
        <div className="lexical-editor-container">
          <LexicalToolbar />
          <div className="lexical-editor-inner">
            <RichTextPlugin
              contentEditable={<ContentEditable className="lexical-editor-input" />}
              placeholder={<div className="lexical-editor-placeholder">Enter text...</div>}
              ErrorBoundary={LexicalErrorBoundary}
            />
            <HistoryPlugin />
            <ListPlugin />
            <LinkPlugin />
            <TablePlugin />
            <OnChangePlugin onChange={(state) => setEditorState(state)} />
          </div>
          <div className="lexical-editor-save-container">
            <Button onClick={handleSave} disabled={isSaving || !editorState}>
              {isSaving ? 'Saving...' : 'Save Document'}
            </Button>
          </div>
        </div>
      </LexicalComposer>
    </div>
  );
};
