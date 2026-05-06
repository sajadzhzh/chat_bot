"use client";

import { newQuestion, oldQuestion } from "@/app/actions/chat";
import Button from "@/Components/layout/Button";
import { useRouter, useSearchParams } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function InputContainer() {
  const [stateNew, formActionNew, pendingNew] = useActionState(
    newQuestion,
    null,
  );
  const [stateOld, formActionOld, pendingOld] = useActionState(
    oldQuestion,
    null,
  );

  const [newChat, setNewChat] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("new_chat")) {
      setNewChat(true);
    } else {
      setNewChat(false);
    }
  }, [searchParams]);

  useEffect(() => {
    switch (stateNew?.status) {
      case "error":
        toast.error(stateNew.message);
        break;
      case "success":
        router.push(`/?chat_id=${stateNew.conversation_id}`);
        break;
    }

    switch (stateOld?.status) {
      case "error":
        toast.error(stateOld.message);
        break;
    }

    router.refresh();
  }, [stateNew, stateOld]);

  return (
    <div className="Container__input">
      <form
        className="flex gap-2 w-full"
        action={newChat ? formActionNew : formActionOld}
      >
        <input
          type="text"
          name="userInput"
          placeholder="چطور میتونم کمکت کنم؟"
          className="userInput"
        />
        {!newChat && (
          <input
            type="hidden"
            name="chatID"
            value={searchParams.get("chat_id") || ""}
          />
        )}
        <Button
          text="ارسال"
          style="btn btn__ask"
          pending={newChat ? pendingNew : pendingOld}
        />
      </form>
    </div>
  );
}
