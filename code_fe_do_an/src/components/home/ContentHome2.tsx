import { ContentHomeProps } from "@/type";
import { AsyncImage } from "loadable-image";



export default function ContentHome2({
  image,
  title,
  description,
}: ContentHomeProps) {
  return (
      <div className="flex flex-col justify-center items-center gap-5 w-1/3 bg-[#9dc46a] shadow-md rounded-lg p-16 relative">
        <div className="w-[250px] h-[60px] bg-yellow-200 absolute top-[-30px]"></div>
        <AsyncImage src={image} className="w-[400px] h-[200px] rounded-md" />
        <div className="text-3xl text-center text-white">{title}</div>
        <div className="text-center text-white">{description}</div>
      </div>
  );
}
