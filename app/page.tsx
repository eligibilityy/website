import { Conversation } from "@/components/chat/Conversation";
import { conversation } from "@/data/conversation";

export default function Home() {
  return <Conversation messages={conversation} />;
}
