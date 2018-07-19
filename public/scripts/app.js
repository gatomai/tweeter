/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

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

function createTweetElement(tweetObject) {
  $tweet = $("<article>").addClass("tweet");

  var html =
    `
  <header>
  <img class="logo" src=${tweetObject.user.avatars.small}>
  <span class="tweet-name">${escape(tweetObject.user.name)}</span>
  <span class="tweet-username">${escape(tweetObject.user.handle)}</span>
  </header>

  <div-class="tweet-body">
  <p>
  ${escape(tweetObject.content.text)}
  </p>
  </div>
  <footer>
  <p>
  ${tweetObject.created_at}
  </p>
  </footer>
  </article>
  `;
  $tweet = $tweet.append(html);
  $('.tweets-container').append($tweet);
  console.log($tweet);
  return $tweet;
}

function renderTweets(tweets) {
  var $html = $('<div></div>');
  $(".tweets-container").empty();
  tweets.forEach(tweet => {
    var twt = createTweetElement(tweet);
    $html.prepend(twt);
  })
  $(".tweets-container").html($html);
}

function OnLoadPage() {
  $("form").on("submit", function (event) {
    event.preventDefault();
    var twt = $(this).serialize();
    var twt_length = $(".new-tweet textarea").val();
    // console.log(twt_length.length);

    if (twt_length.length > 140) {
      alert('Exceeded the 140 char limit');
    } else if (twt_length.length === 0) {
      alert('Need to enter a Tweet');
    } else {
      $.ajax({
        type: "POST",
        url: "/tweets",
        data: twt,
        success: function (data) {
          console.log('Success', twt);
          loadTweets();
        }
      });
    }
    // console.log(twt_length.length);

    // event.preventDefault();
    // $(".new-tweet textarea").text($(".new-tweet textarea"));
    // console.log($(".new-tweet textarea").val()); 
    // const safeHTML = `<p>${escape($(".new-tweet textarea").val())}</p>`;
    // console.log(safeHTML);

  });
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

function slideTweet() {
    $(".composebtn").click(function(){
        $(".new-tweet").slideToggle("slow");
        $('textarea').trigger('select');
    });
}

function loadTweets() {
  // console.log('Button clicked, performing ajax call...');    
  $.ajax('/tweets', { method: 'GET' })
    .then(function (resp, err) {
      renderTweets(resp);
    });
}

$(document).ready(function () {
  loadTweets();
  slideTweet();

  // console.log('I am here');
  // var $tweet = createTweetElement(tweetData);
  // var $tweet = renderTweets(data);

  OnLoadPage();
  var $button = $('#twtBtn');
  $button.on('click', function () {

    loadTweets();    
  });


});


// Test / driver code (temporary)
//   console.log($tweet); // to see what it looks like
//   $('#tweets-container').append($tweet); 
// to add it to the page so we can make sure it's got all the right elements, classes, etc.