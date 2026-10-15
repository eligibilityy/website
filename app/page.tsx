import { Converstaion } from "@/components/chat/Conversation";
import { conversation } from "@/data/conversation";

export default function Home() {
  return <Converstaion messages={conversation} />;
}
