import Image from "next/image";
import type { Types } from "use-lanyard";
import { Bubble } from "./Bubble";

import { useState } from "react";
import { AnimatePresence, motion, useIsPresent } from "motion/react";

type SpotifyProps = {
  spotify: Types.Spotify;
  tail: boolean;
};

export function Spotify({ spotify, tail }: SpotifyProps) {
  const trackKey = spotify.track_id ?? `${spotify.song}-${spotify.artist}`;

  const href =
    spotify.track_id !== null
      ? `https://open.spotify.com/track/${spotify.track_id}`
      : undefined;

  return (
    <Bubble from="elijah" tail={tail} variant="media">
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <div className="relative aspect-square overflow-hidden rounded-t-[18px]">
          <AnimatePresence>
            {spotify.album_art_url !== null ? (
              <AlbumArt
                key={trackKey}
                src={spotify.album_art_url}
                alt={`Album art for ${spotify.album ?? spotify.song}`}
              />
            ) : (
              <div className="size-full bg-gray-3" />
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={trackKey}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.18 }}
            className="flex flex-col gap-px px-4 pt-2.5 pb-3"
          >
            <span className="font-semibold">{spotify.song}</span>
            {spotify.artist !== null && (
              <span className="text-sm text-gray-11">{spotify.artist}</span>
            )}
            <div className="text-sm text-gray-9">open.spotify.com</div>
          </motion.div>
        </AnimatePresence>
      </a>
    </Bubble>
  );
}

function AlbumArt({ src, alt }: { src: string; alt: string }) {
  const [loaded, setLoaded] = useState(false);
  const isPresent = useIsPresent();

  return (
    <motion.div
      className={`absolute inset-0 ${isPresent ? "z-10" : "z-0"}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: loaded ? 1 : 0 }}
      exit={{ opacity: 0, transition: { delay: 0.4, duration: 0.2 } }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="280px"
        className="object-cover"
        onLoad={() => setLoaded(true)}
      />
    </motion.div>
  );
}
