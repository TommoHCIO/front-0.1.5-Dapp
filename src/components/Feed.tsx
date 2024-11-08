import React, { useState, useEffect, useCallback, useRef, memo } from 'react';
import { LoadingSpinner } from './LoadingSpinner';
import Post from './Post';
import { SAMPLE_POSTS } from '../data/samplePosts';
import type { Post as PostType } from '../types/post';
import { v4 as uuidv4 } from 'uuid';

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef<IntersectionObserver>();
  const loadingRef = useRef<HTMLDivElement>(null);

  // Initial load
  useEffect(() => {
    const loadInitialPosts = async () => {
      try {
        setIsLoading(true);
        // Add artificial delay for loading state demonstration
        await new Promise(resolve => setTimeout(resolve, 800));
        
        const initialPosts = SAMPLE_POSTS.slice(0, 4).map(post => ({
          ...post,
          id: uuidv4() // Ensure unique IDs
        }));
        
        setPosts(initialPosts);
        setHasMore(SAMPLE_POSTS.length > 4);
      } catch (err) {
        setError('Failed to load posts. Please try again.');
        console.error('Error loading posts:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadInitialPosts();
  }, []);

  // Load more posts
  const loadMorePosts = useCallback(async () => {
    try {
      const startIndex = page * 4;
      const endIndex = startIndex + 4;
      const newPosts = SAMPLE_POSTS.slice(startIndex, endIndex).map(post => ({
        ...post,
        id: uuidv4()
      }));

      setPosts(prev => [...prev, ...newPosts]);
      setHasMore(endIndex < SAMPLE_POSTS.length);
      setPage(prev => prev + 1);
    } catch (err) {
      setError('Failed to load more posts. Please try again.');
      console.error('Error loading more posts:', err);
    }
  }, [page]);

  // Intersection Observer setup
  useEffect(() => {
    if (isLoading) return;

    const options = {
      root: null,
      rootMargin: '100px',
      threshold: 0.1
    };

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        loadMorePosts();
      }
    }, options);

    if (loadingRef.current) {
      observer.current.observe(loadingRef.current);
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [hasMore, isLoading, loadMorePosts]);

  const handleLike = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isLiked: !post.isLiked,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1
        };
      }
      return post;
    }));
  }, []);

  const handleBookmark = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          isBookmarked: !post.isBookmarked
        };
      }
      return post;
    }));
  }, []);

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 mb-4">{error}</p>
        <button
          onClick={() => {
            setError(null);
            setPage(1);
            setPosts([]);
            setIsLoading(true);
            // Reload initial posts
            const initialPosts = SAMPLE_POSTS.slice(0, 4).map(post => ({
              ...post,
              id: uuidv4()
            }));
            setPosts(initialPosts);
            setHasMore(SAMPLE_POSTS.length > 4);
            setIsLoading(false);
          }}
          className="px-4 py-2 bg-[#00D1FF] text-white rounded-lg hover:bg-[#0029FF] transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (isLoading && posts.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-[200px]">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <Post
          key={post.id}
          post={post}
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      ))}
      
      {(isLoading || hasMore) && (
        <div ref={loadingRef} className="py-4">
          <LoadingSpinner />
        </div>
      )}
      
      {!hasMore && posts.length > 0 && (
        <div className="text-center py-4 text-slate-400">
          No more posts to load
        </div>
      )}
    </div>
  );
}

export default memo(Feed);