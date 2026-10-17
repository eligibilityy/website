"use client";

import { useLanyard, type Types } from "use-lanyard";
import { statusDot, describePresence } from "@/lib/presence";
import { Bubble } from "./Bubble";
import { Spotify } from "./Spotify";

type PresenceBubbleProps = {
  discordID: Types.Snowflake;
  initialData: Types.Presence | undefined;
  tail: boolean;
};

export function PresenceBubble({
  discordID,
  initialData,
  tail,
}: PresenceBubbleProps) {
  const presence = useLanyard(discordID, { initialData });

  const spotify = presence?.spotify ?? null;

  return (
    <>
      <Bubble from="elijah" tail={tail && spotify === null}>
        <span className="flex items-center gap-2">
          <span
            className={`size-2 shrink-0 rounded-full ${presence ? statusDot[presence.discord_status] : "bg-gray-8"}`}
          />
          {presence ? describePresence(presence) : "..."}
        </span>
      </Bubble>
      {spotify !== null && (
        <div className="mt-1 flex flex-col">
          <Spotify spotify={spotify} tail={tail} />
        </div>
      )}
    </>
  );
}
