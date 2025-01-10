import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const Update_Blog = () => {

  const {id}=useParams();

    const [title,setTitle]=useState("");
    const [category,setCategory]=useState("");
    const [description,setDescription]=useState("");
    const [blogImage,setBlogImage]=useState("");
    const [blogImagePreview,setBlogImagePreview]=useState("");
    const [loading,setLoading]=useState(false);

    const changePhotoHandler = (e) => {
      try {
        
        const file = e.target.files[0];
        const fileReader = new FileReader();

        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            setBlogImagePreview(fileReader.result);
            setBlogImage(file);
        };
      } catch (error) {
        console.log(error);
        
      }
    };
   
    //fetch old data by id and put into fields automatically
    useEffect(()=>{

      const fetchData= async ()=>{
          const {data}=await axios.get(`${import.meta.env.VITE_BACKEND_URL}/blog/singleblog/${id}`,{
            withCredentials:true,
          })
          setTitle(data?.find_blog?.tittle);
          setCategory(data?.find_blog?.category);
          setDescription(data?.find_blog?.about);
          setBlogImage(data?.find_blog?.blogImage?.url);
          setBlogImagePreview(data?.find_blog?.blogImage?.url);
      }
      fetchData();

    },[])

    //Submit new data to database
    const handleSubmit=async (e)=>{
        e.preventDefault();
        setLoading(true);

        const new_data=new FormData();

        new_data.append("tittle",title);
        new_data.append("category",category);
        new_data.append("blogImage",blogImage);
        new_data.append("about",description);

          try {
            const {data}=await axios.put(`${import.meta.env.VITE_BACKEND_URL}/blog/updateblog/${id}`,new_data,{
              withCredentials:true,
            })
            toast.success("Blog Updated Successfully") ;
            setLoading(false);
          } catch (error) {
            console.log(error);
            setLoading(false);
            toast.error(error?.response?.data?.message);
          }

    }


  return (
    <div>
      <div className="md:min-h-screen ">
        <div className="max-w-xl mx-auto  p-6 border mb-8  rounded-lg shadow-2xl">
          <h3 className="text-2xl font-semibold text-center mb-4">Update Blog</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className='w-full  py-2 space-y-2 flex'>
              <div className={`${blogImagePreview?'w-1/2':"w-full"} space-y-4  py-1 pr-4 pl-0`}>

                <div className="space-y-2">
                  <label className="block text-lg">Category </label>
                  <select
                    value={category}
                    required
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-1 py-1 border border-gray-400 rounded-md outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="Devotion">Devotion</option>
                    <option value="Sports">Sports</option>
                    <option value="Coding">Coding</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Business">Business</option>
                  </select>
                </div>



                <div className="space-y-2 ">
                  <label className="block text-lg">Upload Image </label>

                  <input
                    type="file"
                    onChange={changePhotoHandler}
                    className="w-full px-1 py-1 border border-gray-400   rounded-md outline-none"
                  />
                </div>
              </div>
              
              <div className=' w-1/2 '>
                <div className={`flex ${blogImagePreview?"flex":"hidden"}  border-l border-slate-500 items-center  h-full overflow-hidden justify-center`}>
                  <img
                    src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
                    alt="Image"
                    className="w-40 md:w-52 lg:w-56  max-w-sm rounded-md object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">description</label>
              <textarea
                rows="6"
                placeholder="Write something description your blog"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2  border border-gray-400  rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 mt-2 text-white py-2 hover:tracking-widest duration-300 rounded-md tracking-wider hover:bg-green-700"
            >
             {loading?
             ( <div className="flex justify-center items-center space-x-2">
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 2.28.805 4.373 2.143 6.027l1.857-1.736z"
                ></path>
              </svg>
              <span>Posting...</span>
            </div>)
             :(" Post Blog")}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update_Blog