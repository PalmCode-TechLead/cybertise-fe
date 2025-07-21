"use client";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "./toolbar";
import Underline from "@tiptap/extension-underline";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import CharacterCount from "@tiptap/extension-character-count";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import javascript from "highlight.js/lib/languages/javascript";
import css from "highlight.js/lib/languages/css";
import html from "highlight.js/lib/languages/xml";
import typescript from "highlight.js/lib/languages/typescript";
import { common, createLowlight } from "lowlight";
import { cn } from "@/core/lib/utils";
import { useState } from "react";
import Tooltip from "../tooltip/tooltip";
import { Info, Paperclip, Send, X } from "lucide-react";
import Typography from "../typography/typography";
import Button from "../button/button";
import Separator from "../separator/separator";
import { Role } from "@/types/admin/sidebar";
import "highlight.js/styles/atom-one-dark.css";
import { useTranslations } from "next-intl";

const lowlight = createLowlight(common);
lowlight.register({ html });
lowlight.register({ javascript });
lowlight.register({ css });
lowlight.register({ typescript });

interface I_TiptapProps extends React.HTMLAttributes<HTMLDivElement> {
  description: string;
  onChangeValue?: (value: string) => void;
  label?: string;
  withTooltip?: boolean;
  onClearInput?: () => void;
  isChat?: boolean;
  variant?: keyof typeof Role;
  onClickSendAttachment?: () => void;
  onClickSendMessage?: () => void;
  isLoading?: boolean;
  maxLength?: number;
  placeholder?: string;
  showing?: boolean;
  isError?: boolean;
  withImage?: boolean;
}

const Tiptap = ({
  description,
  onChangeValue = () => {},
  label,
  withTooltip,
  isChat = false,
  isLoading = false,
  onClearInput = () => {},
  variant = "hacker",
  onClickSendAttachment,
  onClickSendMessage = () => {},
  maxLength = 5000,
  placeholder = "",
  showing = false,
  isError = false,
  withImage = false,
  ...props
}: I_TiptapProps) => {
  const t = useTranslations("TextEditor");
  const [isFocus, setIsFocused] = useState<boolean>(false);
  const editor = useEditor({
    editable: !showing,
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Underline,
      Placeholder.configure({
        placeholder: isChat ? t("placeholder_chat") : placeholder,
      }),
      Image.configure({
        inline: true,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Link.configure({
        openOnClick: true,
        autolink: true,
        validate: (href) => /^https?:\/\//.test(href),
      }),
      CharacterCount.configure({
        limit: maxLength,
        mode: "textSize",
      }),
    ],
    content: description,
    editorProps: {
      attributes: {
        class: cn(
          "w-full peer leading-tight appearance-none max-w-none overflow-auto whitespace-pre-line",
          "flex flex-col justify-start outline-none",
          isChat || showing
            ? "h-full mt-0 bg-transparent"
            : "mt-4 bg-neutral-light-90 dark:bg-neutral-dark-90"
        ),
      },
    },
    onUpdate: ({ editor }) => {
      const value = editor.isEmpty ? "" : editor.getHTML();
      onChangeValue(value);
    },
    onFocus: () => {
      editor?.commands.focus();
      setIsFocused(true);
    },
    onBlur: () => {
      setIsFocused(false);
    },
  });

  if (showing) {
    return (
      <EditorContent
        editor={editor}
        defaultValue={description}
        value={description}
        className={props.className}
      />
    );
  }

  if (isChat) {
    return (
      <div
        className={cn(
          "sticky bottom-16 z-50 w-full",
          "_flexbox__col__start__start rounded-t-md",
          props.className
        )}
      >
        {label && (
          <p
            className={cn(
              "absolute transform text-base text-neutral-light-30 duration-300 dark:text-neutral-dark-30",
              "left-3 z-20 origin-[0] scale-75 peer-focus:start-0",
              "top-0.5"
            )}
          >
            {label}
          </p>
        )}
        <EditorContent
          maxLength={5000}
          editor={editor}
          onKeyDown={(e) => {
            if (!description) return;
            if (e.key === "Enter" && e.shiftKey) {
              e.preventDefault();
              if (description === "<p><br></p>")
                return editor?.commands.clearContent();
              onClickSendMessage();
              editor?.commands.clearContent();
            }
          }}
          autoFocus
          className={cn(
            "peer flex max-h-32 min-h-32  w-full max-w-full overflow-auto whitespace-pre-line",
            "bg-background-main-light dark:bg-background-main-dark",
            "cursor-text rounded-md rounded-b-none p-3 placeholder:text-neutral-light-40 dark:placeholder:text-neutral-dark-40",
            label ? "pt-6" : "pt-3"
          )}
          onClick={(e) => {
            e.stopPropagation();
            editor?.commands.focus();
          }}
        />
        <Separator orientation="horizontal" />
        <div
          className={cn(
            "_flexbox__row__center__between w-full rounded-md p-3",

            label
              ? "bg-background-page-light dark:bg-background-page-dark"
              : "bg-neutral-light-100 dark:bg-neutral-dark-100"
          )}
        >
          <Toolbar
            variant={variant}
            editor={editor}
            withImage={withImage}
          />
          {!!onClickSendAttachment && !!onClickSendMessage && (
            <div className="_flexbox__row__center gap-4">
              <Button
                prefixIcon={<Paperclip />}
                variant={`tertiary-${variant}`}
                onClick={onClickSendAttachment}
              >
                {t("button_send_attachment")}
              </Button>
              <Button
                disabled={!description || description === "<p><br></p>"}
                postFixIcon={<Send />}
                variant={`primary-${variant}`}
                onClick={() => {
                  onClickSendMessage();
                  editor?.commands.clearContent();
                }}
              >
                {t("button_send_message")}
              </Button>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className={cn("relative w-full")}>
        <p
          className={cn(
            "absolute transform text-base text-neutral-light-30 duration-300 dark:text-neutral-dark-30",
            "left-4 z-20 origin-[0] scale-75 peer-focus:start-0",
            isFocus || !!description ? "top-2" : "top-4.5"
          )}
        >
          {label}
        </p>
        <div
          className={cn(
            "_flexbox__row__start__start w-full gap-4 bg-neutral-light-90 dark:bg-neutral-dark-90",
            "rounded-md border p-4",
            isError ? "!border-red-normal" : "!border-transparent",
            props.className
          )}
        >
          <div className="_flexbox__col__start__start w-full">
            <EditorContent
              editor={editor}
              className="peer flex h-44 w-full max-w-full overflow-auto whitespace-pre-line"
            />
            <Toolbar editor={editor} />
          </div>
          {withTooltip && !description ? (
            <Tooltip content="This is a tooltip">
              <Info className="h-6 w-6" />
            </Tooltip>
          ) : (
            <X
              className="h-6 w-6 cursor-pointer"
              onClick={() => {
                editor?.commands.clearContent();
                onClearInput();
              }}
            />
          )}
        </div>
      </div>
      <Typography
        variant="p"
        affects="tiny"
        className="text-neutral-light-30 dark:text-neutral-dark-30"
      >
        {t("remaining_characters")}:{" "}
        {maxLength - editor?.storage.characterCount.characters()} / 5000
      </Typography>
    </div>
  );
};

export default Tiptap;
