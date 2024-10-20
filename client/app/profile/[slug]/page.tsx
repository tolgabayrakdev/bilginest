"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { AlertCircle, Calendar, MapPin, Pencil, Trash, ArrowLeft } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function UserProfile() {
  const router = useRouter()
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      setIsDeleting(true)
      // Here you would call your delete account API
      // await deleteAccount()
      router.push("/")
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-5xl mx-auto">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => router.push("/dashboard")}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Dashboard
        </Button>
        <Card className="bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col md:flex-row gap-8">
              <aside className="w-full md:w-1/3">
                <div className="flex flex-col items-center">
                  <Avatar className="w-32 h-32">
                    <AvatarImage src="/placeholder.svg?height=128&width=128" alt="User avatar" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <h2 className="mt-4 text-2xl font-bold">John Doe</h2>
                  <p className="text-muted-foreground">john.doe@example.com</p>
                  <div className="mt-4 flex items-center text-sm text-muted-foreground">
                    <Calendar className="mr-2 h-4 w-4" />
                    Joined January 2023
                  </div>
                  <div className="mt-2 flex items-center text-sm text-muted-foreground">
                    <MapPin className="mr-2 h-4 w-4" />
                    San Francisco, CA
                  </div>
                </div>
              </aside>
              <main className="flex-1">
                <Tabs defaultValue="profile" className="w-full">
                  <TabsList className="grid w-full grid-cols-4 mb-8">
                    <TabsTrigger value="profile">Profile</TabsTrigger>
                    <TabsTrigger value="password">Password</TabsTrigger>
                    <TabsTrigger value="blogs">Blog Posts</TabsTrigger>
                    <TabsTrigger value="danger">Danger Zone</TabsTrigger>
                  </TabsList>
                  <div className="min-h-[500px]"> {/* Set a minimum height for the content area */}
                    <TabsContent value="profile">
                      <Card>
                        <CardHeader>
                          <CardTitle>Profile Information</CardTitle>
                          <CardDescription>Update your profile information here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={(e) => e.preventDefault()}>
                            <div className="grid w-full items-center gap-6">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="name">Name</Label>
                                <Input id="name" name="name" placeholder="Your name" defaultValue="John Doe" />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="email">Email</Label>
                                <Input id="email" name="email" type="email" placeholder="Your email" defaultValue="john.doe@example.com" />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="location">Location</Label>
                                <Input id="location" name="location" placeholder="Your location" defaultValue="San Francisco, CA" />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="bio">Bio</Label>
                                <Textarea id="bio" name="bio" placeholder="Tell us about yourself" defaultValue="I'm a researcher interested in AI and machine learning." />
                              </div>
                            </div>
                            <Button type="submit" className="mt-6">Update Profile</Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="password">
                      <Card>
                        <CardHeader>
                          <CardTitle>Change Password</CardTitle>
                          <CardDescription>Update your password here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <form onSubmit={(e) => e.preventDefault()}>
                            <div className="grid w-full items-center gap-6">
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="currentPassword">Current Password</Label>
                                <Input id="currentPassword" name="currentPassword" type="password" />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="newPassword">New Password</Label>
                                <Input id="newPassword" name="newPassword" type="password" />
                              </div>
                              <div className="flex flex-col space-y-1.5">
                                <Label htmlFor="confirmPassword">Confirm New Password</Label>
                                <Input id="confirmPassword" name="confirmPassword" type="password" />
                              </div>
                            </div>
                            <Button type="submit" className="mt-6">Change Password</Button>
                          </form>
                        </CardContent>
                      </Card>
                    </TabsContent>
                    <TabsContent value="blogs">
                      <Card>
                        <CardHeader>
                          <CardTitle>Research Blog Posts</CardTitle>
                          <CardDescription>Manage your research blog posts here.</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {[
                              { id: 1, title: "Introduction to Machine Learning", date: "2023-05-15" },
                              { id: 2, title: "Advanced Neural Networks", date: "2023-06-22" },
                              { id: 3, title: "The Future of AI", date: "2023-07-10" },
                            ].map((post) => (
                              <div key={post.id} className="flex items-center justify-between p-4 border rounded-lg bg-gray-50">
                                <div>
                                  <h3 className="font-semibold">{post.title}</h3>
                                  <p className="text-sm text-muted-foreground">{post.date}</p>
                                </div>
                                <div className="flex space-x-2">
                                  <Button size="sm" variant="outline">
                                    <Pencil className="w-4 h-4 mr-2" />
                                    Edit
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-destructive">
                                    <Trash className="w-4 h-4 mr-2" />
                                    Delete
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button onClick={() => router.push("/new-post")} className="mt-4">Create New Post</Button>
                        </CardFooter>
                      </Card>
                    </TabsContent>
                    <TabsContent value="danger">
                      <Card>
                        <CardHeader>
                          <CardTitle>Danger Zone</CardTitle>
                          <CardDescription>Irreversible actions live here. Be careful!</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Alert variant="destructive" className="mb-6">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Warning</AlertTitle>
                            <AlertDescription>
                              Deleting your account is permanent. All your data will be wiped out permanently.
                            </AlertDescription>
                          </Alert>
                          <Button variant="destructive" onClick={handleDeleteAccount} disabled={isDeleting}>
                            {isDeleting ? "Deleting..." : "Delete Account"}
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </main>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
