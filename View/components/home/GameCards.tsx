type Cards = {
  title: string
  description: string
  buttonText: string
  image: string
  span: string
}

const Card = ( {title, description, buttonText, image, span} : Cards ) => {

  const targetWord = span;
  const index = description.indexOf(targetWord);
  const firstPart = description.slice(0, index);
  const secondPart = description.slice(index + targetWord.length);

  return (
    <div className="group card_shape">
      <div className="h-96 ">
        <img className=" card_image" src={image} alt="" />
      </div>
      <div className=" card_handle_hover">
        <h1 className=" card_text_h">{title}</h1>
        <p className=" card_text_p font-Heading">
        {firstPart}
        <span className=" underline text-primary-pink-300">{targetWord}</span>
        {secondPart}
        </p>
          <div className=" card_button">
              <button className=" card_button_text ">{buttonText}</button>
          </div>
      </div>
    </div>
  )
}

const GameCards = () => {
  return (

  <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:max-w-[1400px] mt-20 px-10  justify-center">
    <Card title="One Vs One" description="Compete head-to-head against friends and rivals in thrilling ping pong matches." buttonText="Play Now" image="/OneVsOne.png" span="head-to-head"/>
    <Card title="One Vs Bot" description="Challenge yourself against an advanced AI opponent  in intense solo ping pong battles." buttonText="Play Now" image="/OneVsBot.png" span="AI opponent" />
    <Card title="Spectate" description="Spectate live streams of exciting ping pong matches for an immersive viewing experience." buttonText="Watch Stream" image="/Spectate.png" span="live streams"/>
  </div>
  )
}

export default GameCards