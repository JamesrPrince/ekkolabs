import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import Comment, { CommentType } from "./Comment";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

interface CommentSectionProps {
  postId: string;
}

export default function CommentSection({ postId }: CommentSectionProps) {
  const { isAuthenticated, user } = useAuth();
  const [comments, setComments] = useState<CommentType[]>([]);
  const [newComment, setNewComment] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch comments on component mount
  useEffect(() => {
    fetchComments();
  }, [postId]);

  // Fetch all comments for this post
  const fetchComments = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to load comments");
      }

      setComments(data.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load comments");
      console.error("Error fetching comments:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new top-level comment
  const addComment = async () => {
    if (!newComment.trim()) return;

    setIsSubmitting(true);
    setError(null);
    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(isAuthenticated && {
            Authorization: `Bearer ${localStorage.getItem("ekkolabs_auth_token")}`,
          }),
        },
        body: JSON.stringify({ content: newComment }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add comment");
      }

      // Refresh comments after adding
      await fetchComments();
      setNewComment("");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add comment");
      console.error("Error adding comment:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Add a reply to an existing comment
  const addReply = async (parentId: number, content: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/blog/posts/${postId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ekkolabs_auth_token")}`,
        },
        body: JSON.stringify({
          content,
          parentId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to add reply");
      }

      // Refresh comments after replying
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to add reply");
      console.error("Error adding reply:", err);
      throw err;
    }
  };

  // Update an existing comment
  const updateComment = async (commentId: number, content: string) => {
    setError(null);
    try {
      const response = await fetch(`/api/blog/comments/${commentId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("ekkolabs_auth_token")}`,
        },
        body: JSON.stringify({ content }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to update comment");
      }

      // Refresh comments after updating
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to update comment");
      console.error("Error updating comment:", err);
      throw err;
    }
  };

  // Delete a comment
  const deleteComment = async (commentId: number) => {
    setError(null);
    try {
      const response = await fetch(`/api/blog/comments/${commentId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("ekkolabs_auth_token")}`,
        },
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to delete comment");
      }

      // Refresh comments after deleting
      await fetchComments();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to delete comment");
      console.error("Error deleting comment:", err);
      throw err;
    }
  };

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Comments</h3>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isAuthenticated ? (
        <div className="mb-6">
          <Textarea
            placeholder="Write a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="min-h-[120px] mb-2"
          />
          <Button
            onClick={addComment}
            disabled={isSubmitting || !newComment.trim()}
            className="mt-2"
          >
            {isSubmitting && (
              <FontAwesomeIcon icon={faSpinner} className="mr-2 animate-spin" />
            )}
            Post Comment
          </Button>
        </div>
      ) : (
        <div className="mb-6 p-4 bg-muted rounded-md text-center">
          <p>
            Please{" "}
            <a href="/login" className="text-primary underline">
              log in
            </a>{" "}
            to leave a comment.
          </p>
        </div>
      )}

      <div className="comments-list">
        {isLoading ? (
          <div className="flex justify-center py-8">
            <FontAwesomeIcon
              icon={faSpinner}
              className="text-3xl text-muted-foreground animate-spin"
            />
          </div>
        ) : comments.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">
            <p>No comments yet. Be the first to comment!</p>
          </div>
        ) : (
          comments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={addReply}
              onUpdate={updateComment}
              onDelete={deleteComment}
              postId={postId}
            />
          ))
        )}
      </div>
    </Card>
  );
}
