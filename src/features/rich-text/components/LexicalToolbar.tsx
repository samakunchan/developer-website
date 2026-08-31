import React, { useCallback, useEffect, useState } from 'react';
import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import {
  CAN_REDO_COMMAND,
  CAN_UNDO_COMMAND,
  REDO_COMMAND,
  UNDO_COMMAND,
  SELECTION_CHANGE_COMMAND,
  FORMAT_TEXT_COMMAND,
  FORMAT_ELEMENT_COMMAND,
  $getSelection,
  $isRangeSelection,
} from 'lexical';
import { $setBlocksType } from '@lexical/selection';
import { $createHeadingNode, HeadingTagType } from '@lexical/rich-text';
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from '@lexical/list';
import { mergeRegister } from '@lexical/utils';

export const LexicalToolbar: React.FC<unknown> = () => {
  const [editor] = useLexicalComposerContext();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  const updateToolbar = useCallback(() => {
    const selection = $getSelection();
    if ($isRangeSelection(selection)) {
      setIsBold(selection.hasFormat('bold'));
      setIsItalic(selection.hasFormat('italic'));
      setIsUnderline(selection.hasFormat('underline'));
    }
  }, []);

  useEffect(() => {
    return mergeRegister(
      editor.registerUpdateListener(({ editorState }) => {
        editorState.read(() => {
          updateToolbar();
        });
      }),
      editor.registerCommand(
        SELECTION_CHANGE_COMMAND,
        () => {
          updateToolbar();
          return false;
        },
        1,
      ),
      editor.registerCommand(
        CAN_UNDO_COMMAND,
        (payload) => {
          setCanUndo(payload);
          return false;
        },
        1,
      ),
      editor.registerCommand(
        CAN_REDO_COMMAND,
        (payload) => {
          setCanRedo(payload);
          return false;
        },
        1,
      ),
    );
  }, [editor, updateToolbar]);

  const formatHeading = (headingType: HeadingTagType) => {
    editor.update(() => {
      const selection = $getSelection();
      if ($isRangeSelection(selection)) {
        $setBlocksType(selection, () => $createHeadingNode(headingType));
      }
    });
  };

  return (
    <div className="lexical-toolbar">
      <button
        disabled={!canUndo}
        onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
        className="lexical-toolbar__button"
        title="Undo"
      >
        <span>↩</span>
      </button>
      <button
        disabled={!canRedo}
        onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
        className="lexical-toolbar__button"
        title="Redo"
      >
        <span>↪</span>
      </button>

      <div className="lexical-toolbar__divider" />

      <button onClick={() => formatHeading('h1')} className="lexical-toolbar__button" title="Heading 1">
        H1
      </button>
      <button onClick={() => formatHeading('h2')} className="lexical-toolbar__button" title="Heading 2">
        H2
      </button>

      <div className="lexical-toolbar__divider" />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'bold')}
        className={`lexical-toolbar__button ${isBold ? 'lexical-toolbar__button--active' : ''}`}
        title="Bold"
      >
        <b>B</b>
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'italic')}
        className={`lexical-toolbar__button ${isItalic ? 'lexical-toolbar__button--active' : ''}`}
        title="Italic"
      >
        <i>I</i>
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_TEXT_COMMAND, 'underline')}
        className={`lexical-toolbar__button ${isUnderline ? 'lexical-toolbar__button--active' : ''}`}
        title="Underline"
      >
        <u>U</u>
      </button>

      <div className="lexical-toolbar__divider" />

      <button
        onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
        className="lexical-toolbar__button"
        title="Bullet List"
      >
        • List
      </button>
      <button
        onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
        className="lexical-toolbar__button"
        title="Numbered List"
      >
        1. List
      </button>

      <div className="lexical-toolbar__divider" />

      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'left')}
        className="lexical-toolbar__button"
        title="Left Align"
      >
        {/* Left icon */}⫷
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'center')}
        className="lexical-toolbar__button"
        title="Center Align"
      >
        {/* Center icon */}〓
      </button>
      <button
        onClick={() => editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, 'right')}
        className="lexical-toolbar__button"
        title="Right Align"
      >
        {/* Right icon */}⫸
      </button>
    </div>
  );
};
