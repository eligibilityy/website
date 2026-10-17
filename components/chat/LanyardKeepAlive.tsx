"use client";

import { useLanyard, type Types } from "use-lanyard";

export function LanyardKeepAlive({
  discordID,
}: {
  discordID: Types.Snowflake;
}) {
  useLanyard(discordID);
  return null;
}
