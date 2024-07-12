import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Progress } from "@/components/ui/progress";
export default function LearningProcess() {
  return (
    <div className="flex items-center justify-center w-full mt-12">
      <div className="flex flex-col w-full h-full gap-3 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          TIẾN ĐỘ HỌC TẬP
        </div>
        <div className="flex flex-col gap-7">
          <div className="ml-5 text-xl font-semibold">Khóa học đã tham gia</div>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col w-1/3 h-full bg-[#fff8e1] rounded-md shadow-md p-5 gap-3">
              <div className="flex flex-col gap-1">
                <div className="w-full h-[170px] bg-green-50 rounded-md"></div>
                <div className="flex flex-row justify-between gap-3">
                  <div className="font-semibold">Tiếng Nhật sơ cấp 1</div>
                  <div className="text-[#9cda58]">70%</div>
                </div>
                <Progress className="h-[15px]" value={70} />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Từ vựng</div>
                  <Progress className="h-[10px]" value={70} />
                  <div className="text-[#9cda58]">70%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Kanji</div>
                  <Progress className="h-[10px]" value={60} />
                  <div className="text-[#9cda58]">60%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Ngữ pháp</div>
                  <Progress className="h-[10px]" value={50} />
                  <div className="text-[#9cda58]">50%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Video</div>
                  <Progress className="h-[10px]" value={90} />
                  <div className="text-[#9cda58]">90%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Kiểm tra</div>
                  <Progress className="h-[10px]" value={50} />
                  <div className="text-[#9cda58]">50%</div>
                </div>
                
              </div>
            </div>
            <div className="flex flex-col w-1/3 h-full bg-[#fff8e1] rounded-md shadow-md p-5 gap-3">
              <div className="flex flex-col gap-1">
                <div className="w-full h-[170px] bg-green-50 rounded-md"></div>
                <div className="flex flex-row justify-between gap-3">
                  <div className="font-semibold">Tiếng Nhật sơ cấp 2</div>
                  <div className="text-[#9cda58]">50%</div>
                </div>
                <Progress className="h-[15px]" value={50} />
              </div>
              <div className="flex flex-col">
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Từ vựng</div>
                  <Progress className="h-[10px]" value={20} />
                  <div className="text-[#9cda58]">20%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Kanji</div>
                  <Progress className="h-[10px]" value={60} />
                  <div className="text-[#9cda58]">60%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Ngữ pháp</div>
                  <Progress className="h-[10px]" value={30} />
                  <div className="text-[#9cda58]">30%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Video</div>
                  <Progress className="h-[10px]" value={80} />
                  <div className="text-[#9cda58]">80%</div>
                </div>
                <div className="flex flex-row items-center gap-1">
                  <div className="basis-1/2">Kiểm tra</div>
                  <Progress className="h-[10px]" value={50} />
                  <div className="text-[#9cda58]">50%</div>
                </div>
                
              </div>
            </div>
            
          </div>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  2
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}
