
$(document).ready(function() {
  function createTweetElement(tweetObject) {
      $tweet = $("<article>").addClass("tweet");
  
      var html = 
      `
      <header>
      <img src=${tweetObject.user.avatars.small}/>
      <h1>${tweetObject.user.name}</h1>
      <h2>${tweetObject.user.handle}</h2>
      </header>
  
      <div-class="tweet-body">
      <p>
      ${tweetObject.content}
      </p>
      </div>
      <footer>
      <p>
      ${tweetObject.creaated_at}
      </p>
      </footer>
      `;
      $tweet = $tweet.append;
      return $tweet;
  }
  });

  const tweetData = {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  };
  
  var $tweet = createTweetElement(tweetData);  

  console.log($tweet);