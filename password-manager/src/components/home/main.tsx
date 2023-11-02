import { useState } from "react";
import axios from "axios";
import C_V from "./v";

const C_Main: React.FC = ( ) => {
    const [website, setWebsite] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, z:'Website'|'UserName'|'Password'|'Reset') => {
        switch (z) {
            case 'Website':
                setWebsite(e.target.value);
                break;
            case 'UserName':
                setUsername(e.target.value);
                break;
            case 'Password':
                setPassword(e.target.value);
                break;
            case 'Reset':
            
                setWebsite('');
                setUsername('');
                setPassword('');
                break;
            default:
                break;
        }
    }

    const handleAdd = (e: React.FormEvent<HTMLFormElement>|any) => {
        const specialid = localStorage.getItem('specialId');

        if(website==='' || username==='' || password==='') return alert("Please fill all the fields");
        
        axios.post('/api/p', {
            website,
            username,
            password,
            specialid
        }).then((res) => {
            // console.log(res);
            Promise.all([handleChange(e,"Reset")]).then(()=>alert("Password Added Reloading the page")).then(()=>window.location.reload());
           
              
        }).catch((err) => {
            handleChange(e,"Reset");
            
            console.log(err);
        })
        console.log(website, username, password);
        e.preventDefault();
    }
    return (
        <div>
            <div>
                <h1 className="text-center text-4xl font-bold font-sans pb-3 p-5">Password Manager</h1>
            </div>
            <section className={`bg-gradient-to-br from-blue-800 to-blue-400 flex justify-center bg-blue-400`}>
            
             <div className={`grid grid-cols-2  gap-2 `}>
                <div className={`wrapper bg-gradient-to-br from-blue-900 to-blue-600 w-[calc(100vw/2)] mt-10 mb-10 ml-3 rounded-md`}>
                    <div>
                        <h1 className="text-start text-xl font-bold font-sans pb-3 p-5">Add New Password</h1>
                    </div>
                    <div className="ml-3 mr-3 mb-5 mt-3">
                        <form action="" className="text-start  " onSubmit={handleAdd}>
                        <div> 
                            <input type="text" name="website" value={website} id="website" placeholder="Enter Website" className={`p-4 rounded-sm w-[100%] mb-4 text-black`} onChange={(e)=>handleChange(e,"Website")}/>
                        </div>
                        <div> 
                            <input type="text" name="username" id="username" value={username} placeholder="Enter Username" className={`p-4 rounded-sm w-[100%] mb-4 text-black`} onChange={(e)=>handleChange(e,"UserName")} />
                        </div>
                        <div> 
                            <input type="text" name="password" id="password" value={password} placeholder="Enter Password" className={`p-4 rounded-sm w-[100%] mb-4 text-black`} onChange={(e)=>handleChange(e,"Password")}/>
                        </div>
                        <div className="flex justify-end">
                            <button type="submit" className="p-2 bg-gradient-to-br from-blue-400 to-blue-800 rounded-md pl-6 pr-6" onClick={(e)=>handleAdd(e)}>Add</button>
                        </div>
                    </form>
                    </div>
                    
                </div> 


                <div className={`flex justify-center`}>
                    <div className="flex justify-center">
                        <img src="/L.png" alt="" className="w-[50%] object-contain object-center justify-center"/>
                    </div>
                    </div> 

             </div>
            </section>
            <C_V/>
        </div>

    )
}
export default C_Main;