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
    <div className="flex items-center justify-center w-full mt-24">
      <div className="flex flex-col w-full h-full gap-10 p-10 bg-white shadow-sm rounded-3xl">
        <div className="mt-5 text-xl font-semibold text-center">
          TIẾN ĐỘ HỌC TẬP
        </div>
        <div className="flex flex-col gap-7">
          <div className="ml-5 font-semibold">Khóa học đã tham gia</div>
          <div className="flex flex-row items-center justify-around">
            <div className="flex flex-col w-[280px] h-[250px] bg-[#fff8e1] rounded-md shadow-md p-5 gap-3">
              <div className="w-[240px] h-[170px] bg-green-50 rounded-md"></div>
              <div className="flex flex-row justify-between">
                <div>Tiếng Nhật sơ cấp 1</div>
                <div className="text-[#9cda58]">70%</div>
              </div>
              <Progress className="h-[20px]" value={70} />
            </div>
            <div className="flex flex-col w-[280px] h-[250px] bg-[#fff8e1] rounded-md shadow-md p-5 gap-3">
              <div className="w-[240px] h-[170px] bg-green-50 rounded-md"></div>
              <div className="flex flex-row justify-between">
                <div>Tiếng Nhật sơ cấp 2</div>
                <div className="text-[#9cda58]">30%</div>
              </div>
              <Progress className="h-[20px]" value={30} />
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
