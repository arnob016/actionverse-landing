"use client"

import { useEffect, useState } from "react"
import { initializeApp } from "firebase/app"
import { getFirestore, collection, getDocs } from "firebase/firestore"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Search, ArrowUpDown, StepBack, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { db } from "@/lib/firebase"
import { useRouter } from "next/navigation"
import { Skeleton } from "@/components/ui/skeleton"



interface AlphaSignup {
    id: string
    email: string
    location: string
    name: string
    timestamp: any // Firebase Timestamp
}

type SortField = "name" | "email" | "location" | "timestamp"
type SortDirection = "asc" | "desc"

function AlphaSignupTable() {
    const [data, setData] = useState<AlphaSignup[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [sortField, setSortField] = useState<SortField>("timestamp")
    const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
    const router = useRouter()
    useEffect(() => {
        async function fetchData() {
            try {
                const querySnapshot = await getDocs(collection(db, "alphaSignups"))
                const fetchedData: AlphaSignup[] = []


                querySnapshot.forEach((doc) => {
                    const data = doc.data() as Omit<AlphaSignup, "id">
                    let formattedTimestamp: Date

                    // Handle different timestamp formats
                    if (data.timestamp?.toDate) {
                        // Firebase Timestamp
                        formattedTimestamp = data.timestamp.toDate()
                    } else if (data.timestamp?.seconds) {
                        // Unix timestamp in seconds
                        formattedTimestamp = new Date(data.timestamp.seconds * 1000)
                    } else if (data.timestamp instanceof Date) {
                        // JavaScript Date object
                        formattedTimestamp = data.timestamp
                    } else if (typeof data.timestamp === "string") {
                        // ISO string or other date string
                        formattedTimestamp = new Date(data.timestamp)
                    } else {
                        // Fallback to current date if no valid timestamp
                        formattedTimestamp = new Date()
                    }

                    fetchedData.push({
                        id: doc.id,
                        email: data.email || "",
                        location: data.location || "",
                        name: data.name || "",
                        timestamp: formattedTimestamp,
                    })
                })
                console.log(fetchedData)
                setData(fetchedData)
                setLoading(false)
            } catch (err) {
                setError("Error fetching data. Please try again later.")
                console.log(err)
                setLoading(false)
            }
        }

        fetchData()
    }, [])

    const handleSort = (field: SortField) => {
        if (sortField === field) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc")
        } else {
            setSortField(field)
            setSortDirection("asc")
        }
    }

    const filteredAndSortedData = data
        .filter((item) =>
            Object.values(item).some((value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())),
        )
        .sort((a, b) => {
            const aValue = a[sortField]
            const bValue = b[sortField]

            if (sortDirection === "asc") {
                return aValue > bValue ? 1 : -1
            } else {
                return aValue < bValue ? 1 : -1
            }
        })

    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
        }).format(date)
    }

    if (error) {
        return <div className="flex items-center justify-center h-64 text-red-500">{error}</div>
    }

    if (loading) {
        return (
            <div className="space-y-4">
                <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Skeleton className="h-10 w-full" />
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>
                                    <Skeleton className="h-8 w-24" />
                                </TableHead>
                                <TableHead>
                                    <Skeleton className="h-8 w-32" />
                                </TableHead>
                                <TableHead>
                                    <Skeleton className="h-8 w-28" />
                                </TableHead>
                                <TableHead>
                                    <Skeleton className="h-8 w-36" />
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {Array.from({ length: 5 }).map((_, index) => (
                                <TableRow key={index}>
                                    <TableCell>
                                        <Skeleton className="h-6 w-[120px]" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-6 w-[180px]" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-6 w-[140px]" />
                                    </TableCell>
                                    <TableCell>
                                        <Skeleton className="h-6 w-[160px]" />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
                <div className="h-5">
                    <Skeleton className="h-4 w-[250px]" />
                </div>
            </div>
        )
    }

    return (
        <div className="space-y-4 h-[calc(100vh-20vh)] w-full md:w-1/2">
            <div className="flex items-center gap-2">
                <Button variant="ghost" onClick={() =>
                    router.back()
                } className="flex items-center gap-1">
                    <ArrowLeft className="h-4 w-4" />
                    Back
                </Button>
            </div>
            <h1 className="text-2xl font-bold">Alpha Signups</h1>
            <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name, email, or location..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8"
                />
            </div>
            <div className="rounded-md border">
                <Table className="w-full">
                    <TableHeader>
                        <TableRow>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort("name")} className="flex items-center gap-1">
                                    Name
                                    <ArrowUpDown className="h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort("email")} className="flex items-center gap-1">
                                    Email
                                    <ArrowUpDown className="h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort("location")} className="flex items-center gap-1">
                                    Location
                                    <ArrowUpDown className="h-4 w-4" />
                                </Button>
                            </TableHead>
                            <TableHead>
                                <Button variant="ghost" onClick={() => handleSort("timestamp")} className="flex items-center gap-1">
                                    Signup Date
                                    <ArrowUpDown className="h-4 w-4" />
                                </Button>
                            </TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredAndSortedData.map((row) => (
                            <TableRow key={row.id}>
                                <TableCell className="font-medium">{row.name}</TableCell>
                                <TableCell>{row.email}</TableCell>
                                <TableCell>{row.location}</TableCell>
                                <TableCell>{formatDate(row.timestamp)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
            <div className="text-sm text-muted-foreground">
                Showing {filteredAndSortedData.length} of {data.length} entries
            </div>
        </div>
    )
}

export default AlphaSignupTable