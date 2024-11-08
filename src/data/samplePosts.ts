import { Post } from '../types/post';

export const SAMPLE_POSTS: Post[] = [
  {
    id: '1',
    author: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Just earned 50 $CTE for my latest thread on Web3 innovations! 🚀\n\nLoving how Chat To Earn rewards quality content. Who else is building in the space? Let's connect! 💫",
    timestamp: "2h ago",
    likes: 234,
    comments: 56,
    reposts: 12,
    earnings: "50 $CTE",
    isLiked: false,
    isBookmarked: false,
    achievement: {
      title: "Top Earner",
      description: "Earned over 1000 $CTE this week"
    }
  },
  {
    id: '2',
    author: "Alex Rivera",
    handle: "@arivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Check out my latest NFT collection dropping next week! 🎨✨",
    timestamp: "4h ago",
    image: "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?w=800",
    likes: 567,
    comments: 89,
    reposts: 45,
    earnings: "75 $CTE",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '3',
    author: "Maria Thompson",
    handle: "@mariath",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
    content: "Just launched my first dApp on Solana! Here's a sneak peek of the interface 👀",
    timestamp: "6h ago",
    gallery: [
      "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?w=800",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800",
      "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=800"
    ],
    likes: 890,
    comments: 123,
    reposts: 67,
    earnings: "120 $CTE",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '4',
    author: "David Kim",
    handle: "@dkim",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    content: "Just hit 1000 $CTE! 🎉 Thanks to everyone who's been engaging with my content. Here's to the next milestone! 🚀",
    timestamp: "8h ago",
    likes: 445,
    comments: 78,
    reposts: 23,
    earnings: "150 $CTE",
    isLiked: false,
    isBookmarked: false,
    achievement: {
      title: "Milestone Achieved",
      description: "Reached 1000 $CTE earnings"
    }
  },
  {
    id: '5',
    author: "Sarah Chen",
    handle: "@sarahchen",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    content: "Excited to announce our new partnership with @SolanaFndn! 🤝\n\nStay tuned for exclusive rewards and opportunities for our community members! 🌟",
    timestamp: "12h ago",
    likes: 678,
    comments: 145,
    reposts: 89,
    earnings: "200 $CTE",
    isLiked: false,
    isBookmarked: false
  },
  {
    id: '6',
    author: "Alex Rivera",
    handle: "@arivera",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    content: "Behind the scenes of my latest NFT creation process 🎨",
    timestamp: "1d ago",
    gallery: [
      "https://images.unsplash.com/photo-1634986666676-ec8fd927c23d?w=800",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800",
      "https://images.unsplash.com/photo-1614812513172-567d2fe96a75?w=800"
    ],
    likes: 892,
    comments: 234,
    reposts: 156,
    earnings: "180 $CTE",
    isLiked: false,
    isBookmarked: false
  }
];