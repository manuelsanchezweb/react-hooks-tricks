const YouTubeVideo = ({ id = 'N0x2oxx9QQo' }: { id?: string }) => {
  return (
    <div className="max-w-full relative w-full aspect-video overflow-hidden">
      <iframe
      className="absolute top-0 left-0 w-full h-full"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${id}`}
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default YouTubeVideo
