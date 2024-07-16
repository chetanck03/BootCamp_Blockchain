// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Twitter {
    struct Tweet {
        uint id;
        address author;
        string content;
        uint timestamp;
    }

    struct Message {
        uint id;
        address sender;
        address receiver;
        string content;
        uint timestamp;
    }

    uint private tweetCounter;
    uint private messageCounter;
    address public admin;

    mapping(uint => Tweet) private tweets;
    mapping(address => uint[]) private tweetsUserId;
    mapping(uint => Message) private directMessages;
    mapping(address => mapping(address => bool)) private permission;
    mapping(address => address[]) private following;
    mapping(address => address[]) private followers;

    modifier onlyAuthorized(address _from) {
        require(msg.sender == _from || permission[_from][msg.sender], "Not authorized");
        _;
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Not admin");
        _;
    }

    constructor() {
        admin = msg.sender;
    }

    function _tweet(address _from, string memory _content) internal {
        require(bytes(_content).length > 0, "Content cannot be empty");
        tweetCounter++;
        tweets[tweetCounter] = Tweet(tweetCounter, _from, _content, block.timestamp);
        tweetsUserId[_from].push(tweetCounter);
    }

    function _sendMessage(address _from, address _to, string memory _content) internal {
        require(_to != address(0), "Invalid receiver address");
        require(bytes(_content).length > 0, "Content cannot be empty");
        messageCounter++;
        directMessages[messageCounter] = Message(messageCounter, _from, _to, _content, block.timestamp);
    }

    function tweet(string memory _content) external {
        _tweet(msg.sender, _content);
    }

    function tweetPermission(address _from, string memory _content) external onlyAuthorized(_from) {
        _tweet(_from, _content);
    }

    function sendMessage(string memory _content, address _to) external {
        _sendMessage(msg.sender, _to, _content);
    }

    function sendMessageUser(address _from, address _to, string memory _content) external onlyAuthorized(_from) {
        _sendMessage(_from, _to, _content);
    }

    function follow(address _followed) external {
        require(_followed != address(0), "Invalid address to follow");
        following[msg.sender].push(_followed);
        followers[_followed].push(msg.sender);
    }

    function unfollow(address _unfollowed) external {
        require(_unfollowed != address(0), "Invalid address to unfollow");
        uint length = following[msg.sender].length;
        for (uint i = 0; i < length; i++) {
            if (following[msg.sender][i] == _unfollowed) {
                following[msg.sender][i] = following[msg.sender][length - 1];
                following[msg.sender].pop();
                break;
            }
        }
    }

    function allow(address _permission) external {
        require(_permission != address(0), "Invalid permission address");
        permission[msg.sender][_permission] = true;
    }

    function disallow(address _permission) external {
        require(_permission != address(0), "Invalid permission address");
        permission[msg.sender][_permission] = false;
    }

    function getLatestTweetsAll(uint count) external view returns (Tweet[] memory) {
        require(count > 0, "Count must be greater than 0");
        uint totalTweets = tweetCounter < count ? tweetCounter : count;
        Tweet[] memory latestTweets = new Tweet[](totalTweets);
        for (uint i = 0; i < totalTweets; i++) {
            latestTweets[i] = tweets[tweetCounter - i];
        }
        return latestTweets;
    }

    function getLatestTweetsUser(address user, uint count) external view returns (Tweet[] memory) {
        require(user != address(0), "Invalid user address");
        require(count > 0, "Count must be greater than 0");
        uint totalUserTweets = tweetsUserId[user].length < count ? tweetsUserId[user].length : count;
        Tweet[] memory latestTweets = new Tweet[](totalUserTweets);
        for (uint i = 0; i < totalUserTweets; i++) {
            latestTweets[i] = tweets[tweetsUserId[user][tweetsUserId[user].length - 1 - i]];
        }
        return latestTweets;
    }

    function getFollowing(address user) external view returns (address[] memory) {
        require(user != address(0), "Invalid user address");
        return following[user];
    }

    function getFollowers(address user) external view returns (address[] memory) {
        require(user != address(0), "Invalid user address");
        return followers[user];
    }

    function getMessages(uint count) external view onlyAdmin returns (Message[] memory) {
        require(count > 0, "Count must be greater than 0");
        uint totalMessages = messageCounter < count ? messageCounter : count;
        Message[] memory latestMessages = new Message[](totalMessages);
        for (uint i = 0; i < totalMessages; i++) {
            latestMessages[i] = directMessages[messageCounter - i];
        }
        return latestMessages;
    }

    // Admin functionalities
    function setAdmin(address newAdmin) external onlyAdmin {
        require(newAdmin != address(0), "Invalid address");
        admin = newAdmin;
    }

    function deleteTweet(uint tweetId) external onlyAdmin {
        require(tweetId > 0 && tweetId <= tweetCounter, "Invalid tweet ID");
        delete tweets[tweetId];
    }

    function deleteMessage(uint messageId) external onlyAdmin {
        require(messageId > 0 && messageId <= messageCounter, "Invalid message ID");
        delete directMessages[messageId];
    }

    function resetPermission(address user, address operator) external onlyAdmin {
        require(user != address(0) && operator != address(0), "Invalid address");
        permission[user][operator] = false;
    }

    function adminAllow(address user, address operator) external onlyAdmin {
        require(user != address(0) && operator != address(0), "Invalid address");
        permission[user][operator] = true;
    }

    function adminDisallow(address user, address operator) external onlyAdmin {
        require(user != address(0) && operator != address(0), "Invalid address");
        permission[user][operator] = false;
    }
}
