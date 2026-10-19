import type { Types } from "@prequist/lanyard";

export const statusDot: Record<Types.DiscordStatus, string> = {
  online: "bg-green-9",
  idle: "bg-amber-400",
  dnd: "bg-red-500",
  offline: "bg-gray-8",
};

export function describePresence(presence: Types.Presence): string {
  if (presence.spotify !== null) {
    // const { song, artist } = presence.spotify;
    return "I'm listening to this rn:";
    // return artist !== null
    //   ? `I'm listening to ${song} by ${artist}`
    //   : `I'm listening to ${song}`;
  }

  const playing = presence.activities.find((a) => a.type === 0);
  if (playing !== undefined) {
    return playing.details !== undefined
      ? `${playing.name}: ${playing.details}`
      : `I'm currently on ${playing.name}`;
  }

  // const custom = presence.activities.find((a) => a.type === 4);
  // if (custom !== undefined && custom.state) return custom.state;

  const fallback: Record<Types.DiscordStatus, string> = {
    online: "I'm online doing something",
    idle: "Away for a bit",
    dnd: "Busy rn",
    offline: "Offline",
  };
  return fallback[presence.discord_status];
}
