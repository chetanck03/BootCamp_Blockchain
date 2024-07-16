# Twitter Smart Contract Overview

## Objective:
Develop a smart contract that simulates a simple social media platform where users can tweet, send messages, follow other users, and manage operator permissions.

## Requirements:

### 1. Tweeting:
- Users can post tweets.
- An operator (authorized by a user) can post tweets on behalf of that user.

### 2. Messaging:
- Users can send direct messages to other users.
- An operator can send messages on behalf of the user who authorized them.

### 3. Following:
- Users can follow other users.
- Users can unfollow other users.

### 4. Permission Management:
- Users can allow or disallow other users as permissions who can act on their behalf.

### 5. Retrieving Tweets:
- Retrieve the latest tweets from all users.
- Retrieve the latest tweets from a specific user.

### Admin Functions:
- Admins have additional privileges such as deleting tweets and messages, resetting permissions, and managing admin status.

## Instructions:

### 1. Define the Contract Structure:

#### Structs:
- `Tweet`: Stores tweet details (id, author, content, creation timestamp).
- `Message`: Stores message details (id, sender, receiver, content, creation timestamp).

### 2. Mappings:

- `tweets`: Stores all tweets using a unique identifier.
- `tweetsUserId`: Stores tweet IDs by each user.
- `directMessages`: Stores direct messages between users.
- `permission`: Manages operator permissions.
- `following`: Stores the list of users that each user follows.
- `followers`: Stores the list of users following each user.

### 3. Functions:

#### Internal Functions:
- `_tweet(address _from, string memory _content)`: Handles the logic for posting tweets.
- `_sendMessage(address _from, address _to, string memory _content)`: Handles the logic for sending messages.

#### External Functions:
- `tweet(string memory _content)`: Allows a user to post a tweet.
- `tweetPermission(address _from, string memory _content)`: Allows an operator to post a tweet on behalf of a user.

- `sendMessage(string memory _content, address _to)`: Allows a user to send a message.
- `sendMessageUser(address _from, address _to, string memory _content)`: Allows an operator to send a message on behalf of a user.

- `follow(address _followed)`: Allows a user to follow another user.
- `unfollow(address _unfollowed)`: Allows a user to unfollow another user.

- `allow(address _permission)`: Allows a user to authorize an operator.
- `disallow(address _permission)`: Allows a user to revoke an operator's authorization.

#### View Functions:
- `getLatestTweetsAll(uint count)`: Returns the latest tweets across all users.
- `getLatestTweetsUser(address user, uint count)`: Returns the latest tweets of a specific user.
- `getFollowing(address user)`: Returns the list of users that a specific user is following.
- `getFollowers(address user)`: Returns the list of users following a specific user.
- `getMessages(uint count)`: Returns the latest messages (admin only).

### Admin Functions:
- `setAdmin(address newAdmin)`: Allows the current admin to set a new admin.
- `deleteTweet(uint tweetId)`: Allows the admin to delete a tweet by ID.
- `deleteMessage(uint messageId)`: Allows the admin to delete a message by ID.
- `resetPermission(address user, address operator)`: Allows the admin to reset permissions for a user/operator.
- `adminAllow(address user, address operator)`: Allows the admin to grant permissions to an operator.
- `adminDisallow(address user, address operator)`: Allows the admin to revoke permissions from an operator.

## Security Considerations:
- Ensure proper validation of user inputs to prevent unauthorized actions.
- Implement access control mechanisms to restrict sensitive functions to authorized users.


