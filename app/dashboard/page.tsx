"use client"
import { auth, db } from "@/lib/firebase"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { onAuthStateChanged } from "firebase/auth"
import { collection, getCountFromServer } from "firebase/firestore"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useAuth } from "@/components/Provider/AuthProvider"
import { Skeleton } from "@/components/ui/skeleton"
import { Users } from "lucide-react"

export default function DashboardPage() {
    const router = useRouter()
    const { logOut } = useAuth()
    const [userCount, setUserCount] = useState<number | null>(null)


    useEffect(() => {
        async function fetchUserCount() {
            try {
                const coll = collection(db, "alphaSignups")
                const snapshot = await getCountFromServer(coll)
                setUserCount(snapshot.data().count)
            } catch (error) {
                console.error("Error fetching user count:", error)
                setUserCount(0)
            }
        }

        fetchUserCount()
    }, [])

    return (
        <div className="space-y-6 w-full flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>

            <div className="w-full max-w-md">
                <Card className="w-full transition-all hover:shadow-lg">
                    <Link href="/dashboard/users">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">Total </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            {userCount === null ? (
                                <Skeleton className="h-9 w-20" />
                            ) : (
                                <div className="flex flex-col space-y-1">
                                    <div className="text-2xl font-bold">{userCount.toLocaleString()}</div>
                                    <p className="text-xs text-muted-foreground">{userCount === 1 ? "user" : "users"} registered</p>
                                </div>
                            )}
                        </CardContent>
                    </Link>
                </Card>
            </div>

            <button
                onClick={() => logOut()}
                className="bg-red-500 hover:bg-red-600 transition-colors text-white px-4 py-2 rounded-md font-medium"
            >
                Logout
            </button>
        </div>
    )
}

