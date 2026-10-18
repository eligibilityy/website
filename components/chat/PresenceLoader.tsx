import { get, type Types } from "@prequist/lanyard";
import { PresenceBubble } from "./PresenceBubble";

type PresenceLoaderProps = {
  discordID: Types.Snowflake;
  tail: boolean;
};

export async function PresenceLoader({ discordID, tail }: PresenceLoaderProps) {
  // Don't hold the bubble hostage to a slow API; the client socket catches up.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 2000);
  const initialData = await get(discordID, { controller })
    .catch(() => undefined)
    .finally(() => clearTimeout(timeout));
  return (
    <PresenceBubble
      discordID={discordID}
      initialData={initialData}
      tail={tail}
    />
  );
}
