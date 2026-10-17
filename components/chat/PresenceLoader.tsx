import { get, type Types } from "@prequist/lanyard";
import { PresenceBubble } from "./PresenceBubble";

type PresenceLoaderProps = {
  discordID: Types.Snowflake;
  tail: boolean;
};

export async function PresenceLoader({ discordID, tail }: PresenceLoaderProps) {
  const initialData = await get(discordID).catch(() => undefined);
  return (
    <PresenceBubble
      discordID={discordID}
      initialData={initialData}
      tail={tail}
    />
  );
}
