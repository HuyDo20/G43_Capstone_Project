import { Progress } from "@/components/ui/progress";

export default function Practice() {
  return (
    <div className="w-full h-[700px] bg-[#fff8e1] rounded-md flex flex-col px-20 py-10 gap-7">
      <div className="text-xl text-[#4b9c47] font-semibold">
        Luyện tập: Hãy chọn đáp án!
      </div>
      <div className="px-20">
        <Progress className="h-[20px]" value={30} />
      </div>
      <div className="w-full h-[600px] bg-white rounded-md px-20 py-10 flex flex-col gap-3">
        <div className="basis-[10%] text-xl text-[#4b9c47]">Câu 3</div>
        <div className="basis-[30%] flex flex-col gap-3">
          <div className=" text-[#4b9c47] font-semibold">
            Điền vào chỗ trống:
          </div>
          <div className="flex items-center justify-center pl-10 text-xl">
            私は ..... 日本の大学にいます
          </div>
        </div>
        <div className="basis-1/2">
          <div className=" text-[#4b9c47] font-semibold">
            Hãy chọn đáp án đúng:
          </div>
          <div className="grid grid-cols-2 gap-10 py-10 px-28">
            <div className="flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px]">は</div>
            <div className="flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px]">に</div>
            <div className="flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px]">い</div>
            <div className="flex items-center justify-center border border-[#4b9c47] rounded-md h-[70px] w-[200px]">ま</div>
          </div>
        </div>
      </div>
    </div>
  );
}
