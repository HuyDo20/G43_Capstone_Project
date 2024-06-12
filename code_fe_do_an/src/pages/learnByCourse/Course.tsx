import { Button } from "@/components/ui/button";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";

export default function Course() {
  return (
    <div className="flex flex-col bg-[#fff8e1]">
      <Header />
      <div className="bg-white">
        <div className="container w-full h-[1000px] p-10 flex flex-col gap-y-7 items-center ">
          <div className="text-2xl font-semibold text-[#78b24d] mt-5">
            KHÓA HỌC
          </div>
          <div className="flex flex-col items-center w-full gap-3 p-5">
            <div className="w-[1100px] h-[220px] border border-[#78b24d] rounded-2xl justify-around flex flex-row py-5 items-center">
              <img className="w-1/4 h-full rounded-2xl" src="/banner.png" />
              <div className="flex flex-col w-1/2 h-full gap-5 p-4">
              <div className="text-xl font-semibold">Elementary Japanese</div>
              <div>Description</div>
              </div>
              <Button>Enroll course</Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
