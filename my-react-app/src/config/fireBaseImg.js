import { useEffect, useState } from "react";
import { imageDb } from "./config";
import {ref,listAll , getDownloadURL,uploadBytes,dataVal } from "firebase/storage"
import {v4} from "uuid";

export function FirebaseImage(){
    const [img,setImg]=useState('');
    const [imgURL , setImgURL] =useState([])
    const handleClick=() =>{
        const imgRef = ref(imageDb,`files/${v4()}`)
        uploadBytes(imgRef,img)
    }
    useEffect(()=>{
        listAll(ref(imageDb,"files")).then(imgs=>{
            console.log(imgs);
            imgs.items.forEach(val=>{
                getDownloadURL(val).then(url=>{
                    setImgURL(data=>[...data,url])
                })
            })
        })
    },[])

    return(
        <div>
            <input type="file" onChange={(e)=>setImg(e.target.files[0])}/>
            <button onClick={handleClick}>Upload</button>
            <br/>
            {
                imgURL.map(dataVal=><div>
                        <img src={dataVal} height="200px" width="200px"/>
                        <br/>
                    </div>)
            }
        </div>
    )
}