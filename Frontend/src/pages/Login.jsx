import { useState } from "react"
const Login = () => {
  const [state, setstate] = useState("Sign Up")
  const [formData, setformData] = useState({
    username:"",
    email:"",
    password:""
  })
  const changeHandler = (e) => {
    setformData({...formData,[e.target.name]:e.target.value})
  }

  const login = async () => {
    console.log("Login",formData)
    let resposeData;
    await fetch("http://localhost:4000/signin",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "content-type":"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json().then((data)=> resposeData=data))

    if(resposeData.success){
      localStorage.setItem("auth-token",resposeData.token)
      window.location.replace('/');
    }else{
      alert(resposeData.error);
    }
  }

  const signup = async () => {
    console.log("signup",formData)
    let resposeData;
    await fetch("http://localhost:4000/signup",{
      method:"POST",
      headers:{
        Accept:"application/json",
        "content-type":"application/json"
      },
      body:JSON.stringify(formData)
    }).then((res)=>res.json().then((data)=> resposeData=data))

    if(resposeData.success){
      localStorage.setItem("auth-token",resposeData.token)
      window.location.replace('/');
    }else{
      alert(resposeData.error);
    }
  }

  return (
    <section className="max_padd_container flexCenter flex-col pt-32">
      <div className="max-w-[555px] h-[600px]  bg-white m-auto px-14 py-10 rounded-sm">
        <h3 className="h3">{state}</h3>
        <div className="flex flex-col gap-4 mt-7">
          {state==="Sign Up"?<input name="username" value={formData.username} onChange={changeHandler} type="text" placeholder="Your Name" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"></input> :""}
          <input name="email" type="email" value={formData.email} onChange={changeHandler} placeholder="Email Address" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"></input>
          <input name="password" type="password" value={formData.password} onChange={changeHandler} placeholder="password" className="h-14 w-full pl-5 bg-slate-900/5 outline-none rounded-xl"></input>
        </div>
        <button onClick={()=> {state=== "Sign Up"? signup(): login()}} className="btn_dark_rounded my-5 w-full !rounded-md">Continue</button>
        {state === "Sign Up" ? <p className="text-black font-bold">Already have an account? <span onClick={()=> setstate("Login")} className="text-secondary underline cursor-pointer">Login</span></p> : <p className="text-black font-bold">Create an account? <span onClick={()=> setstate("Sign Up")}  className="text-secondary underline cursor-pointer">Click here</span></p>  }

        <div className="flexCenter mt-6 gap-3">
          <input type="checkbox" name="" id=""></input>
          <p>By Continuing, i agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </section>
  )
}

export default Login
