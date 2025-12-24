import { Card, CardContent } from "@/components/ui/card";
import { Comment } from "./project-table";

interface CommentListProps {
  comments: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
  return (
    <div className="space-y-4">
      {comments.map((c, idx) => (
        <Card
          key={idx}
          className="bg-white border border-gray-200 shadow-sm p-2"
        >
          <CardContent className="space-y-2 px-2">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-gray-800 text-sm">
                {c.user.username}
              </span>
              <span className="text-xs text-gray-500">
                {new Date(c.timeStamp).toLocaleString()}
              </span>
            </div>
            <p className="text-gray-700 text-sm">{c.comment}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
