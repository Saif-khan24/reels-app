import { CircularProgress } from "@material-ui/core";
import { Link, Redirect } from "react-router-dom";
import { storage, firestore } from "./firebase";
import { AuthContext } from './AuthProvider';
import { useEffect, useContext, useState } from "react";


import VideoCard from "./VideoCard";
import Navbar from './Navbar';
import './Home.css';

let Home=()=>{

    let value = useContext(AuthContext);
    let [posts, setPosts] = useState([]);
    let [isUploading, setIsUploading] = useState(false);    ///
    let percent;

    useEffect(()=>{        //this useEffect is called only one time and other time when any changes you do in it
        let unsubscription = firestore
            .collection("posts")
            .onSnapshot((querySnapshot)=>{
                setPosts(
                    querySnapshot.docs.map((doc)=>{
                        return {...doc.data(), id: doc.id};
                    })           //docs is an array
                );
                // let arr = [];
                // setPosts(arr);   //methods of set...  are asynchronous (not purely)
            });
            return ()=>{          //returning a fn and calling a unsub in it so that ye tab chalega jb home compne scree se ht jaenga aur tabhi to hme unsubs krna h
                unsubscription();
            };
        }, []);

    return(
        <div>
            {value ? 
            (
                <>
                <Navbar />
                        
                <input
                 onClick={(e)=>{
                     e.target.value = null;          
                     //same file again upload kro to nhi ho rhi thi kyun ? onchange dekh raha tha ki kuch change to hua nhi isliye wo chal ho nhi raha 
                     //tha so we can do this ki onclick pr use null krde taaki same file kitni aar bhi upload krske 
                 }}
                         
                 onChange={(e)=>{
                    if(!e.target.files[0])    return;
                            
                    //get file name, size, type 
                    let { name, size, type } = e.target.files[0];
                    //store the selected file so that we can upload later on
                    let file = e.target.files[0];
                    size = size / 1048576;      //convert to mb
                    //get file type
                    type = type.split("/")[1];           //)[0]
                            
                    if(type !== "video" && type !== "mp4"){
                        alert("Upload a video");
                    }
                    else if(size > 10){
                        alert("size is too big!!!");
                    }
                    else{
                        //upload a video to firebase and it will take time,

                        //f1, f2, f3 passed to state_changed event for different purposes
                        let f1 = (snapshot)=>{     //f1 get an obj named snapshot which has 2 imp things
                            //console.log(snapshot.bytesTransferred);    //how many bytes have been uploaded
                            //console.log(snapshot.totalBytes);          //total size of your file, we can take ration of both and show progress bar type something
                            percent = (snapshot.bytesTransferred/snapshot.totalBytes)*100;  ///
                            console.log(percent + "% done");  ///
                            if(percent >= 0 && percent < 100 ){    ///
                                setIsUploading(true);
                            }else{
                                setIsUploading(false);
                            }
                        }

                        let f2 = (error) => {       //used for error handling, gets err object
                            console.log(error);
                        }   

                        let f3 = () => {    //file has been uploaded, take out its url 
                            let p = uploadtask.snapshot.ref.getDownloadURL();
                            p.then((url)=>{          //promise base fn
                                // console.log(url);

                                firestore.collection("posts").add({
                                    username: value.displayName,
                                    url,
                                    likes: 0,
                                    comments: [],
                                });
                            });
                        };

                                //using file based storage obj, we are getting reference of a file location => in our case posts/user-id/filename and 
                                // uploading file to that location
                        let uploadtask = storage
                         .ref(`/posts/${value.uid}/${Date.now() + name}`)
                         .put(file);

                                //upload method gives us upload task which can be used to setup state-changed event, this takes 3 callbacks
                        uploadtask.on("state_changed", f1, f2, f3);   //state change is an event which take 3 fun, each 3 have diff work
                    }
                }}
                 className="upload-btn"
                 type="file"
                />
                <span className="material-icons-outlined upload-btn2">file_upload</span>
                {
                    isUploading ? (
                        <div className="temp-circle">
                            Uploading... <CircularProgress className="progress-circle" />
                        </div>
                    ) : (
                      ""  
                    )}
                    
                    <div className="posts-container">
                    {
                        posts.map((post, index)=>{
                            return <VideoCard key={index} post={post}/>
                        })
                    }
                    </div>

                <Link to="/profile">
                    <button id="profile">Profile</button>
                    <span className="material-icons-outlined profile2">account_circle</span>
                </Link>
                </>
            ) 
            : 
            (
             <Redirect to="/profile" />
            )
        }
        </div> 
    );
};

export default Home;