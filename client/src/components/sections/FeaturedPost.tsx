import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRight,
  faCalendarAlt,
  faTag,
  faClock,
} from "@fortawesome/free-solid-svg-icons";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  readTime: string;
}

interface FeaturedPostProps {
  post: BlogPost;
}

export default function FeaturedPost({ post }: FeaturedPostProps) {
  // Format date to a more readable format
  const formatDate = (dateString: string): string => {
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <Card className="overflow-hidden bg-custom-primary-lighter border-none animate-in show mb-12">
      <div className="md:grid md:grid-cols-2 h-full">
        <div className="relative h-64 md:h-full overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute top-4 left-4 bg-custom-accent3 text-custom-primary px-3 py-1 rounded-full text-xs font-medium">
            Featured
          </div>
        </div>

        <div className="p-8 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center text-custom-accent3 text-sm">
                <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
                {formatDate(post.date)}
              </div>
              <div className="flex items-center text-custom-accent2 text-sm">
                <FontAwesomeIcon icon={faClock} className="mr-2" />
                {post.readTime}
              </div>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-custom-secondary mb-4">
              {post.title}
            </h2>

            <p className="text-custom-accent2 mb-6">{post.excerpt}</p>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center text-custom-accent3 text-sm">
              <FontAwesomeIcon icon={faTag} className="mr-2" />
              {post.category}
            </div>

            <Button
              variant="ghost"
              className="text-custom-accent3 hover:bg-custom-accent3/10 border border-custom-accent3 px-4 py-2"
            >
              Read Article
              <FontAwesomeIcon icon={faArrowRight} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
