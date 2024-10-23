"use client"

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, MessageCircle, Heart, TrendingUp, BookOpen, LogOut, User, Plus, X, Loader2 } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import Link from 'next/link'
import { useRouter } from 'next/navigation' // useRouter'ı import ediyoruz

type Post = {
  id: number
  title: string
  content: string
  abstract: string
  results: string
  sources: string
  user: {
    username: string
    email: string
  }
  // Diğer alanları da ekleyelim (API'den gelmese bile şimdilik tutalım)
  category: string
  created_at: string
  tags: string[]
  likes: number
  comments: number
  shares: number
  views: number
}

type User = {
  name: string
  email: string
  avatar: string
}

const categories = ["Tümü", "Çevre Bilimleri", "Tıp", "Teknoloji", "Sosyal Bilimler"]

export default function ResearchFeed() {
  const router = useRouter() // useRouter hook'unu kullanıyoruz
  const [posts, setPosts] = useState<Post[]>([])

  const [newPost, setNewPost] = useState({
    title: '',
    abstract: '',
    content: '',
    category: '',
    tags: '',
    results: '',
    sources: ''
  })

  const [selectedCategory, setSelectedCategory] = useState("Tümü")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [tagInput, setTagInput] = useState('')

  const [user, setUser] = useState<User>({
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    avatar: "/placeholder.svg?height=40&width=40"
  })

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(true) // Yeni loading state'i

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true) // Veri çekmeye başlarken loading'i true yapıyoruz
      try {
        const response = await fetch('http://localhost:1234/api/research/all',{
          method: 'GET',
          credentials: 'include',
        })
        if (!response.ok) {
          throw new Error('Veri çekme işlemi başarısız oldu')
        }
        const data = await response.json()
        // API'den gelen verileri mevcut Post tipine uygun hale getirelim
        const formattedPosts = data.map((post: Post) => ({
          ...post,
          author: post.user.username,
          avatar: "/placeholder.svg?height=40&width=40", // Varsayılan avatar
          category: "Genel", // Varsayılan kategori
          tags: [], // Boş etiket dizisi
          likes: 0,
          comments: 0,
          shares: 0,
          views: 0
        }))
        setPosts(formattedPosts)
      } catch (error) {
        console.error('Veri çekme hatası:', error)
      } finally {
        setIsLoading(false) // Veri çekme işlemi bittiğinde loading'i false yapıyoruz
      }
    }

    fetchPosts()
  }, [])

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPostObject: Post = {
      id: posts.length + 1,
      author: user.name,
      avatar: user.avatar,
      title: newPost.title,
      abstract: newPost.abstract,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0,
      results: '',
      sources: '',
      user: {
        username: user.name,
        email: user.email
      }
    }
    setPosts([newPostObject, ...posts])
    setNewPost({
      title: '',
      abstract: '',
      content: '',
      category: '',
      tags: '',
      results: '',
      sources: ''
    })
    setIsModalOpen(false)
  }

  const handleTagAdd = (tag: string) => {
    if (tag && !selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag])
      setTagInput('')
    }
  }

  const handleTagRemove = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag))
  }

  const filteredPosts = posts.filter(post => 
    (selectedCategory === "Tümü" || post.category === selectedCategory) &&
    (selectedTags.length === 0 || selectedTags.every(tag => post.tags.includes(tag)))
  )

  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5)

  // Tüm postlardan en çok kullanılan 6 etiketi çıkaran yardımcı fonksiyon
  const getTopTags = () => {
    const tagCounts = posts.flatMap(post => post.tags).reduce((acc, tag) => {
      acc[tag] = (acc[tag] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    return Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([tag]) => tag);
  }

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:1234/api/auth/logout', {
        method: 'POST',
        credentials: 'include', // Çerezleri de göndermek için
      })

      if (response.ok) {
        // Çıkış başarılı, kullanıcıyı sign-in sayfasına yönlendir
        router.push('/sign-in')
      } else {
        console.error('Çıkış yapılırken bir hata oluştu')
        // Hata durumunda kullanıcıya bir bildirim gösterebilirsiniz
      }
    } catch (error) {
      console.error('Çıkış yapılırken bir hata oluştu:', error)
      // Hata durumunda kullanıcıya bir bildirim gösterebilirsiniz
    }
  }

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      {/* Uygulama Adı */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary">Bilginest</h1>
      </div>

      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sol Sidebar - Kategoriler, Etiketler ve Yeni Araştırma Ekle Butonu */}
        <div className="md:col-span-1">
          <div className="sticky top-4 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Kategoriler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {categories.map(category => (
                    <Button 
                      key={category} 
                      variant={selectedCategory === category ? "default" : "outline"}
                      className="w-full justify-start"
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Etiketler</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex space-x-2">
                    <Input
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      placeholder="Etiket ara veya ekle"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleTagAdd(tagInput)
                        }
                      }}
                    />
                    <Button onClick={() => handleTagAdd(tagInput)}>Ekle</Button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {selectedTags.map(tag => (
                      <Badge key={tag} variant="secondary" className="flex items-center space-x-1">
                        <span>{tag}</span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="h-auto p-0 text-muted-foreground" 
                          onClick={() => handleTagRemove(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    ))}
                  </div>
                  <div className="mt-2">
                    <p className="text-sm font-semibold mb-1">Önerilen Etiketler:</p>
                    <div className="flex flex-wrap gap-2">
                      {getTopTags().map(tag => (
                        <Badge 
                          key={tag} 
                          variant="outline" 
                          className="cursor-pointer"
                          onClick={() => handleTagAdd(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Araştırma Ekle
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-[900px] w-[90vw]">
                <DialogHeader>
                  <DialogTitle>Yeni Araştırma Paylaş</DialogTitle>
                </DialogHeader>
                <form onSubmit={handlePostSubmit} className="space-y-4">
                  <Tabs defaultValue="general" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="general">Genel Bilgiler</TabsTrigger>
                      <TabsTrigger value="content">İçerik</TabsTrigger>
                      <TabsTrigger value="results">Sonuçlar ve Kaynaklar</TabsTrigger>
                    </TabsList>
                    <TabsContent value="general" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="title">Başlık</Label>
                        <Input 
                          id="title"
                          value={newPost.title}
                          onChange={(e) => setNewPost({...newPost, title: e.target.value})}
                          placeholder="Araştırma başlığını girin"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="abstract">Özet</Label>
                        <Textarea 
                          id="abstract"
                          value={newPost.abstract}
                          onChange={(e) => setNewPost({...newPost, abstract: e.target.value})}
                          placeholder="Araştırmanızın kısa bir özetini yazın"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="category">Kategori</Label>
                        <Select onValueChange={(value) => setNewPost({...newPost, category: value})}>
                          <SelectTrigger>
                            <SelectValue placeholder="Kategori seçin" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.slice(1).map(category => (
                              <SelectItem key={category} value={category}>{category}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="tags">Etiketler</Label>
                        <Input 
                          id="tags"
                          value={newPost.tags}
                          onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                          placeholder="Etiketleri virgülle ayırarak girin"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="content" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="content">İçerik</Label>
                        <Textarea 
                          id="content"
                          value={newPost.content}
                          onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                          placeholder="Araştırmanızın ana içeriğini buraya yazın"
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="results" className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="results">Sonuçlar</Label>
                        <Textarea 
                          id="results"
                          value={newPost.results}
                          onChange={(e) => setNewPost({...newPost, results: e.target.value})}
                          placeholder="Araştırma sonuçlarınızı buraya yazın"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="sources">Kaynaklar</Label>
                        <Textarea 
                          id="sources"
                          value={newPost.sources}
                          onChange={(e) => setNewPost({...newPost, sources: e.target.value})}
                          placeholder="Kaynaklarınızı buraya ekleyin"
                        />
                      </div>
                    </TabsContent>
                  </Tabs>
                  <Button type="submit" className="w-full">Paylaş</Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Ana İçerik */}
        <div className="md:col-span-2">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <span className="ml-2 text-lg">Araştırmalar yükleniyor...</span>
            </div>
          ) : (
            filteredPosts.map(post => (
              <Card key={post.id} className="mb-6">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <Avatar>
                        <AvatarImage src={"/placeholder.svg?height=40&width=40"} alt={post.user.username} />
                        <AvatarFallback>{post.user.username.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg">{post.user.username}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {post.category} | Oluşturulma tarihi: {new Date(post.created_at).toLocaleDateString('tr-TR')}
                        </p>
                      </div>
                    </div>
                    <Link href={`feed/research/${post.id}`} passHref>
                      <Button variant="outline" size="sm">
                        Detayları Gör
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <h3 className="text-xl font-semibold">{post.title}</h3>
                  <p className="text-muted-foreground">{post.abstract}</p>
                  <div className="space-x-2">
                    {post.tags.map(tag => (
                      <Badge key={tag} variant="secondary">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <div className="flex space-x-4">
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4 mr-2" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="w-4 h-4 mr-2" />
                      {post.shares}
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    <BookOpen className="w-4 h-4 mr-2" />
                    {post.views} görüntülenme
                  </Button>
                </CardFooter>
              </Card>
            ))
          )}
        </div>

        {/* Sağ Sidebar - Trend Araştırmalar */}
        <div className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Trend Araştırmalar</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trendingPosts.map(post => (
                  <div key={post.id} className="flex items-center space-x-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium">{post.content.substring(0, 50)}...</p>
                      <p className="text-xs text-muted-foreground">{post.views} görüntülenme</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Kullanıcı Bilgileri - Sol Alt Köşe */}
      <div className="fixed bottom-4 left-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-auto p-2">
              <div className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profil</span>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleLogout}> {/* onClick ekliyoruz */}
              <LogOut className="mr-2 h-4 w-4" />
              <span>Çıkış Yap</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
