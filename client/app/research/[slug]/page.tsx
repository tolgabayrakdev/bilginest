import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, MessageCircle, Share2, BookOpen, ArrowLeft } from 'lucide-react'

const getResearchById = (id: string) => {
  const posts = [
    {
      id: "1",
      author: "Dr. Ayşe Yılmaz",
      avatar: "/placeholder.svg?height=40&width=40",
      title: "Türkiye'deki İklim Değişikliğinin Tarım Üzerindeki Etkileri",
      abstract: "İklim değişikliği, dünya genelinde tarım sektörünü etkileyen en önemli faktörlerden biridir. Bu çalışma, Türkiye özelinde iklim değişikliğinin tarım üzerindeki etkilerini incelemektedir. Son 50 yıllık iklim verileri ve tarımsal üretim istatistikleri analiz edilerek, ülkenin yedi coğrafi bölgesini kapsayan geniş bir alanda değerlendirmeler yapılmıştır.",
      content: `Bu araştırmada, Türkiye'deki iklim değişikliğinin tarım üzerindeki etkilerini inceledik. Son 50 yıllık iklim verileri ve tarımsal üretim istatistikleri analiz edildi. Çalışmamız, ülkenin yedi coğrafi bölgesini kapsayan geniş bir alanı içermektedir.

      Araştırmamızın temel bulguları şunlardır:

      1. Sıcaklık Artışı: Türkiye'nin ortalama sıcaklığı son 50 yılda 1.5°C artmıştır. Bu artış, özellikle Akdeniz ve Güneydoğu Anadolu bölgelerinde daha belirgindir.

      2. Yağış Düzensizliği: Yıllık toplam yağış miktarında önemli bir değişiklik gözlenmese de, yağış rejiminde belirgin değişiklikler tespit edilmiştir. Kış aylarında yağışlar azalırken, ilkbahar ve sonbaharda ani ve şiddetli yağışlar artmıştır.

      3. Kuraklık: Artan sıcaklıklar ve değişen yağış düzeni, özellikle İç Anadolu ve Güneydoğu Anadolu bölgelerinde kuraklık riskini artırmıştır.

      4. Tarımsal Üretim: İklim değişikliğinin etkisiyle, bazı bölgelerde geleneksel tarım ürünlerinin veriminde düşüşler gözlemlenmiştir. Örneğin, Çukurova bölgesinde pamuk üretimi %25 oranında azalmıştır.

      5. Sulama İhtiyacı: Artan sıcaklıklar ve kuraklık nedeniyle, tarımsal sulama ihtiyacı son 20 yılda %40 oranında artmıştır.

      6. Ekim-Dikim Zamanları: İklim değişikliği, geleneksel ekim-dikim zamanlarını etkilemiştir. Birçok çiftçi, ekim zamanlarını 2-3 hafta öne çekmiştir.

      7. Zararlı Popülasyonu: Sıcaklık artışıyla birlikte, bazı tarım zararlılarının popülasyonunda artış gözlemlenmiştir. Bu durum, pestisit kullanımını %30 oranında artırmıştır.

      Bu bulgular, Türkiye'nin tarım sektörünün iklim değişikliğine karşı oldukça savunmasız olduğunu göstermektedir. Acil adaptasyon stratejilerinin geliştirilmesi ve uygulanması gerekmektedir.`,
      category: "Çevre Bilimleri",
      tags: ["iklim değişikliği", "tarım", "sürdürülebilirlik"],
      likes: 45,
      comments: 12,
      shares: 8,
      views: 230,
      results: `Araştırmamızın sonuçları, iklim değişikliğinin Türkiye tarımı üzerinde ciddi etkileri olduğunu göstermektedir:

      1. Sıcaklık Artışı: Türkiye'nin ortalama sıcaklığı son 50 yılda 1.5°C artmıştır. 
      2. Yağış Düzensizliği: Kış aylarında yağışlar %15 oranında azalırken, ilkbahar ve sonbaharda ani ve şiddetli yağışlar %25 oranında artmıştır.
      3. Kuraklık: İç Anadolu ve Güneydoğu Anadolu bölgelerinde kuraklık riski %40 oranında artmıştır.
      4. Tarımsal Üretim: Çukurova bölgesinde pamuk üretimi %25 oranında azalmıştır.
      5. Sulama İhtiyacı: Tarımsal sulama ihtiyacı son 20 yılda %40 oranında artmıştır.
      6. Ekim-Dikim Zamanları: Birçok çiftçi, ekim zamanlarını 2-3 hafta öne çekmiştir.
      7. Zararlı Popülasyonu: Pestisit kullanımı %30 oranında artmıştır.
      8. Toprak Verimliliği: Topraktaki organik madde miktarı %10-15 oranında azalmıştır.
      9. Ürün Çeşitliliği: Ege bölgesinde tropik meyve üretimi son 10 yılda %200 oranında artmıştır.
      10. Ekonomik Etkiler: Türkiye'nin tarımsal GSYİH'sında yıllık ortalama %2-3 oranında bir kayıp yaşanmaktadır.`,
      sources: `1. IPCC. (2021). Climate Change 2021: The Physical Science Basis.
      2. Türkiye İstatistik Kurumu. (2020). Tarımsal Üretim İstatistikleri.
      3. Türkiye Meteoroloji Genel Müdürlüğü. (2021). Türkiye İklim Değişikliği Raporu.
      4. FAO. (2021). The State of Food and Agriculture 2021.
      5. Öztürk, K. (2002). Küresel İklim Değişikliği ve Türkiye'ye Olası Etkileri.
      6. Şen, Ö. L., et al. (2013). Hydro-climatic effects of future land-cover/land-use change in montane mainland southeast Asia.
      7. Türkeş, M. (2020). İklim Değişikliğinin Tarımsal Üretime Etkileri: Türkiye Örneği.
      8. Dellal, İ., McCarl, B. A., & Butt, T. (2011). The economic assessment of climate change on Turkish agriculture.`
    },
    // Diğer araştırmalar...
  ]
  return posts.find(post => post.id === id)
}

export default function ResearchPage({ params }: { params: { slug: string } }) {
  const research = getResearchById(params.slug)

  if (!research) {
    notFound()
  }

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <Link href="/" passHref>
          <Button variant="outline" size="sm">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Geri Dön
          </Button>
        </Link>
      </div>
      <Card className="mb-6">
        <CardHeader>
          <div className="flex items-center space-x-4 mb-4">
            <Avatar>
              <AvatarImage src={research.avatar} alt={research.author} />
              <AvatarFallback>{research.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-2xl">{research.title}</CardTitle>
              <p className="text-muted-foreground">{research.author} - {research.category}</p>
            </div>
          </div>
          <div className="space-x-2 mb-4">
            {research.tags.map(tag => (
              <Badge key={tag} variant="secondary">{tag}</Badge>
            ))}
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <section>
            <h3 className="text-xl font-semibold mb-2">Özet</h3>
            <p>{research.abstract}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">İçerik</h3>
            <p>{research.content}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Sonuçlar</h3>
            <p>{research.results}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Kaynaklar</h3>
            <p className="whitespace-pre-line">{research.sources}</p>
          </section>
        </CardContent>
        <CardFooter className="flex justify-between">
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              <Heart className="w-4 h-4 mr-2" />
              {research.likes}
            </Button>
            <Button variant="ghost" size="sm">
              <MessageCircle className="w-4 h-4 mr-2" />
              {research.comments}
            </Button>
            <Button variant="ghost" size="sm">
              <Share2 className="w-4 h-4 mr-2" />
              {research.shares}
            </Button>
          </div>
          <Button variant="ghost" size="sm">
            <BookOpen className="w-4 h-4 mr-2" />
            {research.views} görüntülenme
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
