"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { LogoutButton } from "@/components/logout-button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DegreeForm } from "@/components/dashboard/degree-form"
import { DegreeList } from "@/components/dashboard/degree-list"
import { CertificationForm } from "@/components/dashboard/certification-form"
import { CertificationList } from "@/components/dashboard/certification-list"
import { AboutForm } from "@/components/dashboard/about-form"
import { HomeSectionForm } from "@/components/dashboard/home-section-form"
import { HomeSectionList } from "@/components/dashboard/home-section-list"
import { ExperienceForm } from "@/components/dashboard/experience-form"
import { ExperienceList } from "@/components/dashboard/experience-list"
import { ProjectForm } from "@/components/dashboard/project-form"
import { ProjectList } from "@/components/dashboard/project-list"
import { ContactForm } from "@/components/dashboard/contact-form"

export default function DashboardPage() {
  const [loading, setLoading] = useState(true)
  const [authenticated, setAuthenticated] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = async () => {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/login")
      } else {
        setAuthenticated(true)
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading...</p>
        </div>
      </div>
    )
  }

  if (!authenticated) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-blue-950 dark:to-purple-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Manage your portfolio content</p>
          </div>
          <LogoutButton />
        </div>

        {/* Tabs */}
        <Tabs defaultValue="about" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <TabsTrigger value="about">About</TabsTrigger>
            <TabsTrigger value="home">Home Sections</TabsTrigger>
            <TabsTrigger value="degrees">Degrees</TabsTrigger>
            <TabsTrigger value="certifications">Certifications</TabsTrigger>
            <TabsTrigger value="experiences">Experiences</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          {/* About Tab */}
          <TabsContent value="about">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
                <CardDescription>Update your name, tagline, bio, and social links</CardDescription>
              </CardHeader>
              <CardContent>
                <AboutForm />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Home Sections Tab */}
          <TabsContent value="home">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Add Home Section</CardTitle>
                  <CardDescription>Create a new capability section for your home page</CardDescription>
                </CardHeader>
                <CardContent>
                  <HomeSectionForm />
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Sections</CardTitle>
                  <CardDescription>Manage your home page sections</CardDescription>
                </CardHeader>
                <CardContent>
                  <HomeSectionList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Degrees Tab */}
          <TabsContent value="degrees">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Add Degree</CardTitle>
                  <CardDescription>Add a new educational qualification</CardDescription>
                </CardHeader>
                <CardContent>
                  <DegreeForm />
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Degrees</CardTitle>
                  <CardDescription>Manage your educational qualifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <DegreeList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Certifications Tab */}
          <TabsContent value="certifications">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Add Certification</CardTitle>
                  <CardDescription>Add a new certification or course completion</CardDescription>
                </CardHeader>
                <CardContent>
                  <CertificationForm />
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Certifications</CardTitle>
                  <CardDescription>Manage your certifications</CardDescription>
                </CardHeader>
                <CardContent>
                  <CertificationList />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Experiences Tab */}
          <TabsContent value="experiences">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Add Experience</CardTitle>
                  <CardDescription>Add work experience, internship, or volunteership</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExperienceForm onSuccess={() => window.location.reload()} />
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Experiences</CardTitle>
                  <CardDescription>Manage your work experiences</CardDescription>
                </CardHeader>
                <CardContent>
                  <ExperienceList refresh={0} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="space-y-6">
              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Add Project</CardTitle>
                  <CardDescription>Add a new project to your portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectForm onSuccess={() => window.location.reload()} />
                </CardContent>
              </Card>

              <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
                <CardHeader>
                  <CardTitle>Existing Projects</CardTitle>
                  <CardDescription>Manage your projects</CardDescription>
                </CardHeader>
                <CardContent>
                  <ProjectList refresh={0} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-gray-200 dark:border-gray-700">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
                <CardDescription>Update your contact details and social links</CardDescription>
              </CardHeader>
              <CardContent>
                <ContactForm />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
