"use client"
import Image from "next/image";
import { motion } from "framer-motion"
import 'remixicon/fonts/remixicon.css';
import wind from './Assets/wind.png';
import { useEffect,useState,useRef } from "react";
export default function Home({Reference}) {
    const inputRef =useRef()
    const drag =useRef()
    const [api ,setApi] = useState("6fe2462540a54a97960ccea5fc9b6d73");
    const [weatherData ,setWeatherData] = useState({});
    const search = async (city)=> {
try {
    if(inputRef===""){
        alert("enter city name");
    }
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api}`
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    setWeatherData({
        temperature:Math.trunc(data.main.temp),
        humidity:data.main.humidity,
        windSpeed:data.wind.speed,
        location:data.name
    })
} catch (error) {

}
    }
    useEffect(()=>{
        search("lucknow");
    },[])
  return (
   <>
   <div class="container w-[100vw] h-[100vh] overflow-hidden flex justify-center items-center " ref={drag}>
    <motion.div class="weather w-80 h-96  rounded-2xl overflow-hidden flex flex-col justify-between text-[#201f1f] z-10" drag dragConstraints={drag} initial={{ scale: 0 }}
  animate={{ rotate: 360, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 30
  }} >
        <div className="flex justify-center px-4 py-3 gap-3  input"><input type="text" className="text-[18px] px-2 outline-none bg-transparent text-white" ref={inputRef} placeholder="Enter City Name" autoFocus/> <i class="ri-search-line text-[20px] cursor-pointer text-zinc-50" onClick={()=> search (inputRef.current.value)}></i></div>
        <div className="flex  flex-col items-center c">
        <h1 className=" text-[50px] font-bold">{weatherData.temperature}°C</h1>
        <h2 className=" text-[30px] font-semibold" >{weatherData.location}</h2>
        </div>
        <div className="p-5 flex justify-between">
            <div className="flex items-center gap-1">
                <i class="ri-windy-line text-[25px]"></i>
                <div className="flex flex-col items-start"><h2 className="font-bold">{weatherData.windSpeed}km/h</h2>
                <p className="text-[13px] ">Wind speed</p></div>
            </div>
            <div className="flex items-center gap-1">
                <i class="ri-water-percent-fill text-[25px]"> </i>
                <div className="flex flex-col items-start"><h2 className="font-bold">{weatherData.humidity}%</h2>
                <p className="text-[13px] ">Humidity</p></div>
            </div>
        </div>

    </motion.div>

    <h1 className="text-[20vw] rounded-full absolute top-[70%] left-[50%] translate-x-[-50%]
  translate-y-[-50%] z-[1] opacity-40 text">Rupesh.</h1>
   </div>
   </>
  );
}
