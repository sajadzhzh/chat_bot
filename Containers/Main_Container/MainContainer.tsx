export default function MainContainer({
  children,
  theme = "light",
}: {
  children: React.ReactNode;
  theme?: string;
}) {
  return (
    <main
      className={theme == "dark" ? "Container__main dark" : "Container__main"}
    >
      {children}
    </main>
  );
}
