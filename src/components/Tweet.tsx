import React from "react";
import styled from "styled-components";

type TweetProps = {
  tweet: any;
};

const Tweet: React.FC<TweetProps> = ({ tweet }) => {
  return (
    <div className="tweet">
      <img
        src={tweet.user.profile_banner_url}
        alt=""
        className="tweet--banner"
      />
      <div className="tweet--user">
        <img
          src={tweet.user.profile_image_url}
          alt=""
          className="tweet--user__img"
        />

        <div>
          <p>{tweet.user.name}</p>
          <a
            href={`https://twitter.com/${tweet.user.screen_name}`}
            target="blank"
          >
            <p>@{tweet.user.screen_name}</p>
          </a>
        </div>
        <p className="tweet--user__desc">{tweet.user.description}</p>

        <p>{tweet.user.followers_count} Followers</p>
        <p>{tweet.user.friends_count} Friends</p>
        <p>{tweet.user.location}</p>
        <p>Joined {tweet.user.created_at}</p>
      </div>
      <p className="tweet--text">
        {tweet.extended_tweet ? tweet.extended_tweet.full_text : tweet.text}
      </p>
      <a
        href={`https://twitter.com/${tweet.user.screen_name}/status/${tweet.id_str}`}
        target="blank"
      >
        Link to post
      </a>
    </div>
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
