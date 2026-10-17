import type { Inline, Message, Sender } from "@/data/conversation";
import { getPosition, type Position } from "@/lib/chat";
import { Bubble } from "./Bubble";
import { ProjectStack } from "./ProjectStack";
import { CardBubble } from "./CardBubble";
import { Suspense } from "react";
import { PresenceLoader } from "./PresenceLoader";
import { ChatList, ChatItem } from "./ChatList";

type ConversationProps = {
  messages: Message[];
};

export function Conversation({ messages }: ConversationProps) {
  return (
    <ChatList>
      {messages.map((message, index) => {
        const position = getPosition(messages, index);
        const startsGroup = position === "first" || position === "single";
        const spacing = index === 0 ? "" : startsGroup ? "mt-4" : "mt-1";

        return (
          <ChatItem key={index} className={`flex flex-col ${spacing}`}>
            <MessageContent message={message} position={position} />
          </ChatItem>
        );
      })}
    </ChatList>
  );
}

function MessageContent({
  message,
  position,
}: {
  message: Message;
  position: Position;
}) {
  const tail = position === "last" || position === "single";

  switch (message.kind) {
    case "text":
      return (
        <Bubble from={message.from} tail={tail}>
          <InlineText text={message.text} from={message.from} />
        </Bubble>
      );
    case "projects":
      return <ProjectStack projects={message.projects} />;
    case "card":
      return <CardBubble message={message} tail={tail} />;
    case "presence":
      return (
        <Suspense
          fallback={
            <Bubble from="elijah" tail={tail}>
              Checking Discord...
            </Bubble>
          }
        >
          <PresenceLoader discordID={message.discordID} tail={tail} />
        </Suspense>
      );
    default: {
      const unhandled: never = message;
      return unhandled;
    }
  }
}

function InlineText({ text, from }: { text: string | Inline[]; from: Sender }) {
  if (typeof text === "string") return text;

  return text.map((part, i) =>
    typeof part === "string" ? (
      part
    ) : (
      <a
        key={i}
        href={part.href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${from === "elijah" ? "text-bubble-blue" : "text-white"} underline underline-offset-2 `}
      >
        {part.label}
      </a>
    ),
  );
}
