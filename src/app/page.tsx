import Image from "next/image";
import Navbar from "./components/navbar/Navbar";
import hero from '@/public/hero.jpg';

export default function Home() {
  
  return (
<div className=" flex flex-col gap-20">
  <div className="flex items-center justify-center">
  <div className="text-3xl flex flex-col items-center bg-[url('https://t4.ftcdn.net/jpg/11/38/03/27/240_F_1138032729_xQdHEMmMPZL6H0DV25MXcta0UOHVGQ7I.jpg')] md:bg-[url('https://t4.ftcdn.net/jpg/13/11/05/53/240_F_1311055370_B2MiN2J4JSGR7U8AFHjwDsWL78WqgnUS.jpg')] bg-no-repeat bg-cover bg-center overflow-hidden rounded-4xl justify-end md:justify-center gap-5 h-[90vh] w-[90%] shadow-2xl">
    <h1 className="w-3/4 text-3xl md:text-5xl lg:text-7xl text-center font-bold uppercase font-[family-name:var(--font-bungee)] ">
      Join the ultimate war for victory.
    </h1>
  </div>
  </div>

  <div className="flex px-25  justify-between">
    <h2 className="text-2xl md:text-5xl w-1/3 lg:text-6xl text-center align-middle flex items-center font-bold uppercase font-[family-name:var(--font-bungee)] ">
      Who We Are
    </h2>
    <p className="first-letter:text-6xl w-2/3 font-black first-letter:text-[#67522e] first-letter:mr-[-10px] text-lg md:text-2xl lg:text-3xl text-justify ">
      A team of passionate enginneering students who are dedicated to creating a platform that brings people together through the power of gaming.
      <span className="opacity-90">
      We believe that gaming is not just a hobby, but a way to connect with others and build lasting friendships. Our mission is to create a space where gamers can come together, compete, and have fun. 
        </span> 
    </p>
  </div>
</div>

  );
}
