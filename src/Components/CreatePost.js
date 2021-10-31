import React, { useState ,useEffect} from "react";
import NavBar from "./NavBar";
import { Grid, TextField } from "@mui/material";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import axios from "axios";
import {useHistory} from 'react-router'
import Message from './Message'

import ReactQuill from "react-quill";
import EditorToolbar, { modules, formats } from "./EditorToolBar";
import "react-quill/dist/quill.snow.css";
import { getSuggestedQuery } from "@testing-library/dom";


// function CreatePost() {
//   let history = useHistory()
  // const [message,setMessage] =useState("")
//   const [formValues, setFormvalues] = useState({
//     title: "",
//     content: "",
//     image: "",
//   });
  // const [showMessage,setShowMessage]=useState(false)

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormvalues({
//       ...formValues,
//       [name]: value,
//     });
//   };

//   const onHandleChange =(value)=>{
//     setFormvalues({ ...formValues,
//       information:value
//     })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault();
// let newPost = formValues
//    await axios.post('http://localhost:3001/post/createPost',
//     {newPost},
//     {headers:{ authorization:window.localStorage.getItem("token")}
//   })
//   .then((response)=>{
//     setMessage(response.data)
//     setShowMessage(true)
//     setTimeout(() => {
//       history.push('/userPosts')
//     }, 1000);
//   })
// .catch((error)=>{
//   setMessage(error.message)
//   console.log(error)
//   setShowMessage(true)
// })


//   };
//   return (
//     <>
//     <NavBar data="Create Post "/>
//     <Message message={message} showMessage={showMessage}/>
//       <form onSubmit={handleSubmit}>
//         <Box m={15}>
//           <Grid
//             item
//             lg="12"
//             container
//             direction="column"
//             justifyContent="center"
//             alignItems="center"
//           >
//             <TextField
//               id="outlined-multiline-flexible"
//               label="Title"
//               multiline
//               maxRows={2}
//               value={formValues.title}
//               onChange={handleChange}
//               name="title"
//               fullWidth
//             />
//               <EditorToolbar toolbarId={'t2'} />
//             <ReactQuill
//               theme="snow"
//               value={formValues.title}
//               onChange={onHandleChange}
//               placeholder={"Write something awesome..."}
//               modules={modules('t2')}
//               formats={formats}
//             /> 
//             <TextField
//               id="outlined-multiline-flexible"
//               placeholder="Enter your Image URL"
//               value={formValues.image}
//               onChange={handleChange}
//               name="image"
//               fullWidth
//             />

//             <TextField
//               id="outlined-textarea"
//               placeholder="Enter your Content here"
//               multiline
//               onChange={handleChange}
//               value={formValues.content}
//               name="content"
//               rows={12}
//               fullWidth
//             />
//             <Box mt={2}>

            
//             <Button type="submit" variant="contained">Publish</Button>
//             </Box>
//           </Grid>
//         </Box>
//       </form>
//     </>
//   );
// }

// export default CreatePost;


function CreatePost() {
  const [showMessage,setShowMessage]=useState(false)
  const [message,setMessage] =useState("")
  let history = useHistory();
  let [createPost,setCreatePost]=useState(false)
  let [severity ,setSeverity]=useState("error")
  const [userInfo, setuserInfo] = useState({
    title: '',
    content: '',
    image: '',
  });
  const onChangeValue = (e) => {
    setuserInfo({
      ...userInfo,
      [e.target.name]:e.target.value
    });
  } 
  const ondescription = (value) => {
    setuserInfo({ ...userInfo,
      content:value
    });
  }  

  const addDetails = async (event) => {
    event.preventDefault();
    console.log(userInfo)
    let newPost = userInfo
   await axios.post('https://blogging-b251-wd.herokuapp.com/post/createPost',
    {newPost},
    {headers:{ authorization:window.localStorage.getItem("token")}
  })
  .then((response)=>{
    setMessage(response.data)
    setShowMessage(true)
    setTimeout(() => {
      history.push('/userPosts')
    }, 1000);
  })
.catch((error)=>{
  setMessage(error.message)
  console.log(error)
  setShowMessage(true)
  setSeverity("success")
})
  } 

  useEffect(() => {
    getUser()
  }, [])


 async function getUser(){
    await axios.get('https://blogging-b251-wd.herokuapp.com/authors/getUser',{headers:{authorization:window.localStorage.getItem("token")}})
    .then((response)=>{
      setCreatePost(true)
      console.log(response.data)
    })
    .catch((error)=>{
      console.log(error)
      setMessage("Please Login")
      setShowMessage(true)
    })
  }
return ( 
<>
<NavBar data="Create Post "/>
     <Message message={message} showMessage={showMessage} severity={severity}/>
<Box mt={3} ms={5}mx={5}>
         <Grid
            item
         lg="8"
            container
            direction="column"
            justifyContent="center"
            alignItems="center"
          >
        <form onSubmit={addDetails} className="update__forms">
          <div className="form-row">
            {createPost ? 

            <>
          <TextField
              id="outlined-multiline-flexible"
              label="Title"
              multiline
              maxRows={2}
              value={userInfo.title}
              onChange={onChangeValue}
              name="title"
              fullWidth
            />
              <label className="font-weight-bold"> Description <span className="required"> * </span> </label>
            <EditorToolbar toolbarId={'t1'}/>
            <ReactQuill
              theme="snow"
              value={userInfo.content}
              onChange={ondescription}
              placeholder={"Write something awesome..."}
              modules={modules('t1')}
              formats={formats}
            />
            
            <br />
            <TextField
              id="outlined-multiline-flexible"
              placeholder="Enter your Image URL"
              value={userInfo.image}
              onChange={onChangeValue}
              name="image"
              fullWidth
            />
            <Box mt={2}>      
               <Button type="submit" variant="contained">Publish</Button>    
              </Box>
              </>
              : ""
}
            </div> 
        </form>
        </Grid>
        </Box>
</>
)
}
export default CreatePost

