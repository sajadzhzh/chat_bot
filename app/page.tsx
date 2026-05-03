import Image from "next/image";
import Link from "next/link";
import zht from "@/public/zhian_tech.jpeg";
import ButtonContainer from "@/Containers/Button_Container/ButtonContainer";
import ChatList from "@/Containers/Menu/Chat_List";

export default function Home() {
  return (
    <div className="Container flex">
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

        <ChatList />
        
        <ButtonContainer />
      </div>
      <div className="Container__chat"></div>
    </div>
  );
}
