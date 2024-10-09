import axios from 'axios';

export const  getAllPersonal= async ()=>{
    try {
        let result = await axios.get("http://localhost:4000/api/personal/getList");
        console.log(111,result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}
export const doPersonal= async(value)=>{
    let user=await axios.post("http://localhost:4000/api/personal/createPersonal",value);
    return user.status;
}
export const updatePersonal=async(id,value)=>{
    let temp=await axios.put("http://localhost:4000/api/personal/updatePersonal/"+id,value);
    return temp.status;
}
export const deletePersonal=async(id,value)=>{
    let temp=await axios.delete("http://localhost:4000/api/personal/deletePersonal/"+id,value);
    return temp.status;
}
export const findByIdPersonal=async(id)=>{
    try {
        let result =await axios.get("http://localhost:4000/api/personal/"+id);
        console.log(result.data);
        return result.data;
    } catch (error) {
        console.log(error);
    }
}