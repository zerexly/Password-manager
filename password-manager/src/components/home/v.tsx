import { useEffect, useState } from "react";
import axios from "axios";
type Data = {
  username: string;
  specialid: string;
  data: {
    website: string;
    password: string;
  }[];
};
const C_V: React.FC = () => {
    const [showPassword, setShowPassword] = useState<null|number>(null);
    const tp = (index:number) => {
        if(showPassword===index) return setShowPassword(null); else setShowPassword(index);
      };
  const [data, setData] = useState<Data>({
    username: "",
    specialid: "",
    data: [],
  });
  useEffect(() => {
    const specialId = localStorage.getItem("specialId");
    if (specialId === null) return;
    axios
      .get(`/api/p?accessid=${specialId}`, {})
      .then((res) => {
        // console.log(res);
        return res.data;
      })
      .then((data) => {
        setData(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  }, []);

  const getRandomColor = () => {
    const colors = [
      "bg-gradient-to-br from-blue-500 to-blue-800",
      "bg-gradient-to-br from-green-500 to-green-800",
      "bg-gradient-to-br from-yellow-500 to-yellow-800",
      "bg-gradient-to-br from-red-500 to-red-800",
      "bg-gradient-to-br from-pink-500 to-pink-800",
      "bg-gradient-to-br from-purple-500 to-purple-800",
      "bg-gradient-to-br from-indigo-500 to-indigo-800",
    ];
    const random = Math.floor(Math.random() * colors.length);
    return colors[random];
  };

  return (
    <section>
      <div>
        <h1 className="text-end text-4xl font-bold font-sans pb-3 p-5">
          Your Passwords {data.data.length}
        </h1>
      </div>
      {data &&
        data.data.length > 0 &&
        data.data.map((z, i) => {
          return (
            <div
              key={i}
              className={`wrapper bg-gradient-to-br from-blue-900 to-blue-600 h-auto mt-10 mb-10 ml-3 rounded-md shadow-md w-auto hover:from-blue-600 hover:to-blue-900 p-3 ${z.website.length<15 ? "grid-cols-2": ""}  shadow-slate-200`}
            >
              <div className={`grid cursor-pointer `} onClick={(e)=>tp(i)}>
                <div>
                  <div className="relative"> <div className={`absolute top-0 w-12 h-12 ${getRandomColor()}  rounded-full flex items-center justify-center text-white font-bold text-2xl`}>
                    {data.username[0]}
                  </div></div>
                 
                </div>

                <div>
                  <div className={`flex justify-center whitespace-normal break-words`}>
                      {z.website}
                  </div>
                  <div className={`flex justify-center`}>
                    <h1 className={`text-2xl font-bold font-sans`}>
                      {showPassword === i ? z.password : "******************"}
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </section>
  );
};

export default C_V;
