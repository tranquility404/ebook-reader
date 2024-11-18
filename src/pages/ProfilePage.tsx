import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate, useParams } from 'react-router-dom'
import { Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

export default function ProfilePage() {
  const { userId } = useParams<{ userId: string }>()
  const navigate = useNavigate()

  // This is a placeholder. In a real app, you'd fetch the user data based on the userId.
  const user = {
    id: parseInt(userId || '0'),
    username: `User${userId}`,
    title: 'Avid Reader',
    tier: 'gold',
    firstPlaceTests: 15,
    points: 5000,
    avatar: `/placeholder.svg?height=100&width=100`,
    booksRead: 42,
    reviewsWritten: 18,
    challengesCompleted: 5
  }

  return (
    <div className="container mx-auto px-6 py-8">
      <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Leaderboard
      </Button>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <img src={user.avatar} alt={user.username} />
              </Avatar>
              <div>
                <CardTitle className="text-2xl">{user.username}</CardTitle>
                <p className="text-gray-500">{user.title}</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <h3 className="font-semibold mb-2">Stats</h3>
                <ul className="space-y-1">
                  <li>Rank: {user.tier.charAt(0).toUpperCase() + user.tier.slice(1)}</li>
                  <li>Points: {user.points}</li>
                  <li>First Place Tests: {user.firstPlaceTests}</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Activity</h3>
                <ul className="space-y-1">
                  <li>Books Read: {user.booksRead}</li>
                  <li>Reviews Written: {user.reviewsWritten}</li>
                  <li>Challenges Completed: {user.challengesCompleted}</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}