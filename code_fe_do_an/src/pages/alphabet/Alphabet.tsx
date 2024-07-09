import {
  ChoonHira,
  ChoonKata,
  HiraganaAmGhepTable,
  HiraganaBienAmTable,
  HiraganaTable,
  KatakanaAmGhepTable,
  KatakanaBienAmTable,
  KatakanaTable,
  NumberDisplay,
  SokuonHira,
  SokuonKata,
} from "@/components/alphabet";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Footer from "@/layout/footer/Footer";
import Header from "@/layout/header/Header";
import AlphabetPracticeComponent from "@/Practice/AlphabetyPractice";
export default function Alphabet() {
  return (
    <div
      className="w-full h-full bg-center bg-cover"
      style={{ backgroundImage: `url("/public/bg2.png")` }}
    >
      {/* className="w-full h-full bg-center bg-cover" style={{backgroundImage: `url("/public/bg1.png")` }} */}
      {/* Header */}
      <div className="bg-[#fff8e1]">
        <Header />
      </div>

      {/* Body */}
      <div className="container max-w-[1200px] w-full h-[1600px] p-7">
        <div className="bg-[#fbecb3] w-full h-[1480px] p-7 rounded-3xl">
          <Tabs defaultValue="hiragana" className="w-full h-[1500px]">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="hiragana">Hiragana</TabsTrigger>
              <TabsTrigger value="katakana">Katakana</TabsTrigger>
              <TabsTrigger value="number">Số đếm</TabsTrigger>
            </TabsList>
            <TabsContent value="hiragana">
              <Card className="w-full h-[1380px] px-10 py-5">
                <Tabs defaultValue="bangchucai" className="w-[1000px]">
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="bangchucai">Bảng chữ cái</TabsTrigger>
                    <TabsTrigger value="bienam">Biến âm</TabsTrigger>
                    <TabsTrigger value="amghep">Âm ghép</TabsTrigger>
                    <TabsTrigger value="truongam">Trường âm</TabsTrigger>
                    <TabsTrigger value="amngat">Âm ngắt</TabsTrigger>
                    <TabsTrigger value="luyentap">Luyện tập</TabsTrigger>
                  </TabsList>
                  <TabsContent className="pt-5" value="bangchucai">
                    <HiraganaTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="bienam">
                    <HiraganaBienAmTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="amghep">
                    <HiraganaAmGhepTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="truongam">
                    <ChoonHira />
                  </TabsContent>
                  <TabsContent className="pt-5" value="amngat">
                    <SokuonHira />
                  </TabsContent>
                  <TabsContent className="pt-5" value="luyentap">
                    <AlphabetPracticeComponent type={8}/>
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
            <TabsContent value="katakana">
              <Card className="w-full h-[1380px] px-10 py-5">
                <Tabs
                  defaultValue="bangchucai"
                  className="w-[1000px] h-[1300px]"
                >
                  <TabsList className="grid w-full grid-cols-6">
                    <TabsTrigger value="bangchucai">Bảng chữ cái</TabsTrigger>
                    <TabsTrigger value="bienam">Biến âm</TabsTrigger>
                    <TabsTrigger value="amghep">Âm ghép</TabsTrigger>
                    <TabsTrigger value="truongam">Trường âm</TabsTrigger>
                    <TabsTrigger value="amngat">Âm ngắt</TabsTrigger>
                    <TabsTrigger value="luyentap">Luyện tập</TabsTrigger>
                  </TabsList>
                  <TabsContent className="pt-5" value="bangchucai">
                    <KatakanaTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="bienam">
                    <KatakanaBienAmTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="amghep">
                    <KatakanaAmGhepTable />
                  </TabsContent>
                  <TabsContent className="pt-5" value="truongam">
                    <ChoonKata />
                  </TabsContent>
                  <TabsContent className="pt-5" value="amngat">
                    <SokuonKata />
                  </TabsContent>
                  <TabsContent className="pt-5" value="luyentap">
                    <AlphabetPracticeComponent type={9} />
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
            <TabsContent value="number">
              <Card className="w-full h-[1380px] px-10 py-5">
                <Tabs defaultValue="sodem" className="w-[1000px] h-[1300px]">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="sodem">Số đếm</TabsTrigger>
                    <TabsTrigger value="luyentap">Luyện tập</TabsTrigger>
                  </TabsList>
                  <TabsContent className="pt-5" value="sodem">
                    <NumberDisplay />
                  </TabsContent>
                  <TabsContent className="pt-5" value="luyentap">
                    <AlphabetPracticeComponent type={7} />
                  </TabsContent>
                </Tabs>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      {/* Footer */}

      <Footer />
    </div>
  );
}
