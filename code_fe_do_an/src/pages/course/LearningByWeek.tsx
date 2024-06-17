import Header from "@/layout/header/Header";
import { FaCircle } from "react-icons/fa6";

export default function LearningByWeek() {
  // const [weekList, setCourseList] = useState<[]>([]);
  // // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // // const fetchData = useAuthAPI()
  // useEffect(() => {
  //   const handleFetchData = async () => {
  //     const request = await axios.get("/week");
  //     const response = request.data;
  //     console.log(response)
  //     if (response.statusCode === 200) {
  //       setCourseList(response.data);
  //     }
  //   };
  //   handleFetchData();
  // }, []);

  return (
    <div>
      <div className="bg-[#fff8e1]">
        <Header />
      </div>
      <div className="flex flex-row w-full h-fit">
        <div className="basis-1/5 h-[600px] flex flex-col items-center p-5 shadow-lg gap-7">
          <div className="text-2xl text-[#56a251] font-semibold">Tuần học</div>
          <div className="w-full h-full">
            
                <div className="w-full h-[45px] rounded-md hover:bg-[#8fd889] flex flex-row gap-2 justify-center items-center">
                  <FaCircle size={20} />
                  <div className="text-xl">Tuần 1</div>
                </div>
             
          </div>
        </div>
        <div className="basis-4/5 h-[800px]">Day</div>
      </div>
    </div>
  );
}
