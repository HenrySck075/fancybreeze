import type { Post } from "../comment";
import type { ContentImage, Timestamp, User } from "../wikia";
import type { Attachment, Attachments } from "../wikia_doc";
import type { ThreadPost } from "./thread_post";

export interface Tag {
  siteId: string;
  articleId: string;
  articleTitle: string;
  relativeUrl: string;
  image: string | null;
}

export interface UserData {
  hasReported: boolean;
  hasUpvoted: boolean;
}

export interface Poll {
  id: number;
  question: string;
  answers: {
    id: number;
    text: string;
    position: number;
    votes: number;
    image: {
      url: string;
      height: number;
      width: number;
      mediaType: string;
    };
  }[];
  totalVotes: number;
  /// ids of votes that the user picked
  userVotes: number[] | null; 
}

interface href {
  href: string;
}
interface ThreadInternal {
  _links: {
    first: href[],
    next?: href[],
    previous?: href[]
  },
  createdBy: User;
  creationDate: Timestamp;
  firstPostId: string;
  forumId: string;
  forumName: string;
  funnel: string;
  id: string;
  isContentSuppressed: boolean;
  isDeleted: boolean;
  isEditable: boolean;
  isFollowed: boolean;
  isLocked: boolean;
  isReported: boolean;
  jsonModel: string;
  lastEditedBy: User;
  lastPostId: string;
  latestRevisionId: string;
  modificationDate: Timestamp;
  page: number;
  postCount: number;
  rawContent: string;
  renderedContent: string | null;
  requesterId: string;
  siteId: string;
  source: string;
  tags: Tag[];
  title: string;
  trendingScore: number;
  upvoteCount: number;
  poll?: Poll;
  /*
  POST https://love-live.fandom.com/wikia.php?controller=DiscussionPoll&method=castVote
  Content-Disposition: form-data; name="answerIds"

  20516647
  Content-Disposition: form-data; name="pollId"

  5301294
  */
}

export interface Thread extends ThreadInternal {
  _embedded: Attachments;
}

interface AttachmentsExtra extends Attachments {
  /// theres firstPost but its essentially Thread but represented as a Comment
  "doc:posts": ThreadPost[];
}

export interface ThreadExtra extends ThreadInternal {
  _embedded: AttachmentsExtra;
}