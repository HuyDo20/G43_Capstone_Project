import { AsyncImage } from "loadable-image";

type ContentHomeProps = {
  image: string;
  title: string;
  description: string;
};

export default function ContentHome2({
  image,
  title,
  description,
}: ContentHomeProps) {
  return (
      <div className="flex flex-col justify-center items-center gap-5 w-1/3 bg-[#ffe0b2] shadow-md rounded-lg p-16 relative">
        <div className="w-[250px] h-[60px] bg-yellow-200 absolute top-[-30px]"></div>
        <AsyncImage src={image} className="w-[400px] h-[200px] rounded-md" />
        <div className="text-3xl text-center text-[#7d9c64]">{title}</div>
        <div className="text-center text-[#657e50]">{description}</div>
      </div>
  );
}
