import { useState } from 'react'
import ColorButton from './colorbutton'
import MovingButton from './movingbutton'

export default function GameEnd({ exitFn }) {
  const [video, setVideo] = useState(false)

  function exit(adWatched) {
    exitFn(adWatched)
  }

  const popupStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1000',
    backgroundColor: '#242424',
    border: '1px solid white',
    borderRadius: '20px',
    padding: '20px',
  }

  return (
    <div style={popupStyle}>
      <h1 className="text-center text-2xl text-white bg-red-500 p-4">
        💀 Your pet has died!
      </h1>
      <h2 style={{ margin: '12px 0' }}>
        Watch an ad to continue or{' '}
        <span onClick={() => exit(false)} style={{ cursor: 'pointer' }}>
          exit here
        </span>
      </h2>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
        }}
      >
        <ColorButton clickFn={() => setVideo(true)}>
          Watch AD to revive
        </ColorButton>
        <MovingButton clickFn={() => exit(false)} buttonColor="red">
          Exit
        </MovingButton>{' '}
        {/* Use MovingButton for the exit button */}
      </div>
      {video && (
        <video
          autoPlay
          onEnded={() => exit(true)}
          style={{ marginTop: '20px', width: '100%', maxWidth: '600px' }}
        >
          <source src="src/assets/yukon.mp4" type="video/mp4" />
        </video>
      )}
    </div>
  )
}
