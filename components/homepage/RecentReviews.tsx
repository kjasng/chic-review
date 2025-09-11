import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

import { ReviewCard } from '@/components/cards/ReviewCard'
import { Button } from '@/components/ui/button'

const recentReviews = [
  {
    userName: 'Nguyễn Thảo',
    userAvatar: '',
    rating: 5,
    date: '2 ngày trước',
    location: 'Phú Quốc',
    title: 'Kỳ nghỉ tuyệt vời tại đảo ngọc',
    content:
      'Phú Quốc thật sự là thiên đường biển đảo! Nước biển trong xanh, bãi biển Sao cát trắng mịn như bột. Hải sản tươi ngon, giá cả hợp lý. Người dân địa phương rất thân thiện. Resort view biển tuyệt đẹp, dịch vụ chu đáo. Chắc chắn sẽ quay lại!',
    helpfulCount: 42,
    verified: true,
  },
  {
    userName: 'Trần Minh Đức',
    userAvatar: '',
    rating: 4,
    date: '3 ngày trước',
    location: 'Đà Lạt',
    title: 'Thành phố sương mù không làm tôi thất vọng',
    content:
      'Đà Lạt mùa này thời tiết rất đẹp, se lạnh về đêm. Chợ đêm náo nhiệt, nhiều món ăn vặt ngon. Homestay view đồi thông thơ mộng. Tuy nhiên, một số điểm du lịch khá đông khách vào cuối tuần.',
    helpfulCount: 28,
    verified: false,
  },
  {
    userName: 'Lê Hương',
    userAvatar: '',
    rating: 5,
    date: '5 ngày trước',
    location: 'Hội An',
    title: 'Phố cổ Hội An - Nơi thời gian ngừng trôi',
    content:
      'Hội An ban đêm với những chiếc đèn lồng lung linh thật sự rất lãng mạn. Phố cổ được bảo tồn rất tốt, kiến trúc độc đáo. Ẩm thực phong phú với các món đặc sản như cao lầu, mì Quảng. Có thể thuê xe đạp dạo quanh phố hoặc ra biển Cửa Đại.',
    helpfulCount: 67,
    verified: true,
  },
  {
    userName: 'Phạm Văn Nam',
    userAvatar: '',
    rating: 4,
    date: '1 tuần trước',
    location: 'Sapa',
    title: 'Trekking Sapa - Trải nghiệm khó quên',
    content:
      'Cảnh quan Sapa đẹp ngoài sức tưởng tượng với ruộng bậc thang xanh ngát. Trekking lên Fansipan khá vất vả nhưng rất đáng. Văn hóa người dân tộc độc đáo. Thời tiết thay đổi nhanh nên cần chuẩn bị kỹ trang phục.',
    helpfulCount: 35,
    verified: true,
  },
]

export function RecentReviews() {
  return (
    <section className='py-16'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-10 flex items-center justify-between'>
          <div>
            <h2 className='mb-2 text-3xl font-bold'>Đánh Giá Gần Đây</h2>
            <p className='text-muted-foreground'>
              Trải nghiệm thực tế từ cộng đồng du lịch
            </p>
          </div>
          <Button variant='outline' asChild className='hidden md:flex'>
            <Link href='/reviews'>
              Xem tất cả
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>

        {/* Reviews Grid */}
        <div className='grid gap-6 md:grid-cols-2'>
          {recentReviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>

        {/* Call to Action */}
        <div className='mt-12 rounded-lg bg-golden/10 p-8 text-center'>
          <h3 className='mb-4 text-2xl font-bold'>
            Chia Sẻ Trải Nghiệm Của Bạn
          </h3>
          <p className='mb-6 text-muted-foreground'>
            Hãy giúp cộng đồng du lịch Việt Nam bằng cách chia sẻ đánh giá chân
            thực của bạn
          </p>
          <Button className='bg-golden hover:bg-golden/90'>
            Viết đánh giá ngay
          </Button>
        </div>

        {/* Mobile View All Button */}
        <div className='mt-8 text-center md:hidden'>
          <Button variant='outline' asChild>
            <Link href='/reviews'>
              Xem tất cả đánh giá
              <ArrowRight className='ml-2 h-4 w-4' />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
