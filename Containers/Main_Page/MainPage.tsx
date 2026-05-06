"use client";

import Image from "next/image";
import Link from "next/link";
import zht from "@/public/zhian_tech.jpeg";
import ButtonContainer from "@/Containers/Button_Container/ButtonContainer";
import ChatList from "@/Containers/Menu/Chat_List";
import Message from "@/Components/layout/Message";
import InputContainer from "@/Containers/Chat_Container/Input_Container";
import Button from "@/Components/layout/Button";
import { toggleMenu } from "@/app/lib/utils/Events";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { GetChat } from "@/app/actions/chat";

type Chat = {
  id: number;
  message: string;
  type: string;
};

export default function MainPage() {
  const [newChat, setNewChat] = useState(false);
  const [data, setData] = useState<Chat[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleClick = () => {
    if (!newChat) {
      setNewChat(true);
      const params = new URLSearchParams(searchParams.toString());
      params.delete("chat_id");
      params.set("new_chat", "true");
      router.push(`/?${params.toString()}`);
    }
  };

  useEffect(() => {
    const isNew = searchParams.get("new_chat");

    if (isNew) {
      setNewChat(true);
    }

    setNewChat(false);
  }, []);

  useEffect(() => {
    if (searchParams.get("chat_id")) {
      setNewChat(false);
      const request = async () => {
        const req = await GetChat(searchParams.get("chat_id") || "");

        switch (req.status) {
          case "error":
            setData([]);
            break;
          case "success":
            setData(req.chat);
            break;
        }
      };
      request();
    } else if (searchParams.get("new_chat")) {
      setData([]);
    }
  }, [searchParams]);

  return (
    <div className="Container flex">
      <Button text="منو" style="btn btn__menu" onClick={() => toggleMenu()} />
      <div className="Container__menu">
        <Link href="/" className="logo__text">
          <Image
            src={zht}
            width={500}
            height={100}
            alt="Zhian_tech"
            loading="eager"
            className="logo__img"
          />
          ZhianTech
        </Link>

        <Button text="موضوع جدید" style="btn" onClick={handleClick} />
        <ChatList />

        <ButtonContainer />
      </div>
      <div className="h-full w-full md:ms-5">
        <div className="Container__chat">
          {data &&
            data.map((i) => (
              <Message message={i.message} type={i.type} key={i.id} />
            ))}
        </div>
        <InputContainer />
      </div>
    </div>
  );
}
