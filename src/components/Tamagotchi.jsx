import './tamagotchi.css'

const Tamagotchi = ({ children }) => {
  return (
    <div className="tamagotchi">
      <div className="tamagotchi__inner">
        <div className="tamagotchi__shadow">
          <div className="tamagotchi__highlight"></div>
        </div>

        <div className="screen m-auto">
          <div className="crack crack--top"></div>
          <div className="crack crack--right">
            <div className="crack__line"></div>
          </div>
          <div className="crack crack--bottom"></div>
          <div className="crack crack--left">
            <div className="crack__line"></div>
          </div>

          <div className="screen__inner">{children}</div>
        </div>

        <div className="buttons">
          <div className="button button--a"></div>
          <div className="button button--b"></div>
          <div className="button button--c"></div>
        </div>
      </div>
    </div>
  )
}

export default Tamagotchi
