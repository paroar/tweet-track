import React from 'react'

type TweetProps = {
    tweet: any
}

const Tweet:React.FC<TweetProps> = ({tweet}) => {
    return (
        <div>
            <p>{tweet.text}</p>
        </div>
    )
}

export default Tweet
