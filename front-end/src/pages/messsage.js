import { useCallback, useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import { getConversations, getConversationsByID } from "../apis";
import roles from "../constants/roles";
import avatar from '../assets/avatar.png'
import {io} from 'socket.io-client'
const MessagePage = ({ authReducer }) => {
  const [conversations, setConversations] = useState([]);
  const [activeConservation, setActiveConservation] = useState({
      sender: {},
      user: {},
      messages: [],
      _id: ""
  });
  const [text, setText] = useState("");
  const { token, user } = authReducer;
  const scrollRef = useRef();

const socket = io('ws://localhost:5000');

  const loadConversations = useCallback(async () => {
    const { data } = await getConversations(token);
    setConversations(data);
    setActiveConservation(data[0]);
  }, [token]);

  const loadConversationById = async (id) => {
      const {data} = await getConversationsByID(token, id);
      setActiveConservation(data.data);
  }
  
  useEffect(() => {
      socket.emit('addUser', user?._id);
  },[activeConservation])
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeConservation]);

  socket.on('getMessage', data => {
    console.log(data);
    setActiveConservation({...activeConservation, ...data})
})

  const handleSubmitMessage = (e) => {
      e.preventDefault();
      const objectEmit = {
        senderId: user?._id,
          receiverId: user?.role === roles.SELLER ? activeConservation?.user?._id : activeConservation?.seller?._id,
          conversationId: activeConservation?._id,
          text: text
      }
      socket.emit('sendMessage', objectEmit);
      setText("")
  }

  useEffect(() => {
    loadConversations();
  }, [loadConversations]);
  const dateConverter = (date) => {
    const dateToConvert = new Date(date);
    return `${dateToConvert.getHours()}:${dateToConvert.getMinutes()}, ${dateToConvert.getDay()}/${dateToConvert.getMonth() + 1}/${dateToConvert.getFullYear()}`
  }
  return (
    <div className="w-full min-h-screen h-full flex">
      <div className="w-1/5 border overflow-y-auto">
          {user.role === roles.SELLER ? <>
            {conversations.map((item, index) => <div key={index}>
                <div className="flex items-center gap-3 border-b py-5 hover:bg-gray-300 cursor-pointer" onClick={() => loadConversationById(item._id)}>
                    <div className="w-20 h-20 rounded-full">
                        <img className="w-20 h-20 rounded-full" src={item?.user?.avatar || avatar} alt="avatar" />
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xl font-medium text-gray-700">{item?.user?.fullname}</span>
                        <span>{item?.messages[item?.messages?.length-1]?.message}</span>
                    </div>
                </div>
            </div>)}
          </>:  <>
            {conversations.map((item, index) => <div key={index}>
                <div className="flex items-center gap-3 border-b py-5 hover:bg-gray-300 cursor-pointer" onClick={() => loadConversationById(item._id)}>
                    <div className="w-20 h-20 rounded-full">
                        <img className="w-20 h-20 rounded-full" src={item?.seller?.avatar || avatar} alt="avatar" />
                    </div>
                    <div className="">
                        <span className="text-2xl font-medium text-gray-700">{item?.seller?.fullname}</span>
                        <span>{item?.messages[item?.messages?.length-1]?.message}</span>
                    </div>
                </div>
            </div>)}
          </>}
      </div>
      <div className="w-full border">
        {activeConservation && <div className="flex-1 p:2 sm:p-6 justify-between flex flex-col h-screen">
          <div className="flex sm:items-center justify-between py-3 border-b-2 border-gray-200">
            <div className="relative flex items-center space-x-4">
              <div className="relative">
                <span className="absolute text-green-500 right-0 bottom-0">
                  <svg width="20" height="20">
                    <circle cx="8" cy="8" r="8" fill="currentColor"></circle>
                  </svg>
                </span>
                <img
                  src={user.role === roles.SELLER ? activeConservation?.user?.avatar || avatar : activeConservation?.seller?.avatar}
                  alt=""
                  className="w-10 sm:w-16 h-10 sm:h-16 rounded-full"
                />
              </div>
              <div className="flex flex-col leading-tight">
                <div className="text-2xl mt-1 flex items-center">
                  <span className="text-gray-700 mr-3">{user.role === roles.SELLER ? activeConservation?.user?.fullname :activeConservation?.seller?.fullname }</span>
                </div>
              </div>
            </div>
            
          </div>
          <div
            id="messages"
            className="flex flex-col space-y-4 p-3 overflow-y-auto scrollbar-thumb-blue scrollbar-thumb-rounded scrollbar-track-blue-lighter scrollbar-w-2 scrolling-touch"
          >
            {activeConservation?.messages?.map((item, index) => 
                item?.sender?._id !== user._id ? <div key={index}  className="chat-message">
                <div className="flex items-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-2 items-start">
                  <div className="flex flex-col px-4 py-2 rounded-lg rounded-br-none bg-gray-300 text-gray-600">
                      <span ref={scrollRef} className="text-lg">
                        {item.message}
                      </span>
                      <span className="text-xs text-gray-600">
                        {dateConverter(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <img
                    src={item?.sender?.avatar || avatar}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-1"
                  />
                </div>
              </div> : <div key={index}  className="chat-message">
                <div className="flex items-end justify-end">
                  <div className="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div className="flex flex-col px-4 py-2 rounded-lg rounded-br-none bg-blue-600 text-white ">
                      <span ref={scrollRef} className="text-lg" >
                        {item.message}
                      </span>
                      <span className="text-xs">
                        {dateConverter(item.createdAt)}
                      </span>
                    </div>
                  </div>
                  <img
                    src={item?.sender?.avatar || avatar}
                    alt="My profile"
                    className="w-6 h-6 rounded-full order-2"
                  />
                </div>
              </div>
            )}
          </div>
          <div className="border-t-2 border-gray-200 px-4 pt-4 mb-2 sm:mb-0">
            <div className="relative flex">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Write your message!"
                className="w-full focus:outline-none focus:placeholder-gray-400 text-gray-600 placeholder-gray-600 pl-12 bg-gray-200 rounded-md py-3"
              />
              <div className="absolute right-0 items-center inset-y-0 hidden sm:flex">
                <button
                onClick={handleSubmitMessage}
                  type="button"
                  className="disabled:cursor-not-allowed disabled:bg-gray-500 inline-flex items-center justify-center rounded-lg px-4 py-3 transition duration-500 ease-in-out text-white bg-blue-500 hover:bg-blue-400 focus:outline-none"
                    disabled={text?.length === 0}
                >
                  <span className="font-bold">Send</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-6 w-6 ml-2 transform rotate-90"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(MessagePage);
