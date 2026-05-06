"use client";

import { GetChats } from "@/app/actions/chat";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

type Titles = {
  id: number;
  title: string;
};

export default function ChatList() {
  const [chat, setChat] = useState<Titles[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const request = async () => {
      const req = await GetChats();

      switch (req.status) {
        case "error":
          setChat([]);
          break;
        case "success":
          setChat(req.chat);
          break;
      }
    };
    request();
  }, [searchParams]);

  const handleClick = (id: any) => {
    router.push(`/?chat_id=${id}`);
  };

  return (
    <div className="menu">
      {chat &&
        chat.map((i) => (
          <a
            id={JSON.stringify(i.id)}
            key={JSON.stringify(i.id)}
            onClick={() => handleClick(i.id)}
            className={Number(searchParams.get("chat_id")) === i.id ? "menu__item active" : "menu__item"}
          >
            {i.title}
          </a>
        ))}
    </div>
  );
}
