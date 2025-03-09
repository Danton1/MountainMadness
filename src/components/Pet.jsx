const Pet = ({ hunger, happiness, sanity, gameEnd }) => {
  if (hunger <= 90 || happiness <= 0 || sanity >= 100) {
    gameEnd()
  }

  return <></>
}

export default Pet
