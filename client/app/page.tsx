"use client"

import React, { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Share2, MessageCircle, Heart, TrendingUp, BookOpen, LogOut, User } from 'lucide-react'

type Post = {
  id: number
  author: string
  avatar: string
  content: string
  category: string
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
  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      author: "Dr. Ayşe Yılmaz",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Yeni araştırmamızda, Türkiye'deki iklim değişikliğinin tarım üzerindeki etkilerini inceledik.",
      category: "Çevre Bilimleri",
      tags: ["iklim değişikliği", "tarım", "sürdürülebilirlik"],
      likes: 45,
      comments: 12,
      shares: 8,
      views: 230
    },
    {
      id: 2,
      author: "Prof. Mehmet Kaya",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Yapay zeka ve makine öğrenmesi teknikleriyle geliştirdiğimiz yeni algoritma, kanser teşhisinde %95 doğruluk sağlıyor.",
      category: "Tıp",
      tags: ["yapay zeka", "kanser araştırmaları", "makine öğrenmesi"],
      likes: 78,
      comments: 23,
      shares: 15,
      views: 412
    },
    {
      id: 3,
      author: "Doç. Dr. Zeynep Demir",
      avatar: "/placeholder.svg?height=40&width=40",
      content: "Sosyal medyanın gençler üzerindeki psikolojik etkileri üzerine yaptığımız 5 yıllık çalışmanın sonuçları yayınlandı.",
      category: "Sosyal Bilimler",
      tags: ["sosyal medya", "psikoloji", "gençlik araştırmaları"],
      likes: 92,
      comments: 31,
      shares: 27,
      views: 567
    }
  ])

  const [newPost, setNewPost] = useState({
    content: '',
    category: '',
    tags: ''
  })

  const [selectedCategory, setSelectedCategory] = useState("Tümü")

  const [user, setUser] = useState<User>({
    name: "Ahmet Yılmaz",
    email: "ahmet.yilmaz@example.com",
    avatar: "/placeholder.svg?height=40&width=40"
  })

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newPostObject: Post = {
      id: posts.length + 1,
      author: user.name,
      avatar: user.avatar,
      content: newPost.content,
      category: newPost.category,
      tags: newPost.tags.split(',').map(tag => tag.trim()),
      likes: 0,
      comments: 0,
      shares: 0,
      views: 0
    }
    setPosts([newPostObject, ...posts])
    setNewPost({ content: '', category: '', tags: '' })
  }

  const filteredPosts = selectedCategory === "Tümü" 
    ? posts 
    : posts.filter(post => post.category === selectedCategory)

  const trendingPosts = [...posts].sort((a, b) => b.views - a.views).slice(0, 5)

  return (
    <div className="container mx-auto p-4 min-h-screen flex flex-col">
      <div className="flex-grow grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Sol Sidebar - Kategoriler */}
        <div className="md:col-span-1">
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
        </div>

        {/* Ana İçerik */}
        <div className="md:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Yeni Araştırma Paylaş</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handlePostSubmit} className="space-y-4">
                <Textarea 
                  placeholder="Araştırmanızı buraya yazın..." 
                  value={newPost.content}
                  onChange={(e) => setNewPost({...newPost, content: e.target.value})}
                />
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
                <Input 
                  placeholder="Etiketler (virgülle ayırın)" 
                  value={newPost.tags}
                  onChange={(e) => setNewPost({...newPost, tags: e.target.value})}
                />
                <Button type="submit">Paylaş</Button>
              </form>
            </CardContent>
          </Card>

          {filteredPosts.map(post => (
            <Card key={post.id} className="mb-4">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <Avatar>
                    <AvatarImage src={post.avatar} alt={post.author} />
                    <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">{post.author}</CardTitle>
                    <p className="text-sm text-muted-foreground">{post.category}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p>{post.content}</p>
                <div className="mt-4 space-x-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
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
                <Button variant="ghost" size="sm">
                  <BookOpen className="w-4 h-4 mr-2" />
                  {post.views}
                </Button>
              </CardFooter>
            </Card>
          ))}
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
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Çıkış Yap</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}