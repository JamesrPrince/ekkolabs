import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { formatDistanceToNow } from "date-fns";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faReply,
  faEdit,
  faTrash,
  faSave,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { cn } from "@/lib/utils";

// Types for comments
interface Author {
  id: string;
  name: string;
  email: string;
  image?: string;
}

export interface CommentType {
  id: number;
  content: string;
  author?: Author;
  authorId?: string;
  createdAt: string;
  updatedAt: string;
  replies?: CommentType[];
}

interface CommentProps {
  comment: CommentType;
  onReply: (parentId: number, content: string) => Promise<void>;
  onUpdate: (commentId: number, content: string) => Promise<void>;
  onDelete: (commentId: number) => Promise<void>;
  postId: string;
  depth?: number;
}

export default function Comment({
  comment,
  onReply,
  onUpdate,
  onDelete,
  depth = 0,
}: CommentProps) {
  const { user, isAuthenticated } = useAuth();
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [editContent, setEditContent] = useState(comment.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const canModify =
    isAuthenticated &&
    (user?.id === comment.authorId || user?.role === "ADMIN");

  const handleReplySubmit = async () => {
    if (!replyContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onReply(comment.id, replyContent);
      setReplyContent("");
      setIsReplying(false);
    } catch (error) {
      console.error("Failed to submit reply:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateSubmit = async () => {
    if (!editContent.trim()) return;

    setIsSubmitting(true);
    try {
      await onUpdate(comment.id, editContent);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update comment:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteComment = async () => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      try {
        await onDelete(comment.id);
      } catch (error) {
        console.error("Failed to delete comment:", error);
      }
    }
  };

  // Format the date
  const formattedDate = formatDistanceToNow(new Date(comment.createdAt), {
    addSuffix: true,
  });

  // Get author initials for avatar fallback
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <div
      className={cn(
        "comment-container border-l-2 pl-4 mb-4",
        depth > 0 ? "ml-8" : ""
      )}
    >
      <div className="comment-header flex items-center mb-2">
        <Avatar className="h-8 w-8 mr-2">
          {comment.author?.image ? (
            <AvatarImage src={comment.author.image} alt={comment.author.name} />
          ) : (
            <AvatarFallback>
              {comment.author?.name ? getInitials(comment.author.name) : "??"}
            </AvatarFallback>
          )}
        </Avatar>
        <div>
          <div className="font-semibold text-sm">
            {comment.author?.name || "Anonymous"}
          </div>
          <div className="text-xs text-muted-foreground">{formattedDate}</div>
        </div>
      </div>

      {isEditing ? (
        <div className="comment-edit mt-2">
          <Textarea
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
            className="min-h-[100px] mb-2"
            placeholder="Edit your comment..."
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleUpdateSubmit}
              disabled={isSubmitting}
            >
              <FontAwesomeIcon icon={faSave} className="mr-2" />
              Save
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsEditing(false);
                setEditContent(comment.content);
              }}
            >
              <FontAwesomeIcon icon={faTimes} className="mr-2" />
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="comment-content my-2 text-sm">{comment.content}</div>
      )}

      <div className="comment-actions flex gap-3 text-xs text-muted-foreground">
        {isAuthenticated && !isEditing && (
          <button
            className="flex items-center hover:text-primary"
            onClick={() => setIsReplying(!isReplying)}
          >
            <FontAwesomeIcon icon={faReply} className="mr-1" />
            Reply
          </button>
        )}
        {canModify && !isEditing && (
          <>
            <button
              className="flex items-center hover:text-primary"
              onClick={() => setIsEditing(true)}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-1" />
              Edit
            </button>
            <button
              className="flex items-center hover:text-destructive"
              onClick={handleDeleteComment}
            >
              <FontAwesomeIcon icon={faTrash} className="mr-1" />
              Delete
            </button>
          </>
        )}
      </div>

      {isReplying && (
        <div className="comment-reply mt-4 mb-2">
          <Textarea
            value={replyContent}
            onChange={(e) => setReplyContent(e.target.value)}
            className="min-h-[80px] mb-2"
            placeholder="Write a reply..."
          />
          <div className="flex gap-2">
            <Button
              size="sm"
              onClick={handleReplySubmit}
              disabled={isSubmitting}
            >
              Post Reply
            </Button>
            <Button
              size="sm"
              variant="ghost"
              onClick={() => {
                setIsReplying(false);
                setReplyContent("");
              }}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}

      {/* Render replies */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="comment-replies mt-4">
          {comment.replies.map((reply) => (
            <Comment
              key={reply.id}
              comment={reply}
              onReply={onReply}
              onUpdate={onUpdate}
              onDelete={onDelete}
              postId={reply.id.toString()}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
