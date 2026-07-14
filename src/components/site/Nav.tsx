export function Nav() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-neutral-200/60 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-6">
        <a href="/" className="text-sm font-semibold tracking-tight text-neutral-900">
          Dong Tools
        </a>
        <a
          href="https://donglinphoto.com"
          target="_blank"
          rel="noreferrer"
          className="text-sm text-neutral-500 transition-colors hover:text-neutral-900"
        >
          Dong Lin Photo
        </a>
      </div>
    </header>
  );
}
