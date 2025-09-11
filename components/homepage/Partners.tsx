import Image from 'next/image'

const partners = [
  {
    name: 'Vietnam Airlines',
    logo: '/homepage/partners/partner-1.svg',
  },
  {
    name: 'Vietjet Air',
    logo: '/homepage/partners/partner-1.svg',
  },
  {
    name: 'Bamboo Airways',
    logo: '/homepage/partners/partner-1.svg',
  },
  {
    name: 'Vinpearl',
    logo: '/homepage/partners/partner-1.svg',
  },
  {
    name: 'Sun Group',
    logo: '/homepage/partners/partner-1.svg',
  },
  {
    name: 'FLC Group',
    logo: '/homepage/partners/partner-1.svg',
  },
]

export function Partners() {
  return (
    <section className='bg-gray-50 py-16'>
      <div className='container mx-auto px-4'>
        {/* Section Header */}
        <div className='mb-10 text-center'>
          <h2 className='mb-2 text-3xl font-bold'>Đối Tác Tin Cậy</h2>
          <p className='text-muted-foreground'>
            Hợp tác với các thương hiệu du lịch hàng đầu Việt Nam
          </p>
        </div>

        {/* Partners Grid */}
        <div className='grid grid-cols-2 items-center justify-items-center gap-8 md:grid-cols-3 lg:grid-cols-6'>
          {partners.map((partner) => (
            <div
              key={partner.name}
              className='group flex h-20 w-full items-center justify-center rounded-lg bg-white p-4 transition-all hover:shadow-md'
            >
              <Image
                src={partner.logo}
                alt={partner.name}
                width={120}
                height={60}
                className='h-auto w-auto opacity-60 transition-opacity group-hover:opacity-100'
              />
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className='mt-12 grid grid-cols-1 gap-8 md:grid-cols-3'>
          <div className='text-center'>
            <div className='mb-2 text-3xl font-bold text-golden'>100K+</div>
            <p className='text-sm text-muted-foreground'>
              Người dùng tin tưởng
            </p>
          </div>
          <div className='text-center'>
            <div className='mb-2 text-3xl font-bold text-golden'>50K+</div>
            <p className='text-sm text-muted-foreground'>Đánh giá chân thực</p>
          </div>
          <div className='text-center'>
            <div className='mb-2 text-3xl font-bold text-golden'>5000+</div>
            <p className='text-sm text-muted-foreground'>Homestay đối tác</p>
          </div>
        </div>
      </div>
    </section>
  )
}
