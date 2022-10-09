import React from 'react'
import { useState, useEffect } from 'react'
import { BsCardImage, BsEmojiSmile } from 'react-icons/bs'
import { RiFileGifLine, RiBarChartHorizontalFill } from 'react-icons/ri'
import { IoMdCalendar } from 'react-icons/io'
import { MdOutlineLocationOn } from 'react-icons/md'
import Twitter from '../utils/TwitterContract.json'
import { TwitterContractAddress,TwitterContractAbi } from '../utils/config.js'
import { ethers } from 'ethers'




const style = {
  wrapper: `px-4 flex flex-row border-b border-[#38444d] pb-4`,
  tweetBoxLeft: `mr-4`,
  tweetBoxRight: `flex-1`,
  profileImage: `height-16 w-16 rounded-full`,
  inputField: `w-full h-full outline-none bg-transparent text-lg`,
  formLowerContainer: `flex`,
  iconContainer: `text-[#1d9bf0] flex flex-1 items-center`,
  icon: `mr-2`,
  submitGeneral: `px-6 py-2 rounded-3xl font-bold`,
  inactiveSubmit: `bg-[#196195] text-[#95999e]`,
  activeSubmit: `bg-[#1d9bf0] text-white`,
}

function Tweetbox() {



  const[tweetMessage,setTweetMessage] = useState('');
  const[tweetImage,setTweetImage] = useState('');





  /* adding the tweets */


  const {ethereum} = window;

  const addTweet = async () => {
    let tweet = {
      'tweetText': tweetMessage,
      'isDeleted': false
    };


    try{
      if(ethereum){

        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();

        const twitterContract = new ethers.Contract(TwitterContractAddress,Twitter.abi,signer);


        let twittertxt = await twitterContract.addTweet(tweet.tweetText,tweet.isDeleted);
        console.log(twittertxt);

      }else{
        alert("Ethereum Object does not Exist")
      }

    }catch(error){
      console.log(error);
    }


  }



  const sendTweet = (e) => {
    e.preventDefault();
    addTweet();

    setTweetMessage("");
    setTweetImage("");
  }

  useEffect(() => {

  })


  return (
    <div className={style.wrapper}>
      <div className={style.tweetBoxLeft}>
        <img
          src="https://fiverr-res.cloudinary.com/images/t_smartwm/t_main1,q_auto,f_auto,q_auto,f_auto/attachments/delivery/asset/2edd054d22a021e9f73f92d7c168e3da-1617020793/SMOKEY-finale/create-a-cool-animal-avatar-or-profile-picture.png"
          alt="profile image"
          className={style.profileImage}
        />
      </div>
      <div className={style.tweetBoxRight}>
        <form className=' py-3'>
          <textarea
            className={style.inputField}
            placeholder="What's happening?"
            value={tweetMessage}
            onChange={(e) => setTweetMessage(e.target.value)}
          />

          <input
            className={style.inputField}
            value={tweetImage}
            onChange={(e) => setTweetImage(e.target.value)}
            placeholder="Optional: Enter image URL"
            type="text"
          />




          {/* icons */}
          <div className=' pt-4'>

            <div className={style.formlowerContainer}>
              <div className={style.iconContainer}>
                <BsCardImage className={style.icon} />
                <RiFileGifLine className={style.icon} />
                <RiBarChartHorizontalFill className={style.icon} />
                <BsEmojiSmile className={style.icon} />
                <IoMdCalendar className={style.icon} />
                <MdOutlineLocationOn className={style.icon} />
              </div>
            </div>



{/* submit */}

            <div className='flex justify-between pr-12'>
              <div></div>
              <button
                type="submit"
                /* onClick={sendTweet} */
                className={`${style.submitGeneral} ${tweetMessage ? style.activeSubmit : style.inactiveSubmit
                  }`}

                  onClick={sendTweet}
              >
                Tweet
              </button>

            </div>

          </div>
        </form>
      </div>
    </div>
  )
}

export default Tweetbox
