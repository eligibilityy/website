import type { Message } from "@/data/conversation";
import { Bubble } from "./Bubble";

type CardMessage = Extract<Message, { kind: "card" }>;

type CardBubbleProps = {
  message: CardMessage;
  tail: boolean;
};

export function CardBubble({ message, tail }: CardBubbleProps) {
  return (
    <Bubble from={message.from} tail={tail} variant="card">
      <section aria-label={message.title}>
        <h3 className="px-4 pt-3 pb-2 text-xs font-semibold uppercase tracking-wide text-gray-9">
          {message.title}
        </h3>
        <ul className="px-4 pb-1">
          {message.items.map((item) => (
            <li
              key={item.title}
              className="flex flex-col gap-0.5 border-t border-black/5 py-2.5"
            >
              <span className="font-medium">{item.title}</span>
              {item.detail !== undefined && (
                <span className="text-sm text-gray-11">{item.detail}</span>
              )}
              {item.date !== undefined && (
                <span className="text-[13px] text-gray-9">{item.date}</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </Bubble>
  );
}
