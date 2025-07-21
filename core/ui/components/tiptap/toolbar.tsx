"use client";
import { type Editor } from "@tiptap/react";
import {
  Bold,
  Image,
  Italic,
  Link,
  List,
  ListOrdered,
  Strikethrough,
  TerminalSquare,
  TextQuote,
  Underline,
} from "lucide-react";
import { Toggle } from "../toggle/toggle";
import Separator from "../separator/separator";
import { cn } from "@/core/lib/utils";
import { useCallback, useState } from "react";
import { Skeleton } from "../skeleton/skeleton";
import { ModalEmbedImage } from "./modal-embed-image";
import { FileWithUrl } from "@/interfaces";
import { Role } from "@/types/admin/sidebar";

interface I_ToolbarProps {
  editor: Editor | null;
  variant?: keyof typeof Role;
  withImage?: boolean;
}

const Toolbar = ({
  editor,
  variant = "hacker",
  withImage = false,
}: I_ToolbarProps) => {
  const [fileValues, setFileValues] = useState<FileWithUrl[]>();
  const [openModalEmbedImage, setOpenModalEmbedImage] = useState(false);
  const setLink = useCallback(() => {
    const previousUrl = editor?.getAttributes("link").href;
    const url = window.prompt("URL", previousUrl);

    // cancelled
    if (url === null) {
      return;
    }

    // empty
    if (url === "") {
      editor?.chain().focus().extendMarkRange("link").unsetLink().run();

      return;
    }

    // update link
    editor
      ?.chain()
      .focus()
      .extendMarkRange("link")
      .setLink({ href: url })
      .run();
  }, [editor]);

  const addImage = useCallback(
    (url: string) => {
      if (url) {
        editor?.chain().focus().setImage({ src: url }).run();
        setFileValues(undefined);
      }
      setOpenModalEmbedImage(false);
    },
    [editor]
  );

  if (!editor) return <Skeleton className="grid h-8 w-1/2" />;
  return (
    <div
      className={cn(
        "grid h-fit w-full max-w-full grid-flow-col",
        "place-content-start content-start gap-2 rounded-b-xl"
      )}
    >
      <Toggle
        size="sm"
        pressed={editor.isActive("bold")}
        onPressedChange={() => editor.chain().focus().toggleBold().run()}
      >
        <Bold />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("italic")}
        onPressedChange={() => editor.chain().focus().toggleItalic().run()}
      >
        <Italic />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("underline")}
        onPressedChange={() => editor.chain().focus().toggleUnderline().run()}
      >
        <Underline />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("strike")}
        onPressedChange={() => editor.chain().focus().toggleStrike().run()}
      >
        <Strikethrough />
      </Toggle>
      <Separator
        orientation="vertical"
        className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("orderedList")}
        onPressedChange={() => editor.chain().focus().toggleOrderedList().run()}
      >
        <ListOrdered />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("bulletList")}
        onPressedChange={() => editor.chain().focus().toggleBulletList().run()}
      >
        <List />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("blockquote")}
        onPressedChange={() => editor.chain().focus().toggleBlockquote().run()}
      >
        <TextQuote />
      </Toggle>
      <Separator
        orientation="vertical"
        className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
      />
      <Toggle
        size="sm"
        pressed={editor.isActive("codeBlock")}
        onPressedChange={() => editor.chain().focus().toggleCodeBlock().run()}
      >
        <TerminalSquare />
      </Toggle>
      <Toggle
        size="sm"
        pressed={editor.isActive("link")}
        onPressedChange={setLink}
      >
        <Link />
      </Toggle>
      {withImage && (
        <>
          <Separator
            orientation="vertical"
            className="space-x-1 !bg-neutral-dark-100 dark:!bg-white"
          />
          <Toggle
            size="sm"
            pressed={editor.isActive("image")}
            onPressedChange={() => setOpenModalEmbedImage(true)}
          >
            <Image />
          </Toggle>
        </>
      )}
      <ModalEmbedImage
        variant={variant}
        fileValues={fileValues}
        onFileSelected={(_, file) => setFileValues(file)}
        isOpen={openModalEmbedImage}
        onClose={() => {
          setFileValues(undefined);
          setOpenModalEmbedImage(false);
        }}
        onClickInsert={addImage}
      />
    </div>
  );
};
export default Toolbar;
