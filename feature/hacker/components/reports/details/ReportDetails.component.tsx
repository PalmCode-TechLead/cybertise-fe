"use client";
import { cn } from "@/core/lib/utils";
import {
  Badge,
  Button,
  Card,
  Indicator,
  Loader,
  Tiptap,
  Tooltip,
  Typography,
} from "@/core/ui/components";
import { AnimationWrapper, Desktop, Mobile } from "@/core/ui/layout";
import { ChevronDown, MoveLeft } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ModalSendAttachment from "../_dialog/ModalSendAttachment";
import { ChatBubble } from "@/feature/hacker/containers";
import { useGetChatListItem } from "@/feature/hacker/query/client/useGetChatListItem";
import { useReportDetailsParamStore } from "@/feature/hacker/zustand/store/reports";
import { useRouter } from "next/navigation";
import {
  useGetTicketDetails,
  usePostChatItem,
} from "@/core/react-query/client";
import { SendReportRequestType } from "@/core/models/common/post_send_report";
import { toast } from "sonner";
import { indicatorVariants } from "@/core/ui/components/indicator/indicator";
import { useInView } from "react-intersection-observer";
import { useTranslations } from "next-intl";
import { useUserStore } from "@/core/zustands/globals/store";

const ReportDetails = ({ id }: { id: string }) => {
  const t = useTranslations("ChatReports");
  const { back } = useRouter();
  const store = useReportDetailsParamStore();
  const { data: userData } = useUserStore.getState();
  const { data: ticketDetails, isError: isErrorTicket } =
    useGetTicketDetails(id);
  const { data, isError, fetchNextPage, isFetchingNextPage } =
    useGetChatListItem(store.payload, id);
  const { ref } = useInView({
    threshold: 0.5,
    onChange: (inView) => {
      if (inView) {
        setTimeout(() => {
          fetchNextPage();
        }, 200);
      }
    },
  });
  const { ref: endChatRef, inView: inViewEnd } = useInView({ threshold: 0.5 });
  const chatData = data?.pages.map((page) => page.data).flat();
  const chatRef = useRef<HTMLDivElement>(null);
  const [openAttachment, setOpenAttachment] = useState<boolean>(false);
  const [description, setDescription] = useState<string>("");
  const [attachments, setAttachments] = useState<string[]>([]);
  const [files, setFiles] = useState<SendReportRequestType["files"]>([]);
  const { mutateAsync, isPending } = usePostChatItem();

  const scrollView = () => {
    setTimeout(() => {
      chatRef?.current?.scrollIntoView({ behavior: "instant" });
    }, 100);
  };

  useEffect(() => {
    if (data?.pages.length === 1) {
      scrollView();
    }
  }, [data]);

  const sendMessage = async () => {
    await mutateAsync({
      chat_ticket_id: id,
      sender_name: userData?.name,
      sender_avatar: userData?.avatar,
      content: description ?? undefined,
      attachments: attachments.length > 0 ? attachments : undefined,
    })
      .then(() => {
        setAttachments([]);
        setDescription("");
        setFiles(undefined);
        setOpenAttachment(false);
        chatRef?.current?.scrollIntoView({ behavior: "smooth" });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const isHiddenChatBox =
    (ticketDetails &&
      (ticketDetails.status.toLowerCase() === "closed" ||
        ticketDetails.status.toLowerCase() === "canceled")) ||
    false;

  if (isError || isErrorTicket || chatData?.length === 0) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        {t("no_chat_found")}
      </div>
    );
  }

  if (!data?.pages || !ticketDetails) return <Loader variant="hacker" />;
  return (
    <>
      <div ref={ref}></div>
      <Mobile>
        <div className="_flexbox__col__start__start relative w-full">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full bg-background-page-light dark:bg-background-page-dark"
            )}
          >
            <Card
              className={cn(
                "_flexbox__row__start__between sticky top-0",
                "z-30 w-full rounded-none p-6"
              )}
            >
              <div className="_flexbox__col__start__start gap-4">
                {ticketDetails.title.length > 25 ? (
                  <Tooltip content={ticketDetails.title}>
                    <Typography
                      variant="h5"
                      weight="bold"
                    >
                      {`#${ticketDetails.code}: ${ticketDetails.title.substring(
                        0,
                        25
                      )}...`}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    variant="h5"
                    weight="bold"
                  >
                    {`#${ticketDetails.code}: ${ticketDetails.title}`}
                  </Typography>
                )}
                <Badge
                  variant={
                    ticketDetails.risk_level_category.toLowerCase() as any
                  }
                  className="max-w-fit"
                >
                  {`${ticketDetails.risk_level} | ${ticketDetails.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    ticketDetails.status.toLowerCase() as keyof typeof indicatorVariants
                  }
                >
                  {ticketDetails.status}
                </Indicator>
              </div>
            </Card>
            <div
              className={cn(
                "sticky top-[8.15rem] z-30 w-full rounded-b-xl px-6 py-2",
                "bg-neutral-light-70 dark:bg-neutral-dark-70"
              )}
            >
              {t("chat_alert")}
            </div>
          </div>
          {isFetchingNextPage && (
            <Loader
              variant="hacker"
              width={12}
              height={12}
              className="h-12"
            />
          )}
          <div className="px-6 py-8">
            <ChatBubble data={chatData ?? []} />
          </div>
          <div ref={endChatRef}></div>
          {!inViewEnd && (
            <Button
              variant="default"
              className={cn(
                "fixed z-50 mx-auto w-fit",
                "left-1/2 -translate-x-1/2 transform",
                isHiddenChatBox ? "bottom-4" : "bottom-12"
              )}
              prefixIcon={<ChevronDown className="!text-neutral-dark-100" />}
              onClick={() => {
                chatRef?.current?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              <Typography
                variant="p"
                affects="small"
                className="!text-neutral-dark-100"
              >
                {t("jump_to_last_message")}
              </Typography>
            </Button>
          )}
        </div>
      </Mobile>
      <Desktop>
        <div className="_flexbox__col__start__start relative w-full">
          <div
            className={cn(
              "_flexbox__col__start__start sticky top-0 z-30",
              "h-fit w-full gap-3 bg-background-page-light pt-8 dark:bg-background-page-dark"
            )}
          >
            <Card
              className={cn(
                "_flexbox__row__center__between sticky top-0",
                "z-30 w-full rounded-b-none rounded-t-2xl !p-6"
              )}
            >
              <div className="_flexbox__row__center__start gap-5">
                <MoveLeft
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={back}
                />
                {ticketDetails.title.length > 25 ? (
                  <Tooltip content={ticketDetails.title}>
                    <Typography
                      variant="h5"
                      weight="bold"
                    >
                      {`#${ticketDetails.code}: ${ticketDetails.title.substring(
                        0,
                        25
                      )}...`}
                    </Typography>
                  </Tooltip>
                ) : (
                  <Typography
                    variant="h5"
                    weight="bold"
                  >
                    {`#${ticketDetails.code}: ${ticketDetails.title}`}
                  </Typography>
                )}
                <Badge
                  variant={
                    ticketDetails.risk_level_category.toLowerCase() as any
                  }
                  className="max-w-fit"
                >
                  {`${ticketDetails.risk_level} | ${ticketDetails.risk_level_category}`}
                </Badge>
              </div>
              <div className="_flexbox__row__center gap-3">
                <Indicator
                  variant={
                    ticketDetails.status.toLowerCase() as keyof typeof indicatorVariants
                  }
                >
                  {ticketDetails.status}
                </Indicator>
              </div>
            </Card>
            <AnimationWrapper>
              <div
                className={cn(
                  "sticky top-[8.15rem] z-30 h-4 w-full rounded-t-xl"
                )}
              ></div>
            </AnimationWrapper>
          </div>
          {isFetchingNextPage && (
            <Loader
              variant="hacker"
              width={12}
              height={12}
              className="h-12"
            />
          )}
          <ChatBubble data={chatData ?? []} />
          <div ref={endChatRef}></div>
        </div>
        {!inViewEnd && (
          <Button
            variant="default"
            className={cn(
              "absolute z-50 mx-auto w-fit",
              "left-1/2 transform",
              isHiddenChatBox ? "bottom-12" : "bottom-56"
            )}
            prefixIcon={<ChevronDown className="!text-neutral-dark-100" />}
            onClick={() => {
              chatRef?.current?.scrollIntoView({ behavior: "smooth" });
            }}
          >
            <Typography
              variant="p"
              affects="small"
              className="!text-neutral-dark-100"
            >
              {t("jump_to_last_message")}
            </Typography>
          </Button>
        )}
        {!isHiddenChatBox && (
          <div
            className={cn(
              "sticky bottom-0 z-50 bg-background-page-light py-2 dark:bg-background-page-dark"
            )}
          >
            <Tiptap
              description={description}
              onChangeValue={(v) => {
                setDescription(v);
              }}
              placeholder="Write your message..."
              variant="hacker"
              isLoading={isPending}
              isChat
              onClickSendAttachment={() => setOpenAttachment(true)}
              onClickSendMessage={sendMessage}
              withImage
            />
          </div>
        )}
      </Desktop>
      <ModalSendAttachment
        files={files}
        onChangeFiles={(v, type) => {
          if (type === "put") {
            setFiles((prev) => [...(prev ?? []), ...(v ?? [])]);
            return;
          }
          if (type === "delete") {
            setFiles(v);
            return;
          }
        }}
        onChangeAttachment={(v, type) => {
          if (type === "put") {
            setAttachments((prev) => [...(prev ?? []), v]);
            return;
          }
          if (type === "delete") {
            setAttachments((prev) => prev?.filter((file) => file !== v));
            return;
          }
        }}
        description={description}
        isOpen={openAttachment}
        onClose={() => {
          setFiles(undefined);
          setAttachments([]);
          setOpenAttachment(false);
        }}
        attachment={attachments}
        onChangeValue={(v) => {
          setDescription(v);
        }}
        onClickSendAttachment={sendMessage}
        isLoading={isPending}
      />
      <div ref={chatRef}></div>
    </>
  );
};
export default ReportDetails;
