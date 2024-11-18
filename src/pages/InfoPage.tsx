import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"

const rankInfo = [
  { rank: 'Bronze', points: '0-999', benefits: ['Access to basic features', 'Participation in community forums'] },
  { rank: 'Silver', points: '1000-2499', benefits: ['All Bronze benefits', '5% discount on ebook purchases', 'Early access to new releases'] },
  { rank: 'Gold', points: '2500-4999', benefits: ['All Silver benefits', '10% discount on ebook purchases', 'Exclusive author Q&A sessions'] },
  { rank: 'Platinum', points: '5000+', benefits: ['All Gold benefits', '15% discount on ebook purchases', 'Beta reader opportunities', 'Personalized reading recommendations'] },
]

export default function InfoPage() {
  const navigate = useNavigate()

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
        <h1 className="text-4xl font-bold mb-8">Leaderboard Information</h1>
        <p className="text-lg mb-8">Our leaderboard system is designed to reward active readers and encourage engagement within our community. Here's how it works:</p>
        
        <div className="grid gap-8 md:grid-cols-2">
          {rankInfo.map((rank, index) => (
            <Card key={index} className="overflow-hidden">
              <CardHeader className={`
                ${rank.rank === 'Bronze' ? 'bg-amber-600' : 
                  rank.rank === 'Silver' ? 'bg-gray-400' :
                  rank.rank === 'Gold' ? 'bg-yellow-400' : 'bg-purple-600'}
                text-white
              `}>
                <CardTitle>{rank.rank} Rank</CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <p className="mb-4"><strong>Points required:</strong> {rank.points}</p>
                <h3 className="text-lg font-semibold mb-2">Benefits:</h3>
                <ul className="list-disc pl-5 space-y-1">
                  {rank.benefits.map((benefit, benefitIndex) => (
                    <li key={benefitIndex}>{benefit}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <Card className="mt-12">
          <CardHeader>
            <CardTitle>How to Earn Points</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc pl-5 space-y-2">
              <li>Reading books: 1 point per page</li>
              <li>Completing quizzes: 10-50 points depending on difficulty</li>
              <li>Writing reviews: 100 points per review</li>
              <li>Participating in reading challenges: 500 points upon completion</li>
            </ul>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}