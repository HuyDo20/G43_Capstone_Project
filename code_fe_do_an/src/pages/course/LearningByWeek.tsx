import Footer from '@/layout/footer/Footer'
import Header from '@/layout/header/Header'

export default function LearningByWeek() {
  return (
    <div>
        <div className='bg-[#fff8e1]'>
            <Header />
        </div>
        <div className='flex flex-row w-full gap-5 h-fit'>
            <div className='basis-1/5 h-[800px] bg-green-200'>Week</div>
            <div className='basis-4/5 h-[1200px] bg-blue-100'>Day</div>
        </div>
        <div className='bg-[#fff8e1] '>
            <Footer />
        </div>
    </div>
  )
}
