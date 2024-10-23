"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft } from "lucide-react"

type Research = {
  id: number
  title: string
  abstract: string
  content: string
  results: string
  sources: string
  user: {
    username: string
    email: string
  }
  created_at: string // API'den gelen tarih alanı
}

export default function ResearchDetail() {
  const router = useRouter()
  const params = useParams()
  const [research, setResearch] = useState<Research | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchResearch = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`http://localhost:1234/api/research/${params.slug}`, {
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Failed to fetch research')
        }
        const data = await response.json()
        setResearch(data)
      } catch (error) {
        console.error('Error fetching research:', error)
        // Hata durumunda kullanıcıya bir bildirim gösterebilirsiniz
      } finally {
        setIsLoading(false)
      }
    }

    fetchResearch()
  }, [params.slug])

  if (isLoading) {
    return <div>Araştırma yükleniyor...</div>
  }

  if (!research) {
    return <div>Araştırma bulunamadı</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl mx-auto">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.back()}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Geri Dön
        </Button>
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <CardHeader>
            <CardTitle>{research.title}</CardTitle>
            <CardDescription>
              Yazar: {research.user.email} | Oluşturulma tarihi: {new Date(research.created_at).toLocaleDateString('tr-TR')}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none space-y-6">
              <section>
                <h3 className="text-xl font-semibold">Özet</h3>
                <p>{research.abstract}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold">İçerik</h3>
                {research.content.split('\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </section>
              
              <section>
                <h3 className="text-xl font-semibold">Sonuçlar</h3>
                <p>{research.results}</p>
              </section>
              
              <section>
                <h3 className="text-xl font-semibold">Kaynaklar</h3>
                <p>{research.sources}</p>
              </section>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
