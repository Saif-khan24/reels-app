import { useContext, useEffect, useState, useRef } from 'react';
import { firestore } from './firebase';

import { AuthContext} from './AuthProvider';

let VideoCard = (props)=>{
    let [boxOpen, setBoxOpen] = useState(false);
    let [playing, setPlaying] = useState(false);
    let [currentUserComment, setCurrentUserComment] = useState("");
    let [allComments, setAllComments] = useState([]);
    let [isLiked, setIsLiked] = useState(false);

    let value = useContext(AuthContext);

    useEffect(()=>{     //jab props change ho tab (case-3 useEffect)
        let f = async ()=>{
            let allCommentId = props.post.comments;
            let arr = [];

            for(let i=0; i<allCommentId.length; i++){
                let id = allCommentId[i];

                let doc = await firestore.collection("comments").doc(id).get();
                let commentData = {...doc.data(), id: doc.id };   //obj containing data and id of the comment
                arr.push(commentData);
            }

            setAllComments(arr);
        };

        f();
    }, [props]);

    const myEl = useRef(null);

    let observeConfig = {
        root: null,
        rootMargin: "0px",
        threshold: [0.25, 0.5, 0.75, 1],
    };

    useEffect(()=>{
        const myObserver = new IntersectionObserver((elements) => {
            if (elements[0].intersectionRatio >= 0.5) {
              //play the video
              if (myEl.current) myEl.current.play();
            } else {
              //pause the video
              if (myEl.current) {
                myEl.current.pause();
              }
            }
          }, observeConfig);
      
          // //step 4
          myObserver.observe(myEl.current);
        }, []);


    return (
        <div className="video-card">
            <video
             onClick={(e)=>{
                if(playing){
                    setPlaying(false);
                    e.currentTarget.pause();
                }else{
                    setPlaying(true);
                    e.currentTarget.play();
                }
            }}
             src={props.post.url}
             ref={myEl} ///
             loop
             autoPlay
            ></video>
            
            {
                
                // <span className="material-icons-outlined like liked">favorite {/*favorite*/}</span>
                <span  className={`material-icons-outlined like ${isLiked === true ? 'liked' : ""}`} onClick={()=>{
                    if(isLiked === true){
                        setIsLiked(false);
                        // console.log("not like");
                    }else{
                        // console.log("likes");
                        setIsLiked(true);
                    }
                }}>favorite</span>
            }
            
            <span
                className="material-icons-outlined comment"
                onClick={()=>{
                boxOpen ?  setBoxOpen(false) : setBoxOpen(true);
            }}
            >
                chat_bubble
             </span> 
            <p className="username"><strong>{'@' + props.post.username}</strong></p>
            <p className="song">
                <marquee className="some_song">&nbsp;{<span className="material-icons-outlined">library_music</span>}&nbsp;&nbsp;&nbsp; some song. . .</marquee>
            </p>
            
            {
                boxOpen ? ( 
                <div className="comment-box">
                    <button
                     className="comment-box-close-btn"
                     onClick={()=>{
                        setBoxOpen(false);
                    }}
                    >
                    X
                    </button>
                    <div className="all-comments">
                    
                    {
                        allComments.map((comment, index)=>{
                            return (
                                <div key={index}>
                                <img src={comment.pic} alt="loading..."/>
                                <div>
                                    <p><strong>{comment.username}</strong></p>
                                    <p className="inner-comment">{comment.comment}</p>
                                </div>
                            </div>
                            );
                        })
                    }
                    </div>
                    <div className="comment-form">
                        <input
                         type="text"
                          value={currentUserComment}
                           onChange={(e)=>{
                            setCurrentUserComment(e.currentTarget.value);
                        }}
                        />
                        <button
                         onClick={()=>{
                            let p = firestore.collection("comments").add({
                                comment: currentUserComment,
                                username: value.displayName,
                                pic: value.photoURL,
                            });

                            setCurrentUserComment("");

                            p.then((docRef) =>{
                                return docRef.get();
                            }).then((doc) => {

                            firestore
                             .collection("posts")
                             .doc(props.post.id)
                             .update({
                                comments: [...props.post.comments, doc.id],
                             });
                            });
                        }}
                        >
                        Post
                        </button>
                    </div>
                </div>
                ) : (
                  ""
            )}
        </div>
    );
}

export default VideoCard;