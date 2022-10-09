import React, { useState, useEffect } from 'react'
import { BsStars } from 'react-icons/bs'
import Post from '../Tweets'
import Tweetbox from './Tweetbox'
import Twitter from '../utils/TwitterContract.json'
import { TwitterContractAddress } from '../utils/config.js'
import { MdRunningWithErrors } from 'react-icons/md'
import FlipMove from "react-flip-move";



const ethers = require("ethers")


const style = {
  wrapper: `flex-[2] border-r border-l border-[#38444d]  overflow-auto scrollbar-hide`,
  header: `sticky top-0 bg-[#15202b] z-10 p-4 flex justify-between items-center`,
  headerTitle: `text-xl font-bold`,
}

/*  const post = [
  {
    name: 'Harsh',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2019-08-07 08:08:08',
  },
  {
    name: 'Happy',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00:000z',
  },
  {
    name: 'Priya',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2020-06-01T12:00:00:000z',
  },
  {
    name: 'Radhika',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00:000z',
  },
  {
    name: 'Gouri',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2016-08-08 08:08:08',
  },
  {
    name: 'Arshit',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: false,
    timestamp: '2020-06-01T12:00:00:000z',
  },
  {
    name: 'Agrim',
    username: '0*vfdfvdv484v1d5f',
    avtaar: 'https://yt3.ggpht.com/ytc/AKedOLRY9Un_v7Xr9dG1F5NEkqGsGSqwqRz0O3w3r1mI=s900-c-k-c0x00ffffff-no-rj',
    text: 'gm',
    isProfileImageNft: true,
    timestamp: '2020-06-01T12:00:00:000z',
  }
] 

 */





const Feed = ({personal}) => {

  const [posts, setPosts] = useState([]);


  const getUpdatedTweets = (allTweets, address) => {
    let updatedTweets = [];
    // Here we set a personal flag around the tweets
    for(let i=0; i<allTweets.length; i++) {
      if(allTweets[i].username.toLowerCase() == address.toLowerCase()) {
        let tweet = {
          'id': allTweets[i].id,
          'tweetText': allTweets[i].tweetText,
          'isDeleted': allTweets[i].isDeleted,
          'username': allTweets[i].username,
          'personal': true
        };
        updatedTweets.push(tweet);
      } else {
        let tweet = {
          'id': allTweets[i].id,
          'tweetText': allTweets[i].tweetText,
          'isDeleted': allTweets[i].isDeleted,
          'username': allTweets[i].username,
          'personal': false
        };
        updatedTweets.push(tweet);
      }
    }
    return updatedTweets;
  }



  /* get updated tweets */

  const {ethereum} = window;

  const getAllTweets = async () => {
    try{

      if (ethereum) {

      const provider = new ethers.providers.Web3Provider(ethereum);
      const signer = provider.getSigner();

      const twitterContract = new ethers.Contract(TwitterContractAddress, Twitter.abi, signer);


      let allTweet = await twitterContract.getAllTweets();
      setPosts(getUpdatedTweets(allTweet,ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist!");
      }

    }catch(err){
      console.log(err)
    }
  }



  const deleteTweet = key => async() => {
    console.log(key);

    // Now we got the key, let's delete our tweet
    try {
      const {ethereum} = window

      if(ethereum) {
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const TwitterContract = new ethers.Contract(
          TwitterContractAddress,
          Twitter.abi,
          signer
        );

        let deleteTweetTx = await TwitterContract.deleteTweet(key, true);
        let allTweets = await TwitterContract.getAllTweets();
        setPosts(getUpdatedTweets(allTweets, ethereum.selectedAddress));
      } else {
        console.log("Ethereum object doesn't exist");
      }

    } catch(error) {
      console.log(error);
    }
  }



  useEffect(() => {
    getAllTweets();
  }, []);

  return (
    <div className={style.wrapper}>
      <div className={style.header}>
        <div className={style.headerTitle}>Home</div>
        <BsStars />
      </div>
      <div className=''>
        <Tweetbox />
        
        <FlipMove>
        {posts.map((post) => (
          <Post
            key={post.id}
            displayName={post.username}
            text={post.tweetText}
            personal={post.personal}
            onClick={deleteTweet(post.id)}
          />
        ))}
      </FlipMove>





      </div>
    </div>
  )
}

export default Feed
