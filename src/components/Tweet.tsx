import React from "react";
import styled from "styled-components";

type TweetType = {
  tweet:{
  id: string,
  id_str: string,
  name: string,
  screen_name: string,
  profile_image_url: string,
  description: string,
  sentiment: number,
  text: string,
  place: number[][][]
  }
}

const COLORS = ["#2AAD27", "#CB2B3E", "#FFD326"];

const Tweet: React.FC<TweetType> = (props) => {

  const {
    id_str, 
    name, 
    screen_name, 
    profile_image_url, 
    description, 
    sentiment, 
    text
  } = props.tweet;

  const tweetColor = () => {
    if(sentiment === 0){
      return COLORS[2];
    } else if(sentiment > 0){
      return COLORS[0];
    }else{
      return COLORS[1];
    }
  }

  return (
    <TweetStyled color={tweetColor()}>
      <div className="tweet">
        <div className="tweet--user">
          <img
            src={profile_image_url}
            alt=""
            className="tweet--user__img"
          />

          <div>
            {name}
            <br />
            <a
              href={`https://twitter.com/${screen_name}`}
              target="blank"
            >
              @{screen_name}
            </a>
          </div>
          <p className="tweet--user__desc">{description}</p>
        </div>

        <p className="tweet--text">
          <a
            href={`https://twitter.com/${screen_name}/status/${id_str}`}
            target="blank"
          >
            {text}
          </a>
        </p>
      </div>
    </TweetStyled>
  );
};

export default Tweet;

interface TweetStyledProps {
  color: string;
}

const TweetStyled = styled.div<TweetStyledProps>`
  background-color: ${p => p.color};
  padding: 0.5rem;
`;
