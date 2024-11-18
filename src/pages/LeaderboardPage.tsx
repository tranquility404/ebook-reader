import { AnimatePresence, motion } from 'framer-motion'
import { Info, Search, UserPlus } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { Avatar } from "../components/ui/avatar"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs"

interface User {
  id: number
  rank: number
  username: string
  title: string
  tier: 'gold' | 'silver' | 'bronze'
  firstPlaceTests: number
  points: number
  avatar: string
}

const generateUsers = (prefix: string): User[] => 
  Array.from({ length: 30 }, (_, i) => ({
    id: i + 1,
    rank: i + 1,
    username: `${prefix}User${i + 1}`,
    title: ['Avid Reader', 'Bookaholic', 'Prolific Reader'][i % 3],
    tier: ['gold', 'silver', 'bronze'][i % 3] as 'gold' | 'silver' | 'bronze',
    firstPlaceTests: 30 - i,
    points: 5000 - i * 100,
    avatar: `/placeholder.svg?height=40&width=40`
  }))

const internationalUsers = generateUsers('Global')
const localUsers = generateUsers('Local')
const friendUsers = generateUsers('Friend')

// const tiers: Record<string, string> = {
  // gold: '🏆',
  // silver: '🥈',
  // bronze: '🥉',
// }

export default function LeaderboardPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('international')
  const navigate = useNavigate()

  const getFilteredUsers = () => {
    let users: User[]
    switch (activeTab) {
      case 'local':
        users = localUsers
        break
      case 'friends':
        users = friendUsers
        break
      default:
        users = internationalUsers
    }
    return users.filter(user =>
      user.username.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }

  const handleInfoClick = () => {
    navigate('/leaderboard-info')
  }

  const handleAddFriend = (username: string) => {
    toast.success(`Friend request sent to ${username}`, {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    })
  }

  const handleUserClick = (userId: number) => {
    navigate(`/profile/${userId}`)
  }

  const filteredUsers = getFilteredUsers()

  return (
    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-4 sm:py-6 md:py-8">
      <header className="flex flex-col items-center mb-6 sm:mb-8">
        <div className="flex items-center space-x-2 sm:space-x-4 w-full max-w-md mb-4">
          <div className="relative flex-grow">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 sm:h-5 sm:w-5" />
            <Input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 sm:pl-10 pr-4 py-1 sm:py-2 w-full text-sm sm:text-base"
            />
          </div>
          <Button variant="ghost" size="icon" onClick={handleInfoClick} className="flex-shrink-0">
            <Info className="h-4 w-4 sm:h-5 sm:w-5" />
          </Button>
        </div>
      </header>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full sm:w-3/4 md:w-1/2 grid-cols-3 mb-6 sm:mb-8 mx-auto">
          <TabsTrigger value="international" className="text-xs sm:text-sm">International</TabsTrigger>
          <TabsTrigger value="local" className="text-xs sm:text-sm">Local</TabsTrigger>
          <TabsTrigger value="friends" className="text-xs sm:text-sm">Friends</TabsTrigger>
        </TabsList>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
          >
            <TabsContent value={activeTab}>
              <div className="flex flex-col gap-2 mt-4 sm:mt-6">
                {filteredUsers.map((user, index) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: (index + 3) * 0.1 }}
                    className={`flex items-center justify-between p-2 sm:p-4 border-b last:border-b-0 cursor-pointer ${index < 3 ? 'parallelogram-border' : ''}`}
                    onClick={() => handleUserClick(user.id)}
                  >
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="text-sm sm:text-lg font-semibold w-6 sm:w-8">{user.rank}</div>
                      <Avatar className="h-8 w-8 sm:h-10 sm:w-10">
                        <img src={user.avatar} alt={user.username} />
                        <span className="text-xs sm:text-sm">{user.username.slice(0, 2)}</span>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-sm sm:text-base">{user.username}</h3>
                        <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">{user.title}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                      <div className="font-semibold text-sm sm:text-base">{user.points} pts</div>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        onClick={(e) => {
                          e.stopPropagation()
                          handleAddFriend(user.username)
                        }}
                        className="h-8 w-8 sm:h-10 sm:w-10"
                      >
                        <UserPlus className="h-4 w-4 sm:h-5 sm:w-5" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </TabsContent>
          </motion.div>
        </AnimatePresence>
      </Tabs>
      <ToastContainer />
    </div>
  )
}