"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Search, Mail, UserPlus, UserMinus } from "lucide-react"
import {
  getSubscribers,
  getSubscriberStats,
  unsubscribeFromNewsletter,
  type NewsletterSubscriber,
} from "@/services/newsletter-service"
import { useToast } from "@/components/ui/use-toast"

export default function NewsletterAdminPage() {
  const { user, isAdmin } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([])
  const [filteredSubscribers, setFilteredSubscribers] = useState<NewsletterSubscriber[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    monthly: {} as Record<string, number>,
  })

  // Rediriger si l'utilisateur n'est pas connecté ou n'est pas admin
  useEffect(() => {
    if (!user || !isAdmin) {
      router.push("/login")
    }
  }, [user, isAdmin, router])

  // Charger les abonnés et les statistiques
  useEffect(() => {
    const loadData = () => {
      const allSubscribers = getSubscribers()
      setSubscribers(allSubscribers)
      setFilteredSubscribers(allSubscribers)
      setStats(getSubscriberStats())
    }

    loadData()

    // Mettre à jour les données toutes les 5 secondes (pour simuler des mises à jour en temps réel)
    const interval = setInterval(loadData, 5000)
    return () => clearInterval(interval)
  }, [])

  // Filtrer les abonnés en fonction du terme de recherche
  useEffect(() => {
    if (!searchTerm.trim()) {
      setFilteredSubscribers(subscribers)
    } else {
      const term = searchTerm.toLowerCase()
      setFilteredSubscribers(subscribers.filter((sub) => sub.email.toLowerCase().includes(term)))
    }
  }, [searchTerm, subscribers])

  const handleUnsubscribe = async (email: string) => {
    try {
      await unsubscribeFromNewsletter(email)

      // Mettre à jour la liste des abonnés
      setSubscribers((prev) => prev.map((sub) => (sub.email === email ? { ...sub, active: false } : sub)))

      toast({
        title: "Subscriber removed",
        description: `${email} has been unsubscribed from the newsletter.`,
      })
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "An error occurred",
        variant: "destructive",
      })
    }
  }

  const handleExportCSV = () => {
    // Créer un CSV avec les données des abonnés
    const headers = ["Email", "Subscribed At", "Status"]
    const csvRows = [
      headers.join(","),
      ...subscribers.map((sub) =>
        [sub.email, new Date(sub.subscribedAt).toLocaleDateString(), sub.active ? "Active" : "Inactive"].join(","),
      ),
    ]

    const csvContent = "data:text/csv;charset=utf-8," + csvRows.join("\n")
    const encodedUri = encodeURI(csvContent)

    // Créer un lien temporaire et déclencher le téléchargement
    const link = document.createElement("a")
    link.setAttribute("href", encodedUri)
    link.setAttribute("download", `newsletter_subscribers_${new Date().toISOString().split("T")[0]}.csv`)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    toast({
      title: "Export successful",
      description: "Subscriber data has been exported to CSV.",
    })
  }

  if (!user || !isAdmin) {
    return null
  }

  // Formater les données mensuelles pour l'affichage
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
  const formattedMonthlyData = Object.entries(stats.monthly)
    .map(([key, value]) => {
      const [year, month] = key.split("-")
      return {
        month: `${monthNames[Number.parseInt(month) - 1]} ${year}`,
        count: value,
      }
    })
    .sort((a, b) => a.month.localeCompare(b.month))

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">Newsletter Management</h1>
        <Button asChild variant="outline">
          <Link href="/admin">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Subscribers</CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">All-time subscribers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Subscribers</CardTitle>
            <UserPlus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.active}</div>
            <p className="text-xs text-muted-foreground">Currently receiving newsletters</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Unsubscribed</CardTitle>
            <UserMinus className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.inactive}</div>
            <p className="text-xs text-muted-foreground">Opted out of newsletters</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Monthly Subscriptions</CardTitle>
          <CardDescription>New subscribers over the last 6 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-end justify-between">
            {formattedMonthlyData.map((item, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  className="bg-primary w-12 rounded-t-md"
                  style={{
                    height: `${Math.max(20, (item.count / Math.max(...Object.values(stats.monthly), 1)) * 150)}px`,
                  }}
                ></div>
                <div className="text-xs mt-2">{item.month}</div>
                <div className="text-xs font-medium">{item.count}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Subscriber List</CardTitle>
            <CardDescription>Manage your newsletter subscribers</CardDescription>
          </div>
          <div className="flex space-x-2">
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                type="text"
                placeholder="Search subscribers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <Button variant="outline" onClick={handleExportCSV}>
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all newsletter subscribers.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Email</TableHead>
                <TableHead>Subscribed On</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSubscribers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center py-8 text-gray-500">
                    {searchTerm ? "No subscribers match your search" : "No subscribers found"}
                  </TableCell>
                </TableRow>
              ) : (
                filteredSubscribers.map((subscriber) => (
                  <TableRow key={subscriber.email}>
                    <TableCell className="font-medium">{subscriber.email}</TableCell>
                    <TableCell>{new Date(subscriber.subscribedAt).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Badge variant={subscriber.active ? "default" : "outline"}>
                        {subscriber.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      {subscriber.active && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleUnsubscribe(subscriber.email)}
                          className="text-red-500 hover:text-red-700"
                        >
                          Unsubscribe
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

