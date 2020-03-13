/**
 * Name: Diana Dai
 * Date: March 13, 2020
 * This is the index.js page for the webpage.
 */

"use strict";
(function() {

  const POSTS_URL = "https://jsonplaceholder.typicode.com/posts";
  const NUM_IMG = 1; // default number of images per breed

  window.addEventListener("load", init);

  /**
   * When the window loads, activate the button for fetching posts.
   */
  function init() {
    id("post-btn").addEventListener("click", fetchPost);
  }

  function fetchPost() {
    id("response-message").textContent = "Posts Loading ...";
    id("response").innerHTML = "";
    id("post-btn").disabled = true;

    fetch(POSTS_URL)
      .then(checkStatus)
      .then(resp => resp.json())
      .then(displayPosts)
      .catch(handleError);
  }

  /**
   * Appends the given dogs name data to the page for display.
   * Information include the name message and a status indicating success or not.
   * @param {object} response - json object representing various dogs name information to
   *                   add to the page
   */
  function displayPosts(response) {
    id("response-message").textContent = "Posts";
    let sources = response;
    for (let i = 0; i < sources.length; i++) {
      if (
        ((id("id-input") && parseInt(id("id-input").value) > 0 && sources[i].id == parseInt(id("id-input").value))
        || (id("id-input").value.length == 0)) &&
        ((id("userId-input") && parseInt(id("userId-input").value) > 0 && sources[i].userId == parseInt(id("userId-input").value))
        || (id("userId-input").value.length == 0))) {

          let post = gen("div");
          let userId_id = gen("h5");
          userId_id.textContent = "Id: " + sources[i].id
            + "     User Id: " + sources[i].userId;

          let title = gen("h4");
          title.textContent = sources[i].title;

          let postBody = gen("p");
          postBody.textContent = sources[i].body;
          post.appendChild(title);
          post.appendChild(userId_id);
          post.appendChild(postBody);
          id("response").appendChild(post);
      }
    }

    id("post-btn").disabled = false;
  }

  /**
   * Appends selected number of the given dog breed images to the board for display.
   * Each image would have a breif explanation.
   * @param {object} response - json object representing various pokemon information to
   *                   add to the player card.
   */
  function displayImage(response) {
    let sources = response;
    for (let i = 0; i < sources.length; i++) {
      let userId = gen("p");
      userId.textContent = sources[i].userId;

      let id = gen("p");
      id.textContent = sources[i].id;

      let title = gen("h4");
      title.textContent = sources[i].title;

      let postBody = gen("p");
      postBody.textContent = sources[i].body;
      id("board").appendChild(userId);
      id("board").appendChild(id);
      id("board").appendChild(title);
      id("board").appendChild(postBody);
    }
  }

  /**
   * This function is called when an error occurs in the fetch call chain (e.g. the request
   * returns a non-200 error code, such as when the Dog API service is down). Displays a
   * user-friendly error message on the page.
   * @param {Error} err - the err details of the request.
   */
  function handleError(err) {
    let response = gen("p");
    let msg = "There was an error requesting data from the API service. " +
             "Please try again later. " + err;
    response.textContent = msg;
    id("response").appendChild(response);
  }

  /* ------------------------------ Helper Functions  ------------------------------ */

  /**
   * Helper function to return the response's result text if successful, otherwise
   * returns the rejected Promise result with an error status and corresponding text
   * @param {object} response - response to check for success/error
   * @return {object} - valid response if response was successful, otherwise rejected
   *                    Promise result
   */
  function checkStatus(response) {
    if (!response.ok) {
      throw Error("Error in request: " + response.statusText);
    }
    return response; // a Response object
  }

  /**
   * Returns the element that has the ID attribute with the specified value.
   * @param {string} name - element ID.
   * @returns {object} - DOM object associated with id.
   */
  function id(name) {
    return document.getElementById(name);
  }

  /**
   * Returns the first element that matches the given CSS selector.
   * @param {string} selector - CSS query selector string.
   * @returns {object} first element matching the selector in the DOM tree (null if none)
   */
  function qs(selector) {
    return document.querySelector(selector);
  }

  /**
   * Returns a new element with the given tagname.
   * @param {string} tagName - name of element to create and return.
   * @returns {object} new DOM element with the given tagname.
   */
  function gen(tagName) {
    return document.createElement(tagName);
  }
})();
