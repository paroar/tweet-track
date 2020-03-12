import React from "react";
import styled from "styled-components";

type TweetProps = {
  tweet: any;
};

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <TweetStyled color={tweet.color}>
      <div className="tweet">
        <div className="tweet--user">
          <img
            src={tweet.user.profile_image_url}
            alt=""
            className="tweet--user__img"
          />

          <div>
            {tweet.user.name}
            <br />
            <a
              href={`https://twitter.com/${tweet.user.screen_name}`}
              target="blank"
            >
              @{tweet.user.screen_name}
            </a>
          </div>
          <p className="tweet--user__desc">{tweet.user.description}</p>
        </div>

        <p className="tweet--text">
          <a
            href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
            target="blank"
          >
            {tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
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
