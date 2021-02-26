// This is a proof of concept of a scrollable chat messages container.
// Original code at https://codesandbox.io/s/chat-messages-pagination-demo-8txzm

/* DOM references */
const messagesNode = document.querySelector(".messages");

const loadingNode = document.createElement("p");
loadingNode.classList.add("textMessage", "loading");
loadingNode.innerHTML = `Loading...`;
const LOADING_NODE_HEIGHT = 42;

const observerTargetNode = document.createElement("div");

// Counter for mock message IDs. Decremented since messages
// are rendered in reverse chronological order
let messageID = 1000;

/* Utilities */
function getRandomImageID() {
  return Math.floor(Math.random() * (10 - 1)) + 1;
}

const HEIGHTS = [50, 100, 150];
function getRandomImageHeight() {
  return HEIGHTS[Math.floor(Math.random() * HEIGHTS.length)];
}

function createTextMessageNode() {
  const text = document.createElement("p");
  text.classList.add("textMessage");
  text.innerHTML = `Message ${messageID}`;
  messageID -= 1;
  return text;
}

function createImageMessageNode() {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.classList.add("imageMessage");
    image.src = `https://picsum.photos/id/${getRandomImageID()}/100/${getRandomImageHeight()}`;
    /**
     * We preload the images and only resolve the promise once
     * the nodes are fully loaoded.
     *
     * If you're using a framework like React, your ability
     * to manipulate the DOM is limited. Instead of resolving
     * the promise with the actual img node, you can resolve
     * it with `image.width` and `image.height` instead.
     * Use these values to precompute aspect ratios
     * for image placeholders.
     */
    image.onload = () => {
      messageID -= 1;
      resolve(image);
    };
  });
}

function addNodeToParent(node, parent) {
  /**
   * Nodes are inserted in different orders so that the
   * resultant UIs between `column` and `column-reversed`
   * are the same.
   *
   * If you're using a framework like React, you can simply
   * `.reverse()` on your list of message components and
   * trust the framework to commit the DOM updates.
   */
  if (window.CSS.supports("overflow-anchor: auto")) {
    parent.prepend(node);
  } else {
    parent.append(node);
  }
}

async function getNewMessageNodes() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < 9; i++) {
    const text = createTextMessageNode();
    addNodeToParent(text, fragment);
  }
  const image = await createImageMessageNode();
  addNodeToParent(image, fragment);

  return fragment;
}

function scrollToBottom() {
  messagesNode.scrollTop = messagesNode.scrollHeight;
}

function getAnchorMessageNode() {
  /**
   * We always want to anchor against the topmost message,
   * which would be either the first message or the last,
   * depending on your layout method.
   */
  if (window.CSS.supports("overflow-anchor: auto")) {
    return messagesNode.firstChild;
  } else {
    return messagesNode.lastChild;
  }
}

async function addMessages() {
  messagesNode.removeChild(observerTargetNode);
  const prevTopElement = getAnchorMessageNode();
  addNodeToParent(loadingNode, messagesNode);

  const fragment = await getNewMessageNodes();
  addNodeToParent(fragment, messagesNode);

  // Scroll in one frame, then re-insert the observer target
  // in the next
  requestAnimationFrame(() => {
    messagesNode.scrollTop =
      prevTopElement.offsetTop - messagesNode.offsetTop - LOADING_NODE_HEIGHT;
    requestAnimationFrame(() => {
      messagesNode.removeChild(loadingNode);
      addNodeToParent(observerTargetNode, messagesNode);
    });
  });
}

function observerCallback(observerEntries) {
  if (observerEntries[0].isIntersecting) {
    addMessages();
  }
}

/* Observer for loading new messages */
let observer = new IntersectionObserver(observerCallback, {
  root: document.querySelector(".messagesNode"),
  rootMargin: "0px",
  threshold: 1.0,
});
observer.observe(observerTargetNode);

/* Rendering logic */
async function initialRender() {
  const fragment = await getNewMessageNodes();
  addNodeToParent(fragment, messagesNode);

  // Scroll in one frame, then re-insert the observer target
  // in the next
  requestAnimationFrame(() => {
    scrollToBottom();
    requestAnimationFrame(() => {
      addNodeToParent(observerTargetNode, messagesNode);
    });
  });
}
initialRender();
