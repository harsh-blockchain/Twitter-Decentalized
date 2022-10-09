export const TwitterContractAddress = '0x6cac33b9d5be652df0acba26fcb7f9f0a2977c31'
export const TwitterContractAbi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "address",
          "name": "recipient",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tweetId",
          "type": "uint256"
        }
      ],
      "name": "AddTweet",
      "type": "event"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "tweetId",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "bool",
          "name": "isDeleted",
          "type": "bool"
        }
      ],
      "name": "DeleteTweet",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "tweetText",
          "type": "string"
        },
        {
          "internalType": "bool",
          "name": "isDeleted",
          "type": "bool"
        }
      ],
      "name": "addTweet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "tweetId",
          "type": "uint256"
        },
        {
          "internalType": "bool",
          "name": "isDeleted",
          "type": "bool"
        }
      ],
      "name": "deleteTweet",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getAllTweets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "username",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "tweetText",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isDeleted",
              "type": "bool"
            }
          ],
          "internalType": "struct TwitterContract.Tweet[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMyTweets",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "address",
              "name": "username",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "tweetText",
              "type": "string"
            },
            {
              "internalType": "bool",
              "name": "isDeleted",
              "type": "bool"
            }
          ],
          "internalType": "struct TwitterContract.Tweet[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ]