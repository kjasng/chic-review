import {
  BookOpen,
  Users,
  TrendingUp,
  MessageSquare,
  Award,
  Target,
} from 'lucide-react'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function MissionSection() {
  const missions = [
    {
      icon: BookOpen,
      title: 'Chia sẻ kinh nghiệm học tập',
      description:
        'Trao đổi phương pháp học tập hiệu quả, tài liệu và kinh nghiệm từ các bạn sinh viên đi trước',
    },
    {
      icon: Users,
      title: 'Kết nối cộng đồng sinh viên',
      description:
        'Xây dựng mạng lưới kết nối với sinh viên cùng ngành, cùng trường trên toàn quốc',
    },
    {
      icon: MessageSquare,
      title: 'Đánh giá chân thực',
      description:
        'Đánh giá khách quan về trường học, giảng viên, môn học giúp sinh viên có lựa chọn tốt nhất',
    },
    {
      icon: TrendingUp,
      title: 'Phát triển bản thân',
      description:
        'Cung cấp thông tin về học bổng, thực tập, việc làm và cơ hội phát triển sự nghiệp',
    },
    {
      icon: Award,
      title: 'Hỗ trợ học thuật',
      description:
        'Giải đáp thắc mắc, hỗ trợ học tập và định hướng nghề nghiệp từ cộng đồng',
    },
    {
      icon: Target,
      title: 'Định hướng tương lai',
      description:
        'Giúp sinh viên có cái nhìn rõ ràng về ngành nghề và định hướng phát triển cá nhân',
    },
  ]

  return (
    <section className='bg-muted/30 py-16 md:py-24'>
      <div className='container mx-auto px-4'>
        <div className='mb-12 text-center'>
          <h2 className='mb-4 text-3xl font-bold md:text-4xl'>
            Sứ mệnh của chúng tôi
          </h2>
          <p className='mx-auto max-w-2xl text-lg text-muted-foreground'>
            Chic Review cam kết xây dựng một cộng đồng học thuật minh bạch, nơi
            mọi sinh viên Việt Nam có thể chia sẻ, học hỏi và phát triển cùng
            nhau
          </p>
        </div>

        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {missions.map((mission, index) => {
            const Icon = mission.icon
            return (
              <Card
                key={index}
                className='border-0 shadow-sm transition-shadow hover:shadow-md'
              >
                <CardHeader>
                  <div className='mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-golden/10'>
                    <Icon className='h-6 w-6 text-golden' />
                  </div>
                  <CardTitle className='text-lg'>{mission.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className='text-sm'>
                    {mission.description}
                  </CardDescription>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
