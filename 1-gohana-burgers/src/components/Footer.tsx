export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div>
          <p className="font-[family-name:var(--font-display)] font-semibold text-step-1 mb-1">BRAND</p>
          <p className="text-step--1 text-muted">One-line brand promise goes here.</p>
        </div>
        <p className="text-step--1 text-muted">
          © {new Date().getFullYear()} BRAND · Site by The Story Flex
        </p>
      </div>
    </footer>
  )
}
