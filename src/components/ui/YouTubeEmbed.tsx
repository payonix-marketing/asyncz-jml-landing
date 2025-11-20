import { useState } from 'react';
import { PlayCircle } from 'lucide-react';
import { Helmet } from 'react-helmet-async';

interface YouTubeEmbedProps {
  videoId: string;
  title: string;
}

export function YouTubeEmbed({ videoId, title }: YouTubeEmbedProps) {
  const [isClicked, setIsClicked] = useState(false);
  const thumbnailUrl = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  if (isClicked) {
    return (
      <div className="aspect-video">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="rounded-2xl shadow-2xl"
        ></iframe>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <link rel="preload" as="image" href={thumbnailUrl} />
      </Helmet>
      <div
        onClick={() => setIsClicked(true)}
        className="relative aspect-video cursor-pointer group"
      >
        <img
          src={thumbnailUrl}
          alt={`Thumbnail for YouTube video: ${title}`}
          fetchPriority="high"
          width="1920"
          height="1080"
          className="w-full h-full object-cover rounded-2xl shadow-2xl"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-2xl transition-all group-hover:bg-opacity-50">
          <PlayCircle className="h-16 w-16 text-white/80 transition-transform group-hover:scale-110" />
        </div>
      </div>
    </>
  );
}