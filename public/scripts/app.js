/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
// INITIAL TEST DATA 
 // const tweetData = {
//   "user": {
//     "name": "Newton",
//     "avatars": {
//       "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//       "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//       "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//     },
//     "handle": "@SirIsaac"
//   },
//   "content": {
//     "text": "If I have seen further it is by standing on the shoulders of giants"
//   },
//   "created_at": 1461116232227
// };

// const data = [
//   {
//     "user": {
//       "name": "Newton",
//       "avatars": {
//         "small": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
//         "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
//         "large": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
//       },
//       "handle": "@SirIsaac"
//     },
//     "content": {
//       "text": "If I have seen further it is by standing on the shoulders of giants"
//     },
//     "created_at": 1461116232227
//   },
//   {
//     "user": {
//       "name": "Descartes",
//       "avatars": {
//         "small": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
//         "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
//         "large": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
//       },
//       "handle": "@rd"
//     },
//     "content": {
//       "text": "Je pense , donc je suis"
//     },
//     "created_at": 1461113959088
//   },
//   {
//     "user": {
//       "name": "Johann von Goethe",
//       "avatars": {
//         "small": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
//         "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
//         "large": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
//       },
//       "handle": "@johann49"
//     },
//     "content": {
//       "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
//     },
//     "created_at": 1461113796368
//   }
// ];

// Function to create One basic Tweet Article
function createTweetElement(tweetObject) {
  $tweet = $("<article>").addClass("tweet");

  var html =
    `
  <header>
  <img class="logo" src=${tweetObject.user.avatars.small}>
  <span class="tweet-name">${escape(tweetObject.user.name)}</span>
  <span class="tweet-username">${escape(tweetObject.user.handle)}</span>
  </header>

  <div class="tweet-body">
  <p>
  ${escape(tweetObject.content.text)}
  </p>
  </div>
  <footer>
  <p>
  ${getElapsedTime(tweetObject.created_at)}
  </p>
  <span>
  <i class="fa fa-flag" aria-hidden="true"></i>
  <i class="fa fa-retweet" aria-hidden="true"></i>
  <i class="fa fa-heart" aria-hidden="true"></i>
  </span>
  </footer>
  </article>
  `;
  $tweet = $tweet.append(html);
  $('.tweets-container').append($tweet);
  // console.log($tweet);
  return $tweet;
}


// Function to show recently created Tweet and show all older Tweets
function renderTweets(tweets) {
  var $html = $('<div></div>');
  $(".tweets-container").empty();
  tweets.forEach(tweet => {
    var twt = createTweetElement(tweet);
    $html.prepend(twt);
  })
  $(".tweets-container").html($html);
}

// Function to show the elapsed time since the tweet was posted
function getElapsedTime(date) {

  var currentDate = Date.now();

  var elapsedSeconds = (currentDate - date) / 1000 / 60;
  var elapsedMinutes = (currentDate - date) / 1000 / 60;
  var elapsedHours = (currentDate - date) / 1000 / 60 / 60;

  if (elapsedMinutes < 1) {
    return `${Math.floor(elapsedSeconds)} second(s) ago`;
  } else if (elapsedMinutes > 1 && elapsedMinutes < 60) {
    return `${Math.floor(elapsedMinutes)} minute(s) ago`;
  } else if (elapsedMinutes > 60 && elapsedHours < 24) {
    return `${Math.floor(elapsedHours)} hour(s) ago`;
  } else if (elapsedHours > 24) {
    return `${Math.floor(elapsedHours / 24)} day(s) ago`;
  }
}

// Function to validate the input entered into the Text Area and also POST the Tweet
function OnLoadPage() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var twt = $(this).serialize();
    var twt_length = $(".new-tweet textarea").val();

    if ($(".new-tweet textarea").val().length > 140) {
      $(".error").html('Exceeded the 140 char limit');
      $(".error").slideToggle("slow");
    } else if ($(".new-tweet textarea").val().length === 0) {
      $(".error").html('Need to enter a Tweet');
      $(".error").slideToggle("slow");
    } else {
      $(".error").slideToggle("slow");
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: twt,
        success: function (data) {
          // console.log('Success', twt);
          loadTweets();
          clearFields();
        }
      });
    }
  });
}

// Function to reset all text fields on the form
function clearFields() {
  document.forms[0].reset();
  $(".counter").text("140");
}

// Function to strip any XSS code
function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

// Function to slide the rendered tweets up and select the text area
function slideTweet() {
  $(".composebtn").click(function () {
    $(".new-tweet").slideToggle("slow");
    $('textarea').trigger('select');
  });
}

// Function to load all the tweets from the Database
function loadTweets() {
  $.ajax('/tweets', { method: 'GET' })
    .then(function (resp, err) {
      renderTweets(resp);
    });
}

// When the document is all loaded, run the above functions
$(document).ready(function () {
  loadTweets();
  slideTweet();

  OnLoadPage();

  var $button = $('#twtBtn');
  $button.on('click', function () {
    loadTweets();
  });


});