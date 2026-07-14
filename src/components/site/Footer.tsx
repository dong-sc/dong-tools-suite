export function Footer() {
  return (
    <footer className="border-t border-neutral-200/60">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-2 px-6 py-10 text-sm text-neutral-500 sm:flex-row sm:items-center">
        <p>Built with curiosity.</p>
        <p>
          by{" "}
          <a
            href="https://donglinphoto.com"
            target="_blank"
            rel="noreferrer"
            className="text-neutral-700 transition-colors hover:text-neutral-900"
          >
            Dong Lin Photo
          </a>
        </p>
      </div>
    </footer>
  );
}
