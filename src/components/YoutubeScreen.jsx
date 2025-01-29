import ReactPlayer from "react-player";

export default function YoutubeScreen(props) {

  // eslint-disable-next-line react/prop-types
  const { url } = props

  return (
    <div className='container_video'>
      {url ?
        <>
          <ReactPlayer
            url={url}
            controls
            playing={true}
            width={800}
            height={400}
          />
        </>
        :
        ''}
    </div>
  )
}