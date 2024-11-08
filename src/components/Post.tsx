import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, Repeat2, Heart, Share, Bookmark } from 'lucide-react';
import { PostGallery } from './PostGallery';
import { PostAchievement } from './PostAchievement';
import type { Post as PostType } from '../types/post';

interface PostProps {
  post: PostType;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
}

const Post = memo(({ post, onLike, onBookmark }: PostProps) => {
  return (
    <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 hover:border-slate-600 transition-colors">
      <div className="flex space-x-3">
        <Link to={`/${post.handle.substring(1)}`} className="flex-shrink-0">
          <div className="w-12 h-12 rounded-full overflow-hidden">
            <img 
              src={post.avatar} 
              alt={post.author}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </Link>
        <div className="flex-grow min-w-0">
          <div className="flex items-center space-x-2">
            <Link 
              to={`/${post.handle.substring(1)}`}
              className="font-bold hover:text-[#00D1FF] transition-colors"
            >
              {post.author}
            </Link>
            <Link 
              to={`/${post.handle.substring(1)}`}
              className="text-slate-400 hover:text-[#00D1FF] transition-colors"
            >
              {post.handle}
            </Link>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400">{post.timestamp}</span>
            {post.earnings && (
              <div className="ml-auto flex items-center text-[#00D1FF]">
                <span className="font-medium">{post.earnings}</span>
              </div>
            )}
          </div>

          <p className="mt-2 text-white whitespace-pre-line">{post.content}</p>
          
          {post.image && (
            <div className="mt-3 rounded-xl overflow-hidden">
              <img 
                src={post.image} 
                alt="Post content" 
                className="w-full max-h-[512px] object-cover hover:opacity-90 transition-opacity"
                loading="lazy"
              />
            </div>
          )}

          {post.gallery && <PostGallery images={post.gallery} postId={post.id} />}
          {post.achievement && <PostAchievement achievement={post.achievement} />}

          <div className="flex justify-between mt-3 text-slate-400">
            <button 
              className="flex items-center space-x-2 hover:text-[#00D1FF] transition-colors group"
              aria-label="Comment"
            >
              <MessageCircle className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{post.comments}</span>
            </button>
            <button 
              className="flex items-center space-x-2 hover:text-emerald-500 transition-colors group"
              aria-label="Repost"
            >
              <Repeat2 className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span>{post.reposts}</span>
            </button>
            <button 
              className={`flex items-center space-x-2 transition-colors group ${
                post.isLiked ? 'text-rose-500' : 'hover:text-rose-500'
              }`}
              onClick={() => onLike(post.id)}
              aria-label="Like"
            >
              <Heart 
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  post.isLiked ? 'fill-current' : ''
                }`}
              />
              <span>{post.likes}</span>
            </button>
            <button 
              className="flex items-center space-x-2 hover:text-[#00D1FF] transition-colors group"
              aria-label="Share"
            >
              <Share className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </button>
            <button 
              className={`flex items-center space-x-2 transition-colors group ${
                post.isBookmarked ? 'text-[#00D1FF]' : 'hover:text-[#00D1FF]'
              }`}
              onClick={() => onBookmark(post.id)}
              aria-label="Bookmark"
            >
              <Bookmark 
                className={`w-5 h-5 group-hover:scale-110 transition-transform ${
                  post.isBookmarked ? 'fill-current' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
});

Post.displayName = 'Post';

export default Post;