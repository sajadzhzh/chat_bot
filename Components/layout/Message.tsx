export default function Message({
  message,
  type,
}: {
  message: string;
  type: string;
}) {
  return (
    <div
      className={
        type === "question"
          ? "message"
          : "message message__answer"
      }
    >
      {message}
    </div>
  );
}
