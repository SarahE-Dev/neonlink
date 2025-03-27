// Mock data for the chat application

// Update the mock data to use simple avatar paths instead of placeholder SVGs with text
// Mock users
const users = [
  {
    id: "1",
    name: "Rogue",
    avatar: "",
    status: "online",
  },
  {
    id: "2",
    name: "Johnny Silverhand",
    avatar: "",
    status: "offline",
  },
  {
    id: "3",
    name: "Judy Alvarez",
    avatar: "",
    status: "online",
  },
  {
    id: "4",
    name: "Panam Palmer",
    avatar: "",
    status: "away",
  },
  {
    id: "5",
    name: "Takemura",
    avatar: "",
    status: "busy",
  },
]

// Mock groups
const groups = [
  {
    id: "g1",
    name: "Afterlife Mercs",
    avatar: "",
    memberCount: 8,
    lastMessage: "Anyone up for a gig tonight?",
    lastMessageSender: "Rogue",
    lastMessageTime: "10:45 AM",
    unreadCount: 3,
    isGroup: true,
    members: [users[0], users[1], users[2]],
  },
  {
    id: "g2",
    name: "Netrunners Guild",
    avatar: "",
    memberCount: 12,
    lastMessage: "New ICE breaker protocol uploaded",
    lastMessageSender: "T-Bug",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    isGroup: true,
    members: [users[2], users[3], users[4]],
  },
  {
    id: "g3",
    name: "Night City Fixers",
    avatar: "",
    memberCount: 5,
    lastMessage: "Got a high-paying job for skilled solos",
    lastMessageSender: "Wakako",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    isGroup: true,
    members: [users[0], users[4]],
  },
]

// Update the messages in chats to use empty avatar strings
const chats = [
  {
    id: "1",
    name: "Rogue",
    avatar: "",
    status: "online",
    lastMessage: "Meet me at Afterlife at 9",
    lastMessageTime: "12:30 PM",
    unreadCount: 2,
    messages: [
      {
        id: "m1",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "Hey V, got a job for you if you're interested.",
        timestamp: "12:15 PM",
        type: "text",
        isRead: true,
      },
      {
        id: "m2",
        senderId: "current-user",
        senderName: "V",
        senderAvatar: "",
        content: "Always interested in work. What's the gig?",
        timestamp: "12:18 PM",
        type: "text",
        isRead: true,
      },
      {
        id: "m3",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "Corpo job. High risk, high reward. Need someone with your skills.",
        timestamp: "12:20 PM",
        type: "text",
        isRead: true,
      },
      {
        id: "m4",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "Meet me at Afterlife at 9",
        timestamp: "12:30 PM",
        type: "text",
        isRead: false,
      },
    ],
  },
  {
    id: "2",
    name: "Johnny Silverhand",
    avatar: "",
    status: "offline",
    lastMessage: "We need to talk about Arasaka",
    lastMessageTime: "Yesterday",
    unreadCount: 0,
    messages: [
      {
        id: "m5",
        senderId: "2",
        senderName: "Johnny Silverhand",
        senderAvatar: "",
        content: "Wake up, samurai. We've got a city to burn.",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
      {
        id: "m6",
        senderId: "current-user",
        senderName: "V",
        senderAvatar: "",
        content: "Can you stop with the dramatic one-liners?",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
      {
        id: "m7",
        senderId: "2",
        senderName: "Johnny Silverhand",
        senderAvatar: "",
        content: "We need to talk about Arasaka",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
      {
        id: "m8",
        senderId: "2",
        senderName: "Johnny Silverhand",
        senderAvatar: "",
        content: "Check out this blueprint I found",
        timestamp: "Yesterday",
        type: "file",
        fileName: "arasaka-tower-blueprint.pdf",
        isRead: true,
      },
    ],
  },
  {
    id: "3",
    name: "Judy Alvarez",
    avatar: "",
    status: "online",
    lastMessage: "Got some new braindance tech to show you",
    lastMessageTime: "2 days ago",
    unreadCount: 0,
    messages: [
      {
        id: "m9",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "Hey V, how's it going?",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "m10",
        senderId: "current-user",
        senderName: "V",
        senderAvatar: "",
        content: "Surviving Night City, one day at a time.",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "m11",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "Got some new braindance tech to show you",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "m12",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "Check out this BD I edited",
        timestamp: "2 days ago",
        type: "image",
        fileUrl: "/placeholder.svg?height=200&width=300&text=BD+Preview",
        isRead: true,
      },
    ],
  },
]

// Update the group chat messages to use empty avatar strings
const groupChats = groups.map((group) => {
  let messages = []

  if (group.id === "g1") {
    messages = [
      {
        id: "gm1",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "Welcome to the Afterlife channel, mercs.",
        timestamp: "10:00 AM",
        type: "text",
        isRead: true,
      },
      {
        id: "gm2",
        senderId: "2",
        senderName: "Johnny Silverhand",
        senderAvatar: "",
        content: "Let's take down some corps.",
        timestamp: "10:15 AM",
        type: "text",
        isRead: true,
      },
      {
        id: "gm3",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "I've got some tech that might help with your next job.",
        timestamp: "10:30 AM",
        type: "text",
        isRead: true,
      },
      {
        id: "gm4",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "Anyone up for a gig tonight?",
        timestamp: "10:45 AM",
        type: "text",
        isRead: false,
      },
    ]
  } else if (group.id === "g2") {
    messages = [
      {
        id: "gm5",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "Netrunners, I've found a new vulnerability in Arasaka's systems.",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
      {
        id: "gm6",
        senderId: "5",
        senderName: "T-Bug",
        senderAvatar: "",
        content: "Interesting. Send me the details.",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
      {
        id: "gm7",
        senderId: "3",
        senderName: "Judy Alvarez",
        senderAvatar: "",
        content: "Here's the data I extracted",
        timestamp: "Yesterday",
        type: "file",
        fileName: "arasaka-vulnerability.dat",
        isRead: true,
      },
      {
        id: "gm8",
        senderId: "5",
        senderName: "T-Bug",
        senderAvatar: "",
        content: "New ICE breaker protocol uploaded",
        timestamp: "Yesterday",
        type: "text",
        isRead: true,
      },
    ]
  } else if (group.id === "g3") {
    messages = [
      {
        id: "gm9",
        senderId: "6",
        senderName: "Wakako",
        senderAvatar: "",
        content: "I have several clients looking for skilled operatives.",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "gm10",
        senderId: "4",
        senderName: "Panam Palmer",
        senderAvatar: "",
        content: "What's the pay like?",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "gm11",
        senderId: "1",
        senderName: "Rogue",
        senderAvatar: "",
        content: "I'm interested if it's worth my time.",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
      {
        id: "gm12",
        senderId: "6",
        senderName: "Wakako",
        senderAvatar: "",
        content: "Got a high-paying job for skilled solos",
        timestamp: "2 days ago",
        type: "text",
        isRead: true,
      },
    ]
  }

  return {
    ...group,
    messages,
  }
})

// Combine direct chats and group chats
const allChats = [...chats, ...groupChats]

// Export functions to get mock data
export function getMockChats() {
  return chats
}

export function getMockGroups() {
  return groups
}

export function getMockChat(id: string) {
  return allChats.find((chat) => chat.id === id) || allChats[0]
}

export function getMockUser(id: string) {
  return users.find((user) => user.id === id)
}

