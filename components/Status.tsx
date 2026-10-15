type StatusProps = {
  label: string;
};

export function Status({ label }: StatusProps) {
  return (
    <span className="flex items-center gap-2 text-sm text-gray-11">
      <span className="relative flex size-2">
        <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-9 opacity-60 motion-reduce:animate-none" />
        <span className="relative inline-flex size-2 rounded-full bg-green-9" />
      </span>
      {label}
    </span>
  );
}
