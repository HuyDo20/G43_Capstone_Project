import { AsyncImage } from "loadable-image";

type ContentHomeProps = {
  image: string;
  title: string;
  description: string;
};

export default function ContentHome1({
  image,
  title,
  description,
}: ContentHomeProps) {
  return (
    <div className="flex flex-col items-center justify-center w-1/4 gap-5">
      <AsyncImage
        src={image}
        className="size-24"
      />
      <div className="text-3xl font-semibold text-[#7d9c64]">{title}</div>
      <div className="text-center text-[#7d9c64]">{description}</div>
    </div>
  );
}
