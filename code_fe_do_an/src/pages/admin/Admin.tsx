import { BodyAdmin, HeaderAdmin, HomeBar } from "@/components/admin";

export default function Admin() {
  return (
    <div className="flex flex-row h-screen">
      <div className="w-1/6">
        <HomeBar />
      </div>
      <div className="flex flex-col w-5/6">
        <div>
          <HeaderAdmin />
        </div>
        <div>
          <BodyAdmin />
        </div>
      </div>
    </div>
  );
}
