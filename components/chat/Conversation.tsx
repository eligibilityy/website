import type { Inline, Message, Sender } from "@/data/conversation";
import { getPosition, type Position } from "@/lib/chat";
import { Bubble } from "./Bubble";

type ConverstaionProps = {
  messages: Message[];
};

export function Converstaion({ messages }: ConverstaionProps) {
  return (
    <ol aria-label="Conversation" className="flex flex-col">
      {messages.map((message, index) => {
        const position = getPosition(messages, index);
        const startsGroup = position === "first" || position === "single";
        const spacing = index === 0 ? "" : startsGroup ? "mt-4" : "mt-0.5";

        return (
          <li key={index} className={`flex flex-col ${spacing}`}>
            <MessageContent message={message} position={position} />
          </li>
        );
      })}
    </ol>
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
      return <p>TODO: projects</p>;
    case "card":
      return <p>TODO: card</p>;
    case "presence":
      return <p>TODO: presence</p>;
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
        className={`${from === "elijah" ? "text-bubble-blue" : "text-white"} underline underline-offset-2`}
      >
        {part.label}
      </a>
    ),
  );
}
