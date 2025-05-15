import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className=" h-96 text-white flex flex-col justify-center items-center gap-2">
      <h1 className="text-3xl flex justify-center items-center"><span>Buy Me a Chai</span><span><img width={64} src="chai.webp" alt="chaha" /></span></h1>
      <p>A crowd Funded Platform for creaters. Get Funded by the fans. Start now!</p>
      <div className="m-6">

        <Link href={"/login"}>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Start now</button></Link>

      <Link href={"/about"}>
      <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Read More</button></Link>
      </div>
      </div>
      <div className="bg-slate-400 h-1 mx-2 my-8"></div>
      <div className="text-white flex justify-center items-center gap-12 flex-wrap">
        <div className="w-full flex justify-center items-center "><h1 className="text-2xl">Fans Can buy Chai</h1></div>
        <div className="flex flex-col justify-center items-center">
        <img src="man.webp" alt="man" width={88} className="rounded-full" />
        <h2>Fans Want to Help</h2>
        <span>Your Fans are available for you to help you</span>
        </div>
        <div className="flex flex-col justify-center items-center">
        <img src="coin.jpg" alt="man" width={88} className="rounded-full" />
        <h2>Fans Want to Help</h2>
        <span>Your Fans are available for you to help you</span>
        </div>
        <div className="flex flex-col justify-center items-center">
        <img src="group.webp" alt="man" width={88} className="rounded-full" />
        <h2>Fans Want to Help</h2>
        <span>Your Fans are available for you to help you</span>
        </div>
        </div>
        <div className="bg-slate-400 h-1 mx-2 my-8"></div>
        <div className="text-white flex flex-col gap-12 pb-4">
          <div className="text-2xl w-full flex justify-center items-center"><h1>Learn mora about us</h1></div>
          <div className="flex justify-center items-center w-full gap-12">
            <div className="hover:cursor-pointer  flex justify-center items-center flex-col">
              <img width={88} className="rounded-full" src="man.webp" alt="man" />
              <h2>Fans want to help you</h2>
              <span>your fans are available for you to help you</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <img width={88} className="rounded-full" src="man.webp" alt="man" />
              <h2>Fans want to help you</h2>
              <span>your fans are available for you to help you</span>
            </div>
            <div className="flex justify-center items-center flex-col">
              <img width={88} className="rounded-full" src="groupn.jpg" alt="man" />
              <h2>Fans want to help you</h2>
              <span>your fans are available for you to help you</span>
            </div>
          </div>
        </div>
    </>
  );
}
