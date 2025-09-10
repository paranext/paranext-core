import { CommentListProps } from "./comment-list.types";
import { CommentThread } from "./comment-thread.component";

export function CommentList({
                                 className = '',
                                 formatDate,
                                 comments,
                                 localizedStrings,
                               }: CommentListProps) {
  return (
    <div
      role="listbox"
      aria-label="Comments"
      className={`max-w-screen-md flex flex-col gap-12 w-full ${className}`}>
      {comments.map(comment => (
        <div key={comment.id}>
          <CommentThread
            comment={comment}
            formatDate={formatDate}
            localizedStrings={localizedStrings} />
        </div>
      ))}
    </div>
  );
}
