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
      abstract: "İklim değişikliği, dünya genelinde tarım sektörünü etkileyen en önemli faktörlerden biridir. Bu çalışma, Türkiye özelinde iklim değişikliğinin tarım üzerindeki etkilerini incelemektedir. Son 50 yıllık iklim verileri ve tarımsal üretim istatistikleri analiz edilerek, ülkenin yedi coğrafi bölgesini kapsayan geniş bir alanda değerlendirmeler yapılmıştır.",
      methodology: "Bu çalışmada, son 50 yıllık iklim verileri ve tarımsal üretim istatistikleri analiz edildi. Türkiye Meteoroloji Genel Müdürlüğü'nden alınan iklim verileri ve Türkiye İstatistik Kurumu'ndan elde edilen tarımsal üretim verileri kullanıldı. Ayrıca, 500'den fazla çiftçi ile yüz yüze görüşmeler yapıldı ve 7 bölgede toplam 50 tarım arazisinde saha çalışması gerçekleştirildi.",
      results: `Araştırmamızın sonuçları, iklim değişikliğinin Türkiye tarımı üzerinde ciddi etkileri olduğunu göstermektedir:

      1. Sıcaklık Artışı: Türkiye'nin ortalama sıcaklığı son 50 yılda 1.5°C artmıştır. Bu artış, özellikle Akdeniz ve Güneydoğu Anadolu bölgelerinde daha belirgindir. Sıcaklık artışı, bitki gelişimini hızlandırmakta ve bazı bölgelerde erken olgunlaşmaya neden olmaktadır.

      2. Yağış Düzensizliği: Yıllık toplam yağış miktarında önemli bir değişiklik gözlenmese de, yağış rejiminde belirgin değişiklikler tespit edilmiştir. Kış aylarında yağışlar %15 oranında azalırken, ilkbahar ve sonbaharda ani ve şiddetli yağışlar %25 oranında artmıştır. Bu durum, özellikle kuru tarım yapılan bölgelerde verimi olumsuz etkilemektedir.

      3. Kuraklık: Artan sıcaklıklar ve değişen yağış düzeni, özellikle İç Anadolu ve Güneydoğu Anadolu bölgelerinde kuraklık riskini %40 oranında artırmıştır. Bu bölgelerde buğday ve arpa gibi tahıl ürünlerinin veriminde %20-30 oranında düşüş gözlemlenmiştir.

      4. Tarımsal Üretim: İklim değişikliğinin etkisiyle, bazı bölgelerde geleneksel tarım ürünlerinin veriminde düşüşler gözlemlenmiştir. Örneğin, Çukurova bölgesinde pamuk üretimi %25 oranında azalmıştır. Buna karşılık, Karadeniz bölgesinde çay ve fındık üretiminde %10-15 oranında artış kaydedilmiştir.

      5. Sulama İhtiyacı: Artan sıcaklıklar ve kuraklık nedeniyle, tarımsal sulama ihtiyacı son 20 yılda %40 oranında artmıştır. Bu durum, özellikle su kaynaklarının kısıtlı olduğu bölgelerde ciddi sorunlara yol açmaktadır.

      6. Ekim-Dikim Zamanları: İklim değişikliği, geleneksel ekim-dikim zamanlarını etkilemiştir. Birçok çiftçi, ekim zamanlarını 2-3 hafta öne çekmiştir. Bu değişiklik, bazı bölgelerde don riskini artırırken, diğer bölgelerde ikinci ürün yetiştirme imkanı sağlamıştır.

      7. Zararlı Popülasyonu: Sıcaklık artışıyla birlikte, bazı tarım zararlılarının popülasyonunda artış gözlemlenmiştir. Bu durum, pestisit kullanımını %30 oranında artırmıştır. Özellikle zeytin sineği ve pamuk beyazsineği gibi zararlıların yayılım alanı genişlemiştir.

      8. Toprak Verimliliği: İklim değişikliği, toprak verimliliğini de etkilemektedir. Artan sıcaklıklar ve değişen yağış düzeni, topraktaki organik madde miktarını %10-15 oranında azaltmıştır. Bu durum, özellikle kurak ve yarı kurak bölgelerde toprak erozyonu riskini artırmaktadır.

      9. Ürün Çeşitliliği: İklim değişikliği, bazı bölgelerde yeni tarım ürünlerinin yetiştirilmesine olanak sağlamıştır. Örneğin, Ege bölgesinde tropik meyve üretimi son 10 yılda %200 oranında artmıştır.

      10. Ekonomik Etkiler: İklim değişikliğinin tarım üzerindeki etkileri, sektörün ekonomik yapısını da etkilemektedir. Araştırmamıza göre, iklim değişikliği nedeniyle Türkiye'nin tarımsal GSYİH'sında yıllık ortalama %2-3 oranında bir kayıp yaşanmaktadır.

      Bu sonuçlar, Türkiye'nin tarım sektörünün iklim değişikliğine karşı oldukça savunmasız olduğunu ve acil adaptasyon stratejilerinin geliştirilmesi gerektiğini göstermektedir.`,
      conclusion: "Sonuç olarak, iklim değişikliğinin Türkiye tarımı üzerinde ciddi etkileri olduğu ve acil adaptasyon stratejilerinin geliştirilmesi gerektiği ortaya çıkmıştır. Çalışmamız, sürdürülebilir tarım uygulamalarının, iklime dayanıklı tohum çeşitlerinin geliştirilmesinin ve su kaynaklarının etkin yönetiminin önemini vurgulamaktadır. Ayrıca, çiftçilerin iklim değişikliği konusunda bilinçlendirilmesi ve desteklenmesi gerekmektedir. Gelecekte yapılacak araştırmaların, bölgesel ölçekte daha detaylı analizlere odaklanması ve uzun vadeli iklim projeksiyonlarını içermesi önerilmektedir.",
      references: `1. IPCC. (2021). Climate Change 2021: The Physical Science Basis. Contribution of Working Group I to the Sixth Assessment Report of the Intergovernmental Panel on Climate Change. Cambridge University Press.

      2. Türkiye İstatistik Kurumu. (2020). Tarımsal Üretim İstatistikleri.

      3. Türkiye Meteoroloji Genel Müdürlüğü. (2021). Türkiye İklim Değişikliği Raporu.

      4. FAO. (2021). The State of Food and Agriculture 2021. Rome.

      5. Öztürk, K. (2002). Küresel İklim Değişikliği ve Türkiye'ye Olası Etkileri. Gazi Üniversitesi Gazi Eğitim Fakültesi Dergisi, 22(1), 47-65.

      6. Şen, Ö. L., Bozkurt, D., Vogler, J. B., Fox, J., Giambelluca, T. W., & Ziegler, A. D. (2013). Hydro-climatic effects of future land-cover/land-use change in montane mainland southeast Asia. Climatic Change, 118(2), 213-226.

      7. Türkeş, M. (2020). İklim Değişikliğinin Tarımsal Üretime Etkileri: Türkiye Örneği. Ankara Üniversitesi Çevrebilimleri Dergisi, 8(1), 1-25.

      8. Dellal, İ., McCarl, B. A., & Butt, T. (2011). The economic assessment of climate change on Turkish agriculture. Journal of Environmental Protection and Ecology, 12(1), 376-385.`
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
            <h3 className="text-xl font-semibold mb-2">Metodoloji</h3>
            <p>{research.methodology}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Sonuçlar</h3>
            <p>{research.results}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Sonuç</h3>
            <p>{research.conclusion}</p>
          </section>
          <section>
            <h3 className="text-xl font-semibold mb-2">Kaynaklar</h3>
            <p className="whitespace-pre-line">{research.references}</p>
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
