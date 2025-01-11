import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-hot-toast';

function CreateBlog() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [loading,setLoading]=useState(false)

  const [blogImage, setBlogImage] = useState("");
  const [blogImagePreview, setBlogImagePreview] = useState("");

  const changePhotoHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setBlogImagePreview(reader.result);
      setBlogImage(file);
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const blog_data=new FormData();
    blog_data.append("tittle",title);
    blog_data.append("category",category);
    blog_data.append("about",description);
    blog_data.append("blogImage",blogImage);

    try {
      const {data}=await axios.post(`${import.meta.env.VITE_BACKEND_URL}/blog/create`,blog_data,{

        withCredentials:true,
        header:{
          "Content-Type":"multipart/form-data",
        },
      });

        toast.success("Blog Created");

       setBlogImage("");
       setTitle("");
       setCategory("");
       setDescription("");
       setBlogImagePreview("");
      setLoading(false);

    } catch (error) {
      // //console.log(error);
      const message=error?.response?.data?.message;
      if(message){
        // ////console.log(message);
        toast.error(message);
        setLoading(false);
      }
    }
  }

  return (
    <div>
      <div className="min-h-screen ">
        <div className="max-w-xl mx-auto  p-6 border  rounded-lg shadow-2xl">
          <h3 className="text-2xl font-semibold text-center mb-4">Create Blog</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="block text-lg">Title</label>
              <input
                type="text"
                placeholder="Enter your blog title"
                value={title}
                //required
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-1.5 focus:bg-slate-100 border border-gray-400   rounded-md outline-none"
              />
            </div>
            
            <div className='w-full  py-2 space-y-2 flex'>
              <div className={`${blogImagePreview?'w-1/2':"w-full"} space-y-4  py-1 pr-4 pl-0`}>

                <div className="space-y-2">
                  <label className="block text-lg">Category </label>
                  <select
                    value={category}
                    //required
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-1 py-1 focus:bg-slate-50 border border-gray-400 rounded-md outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="devotional">Devotional</option>
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
                    //required
                    onChange={changePhotoHandler}
                    className="w-full px-1 py-1 focus:bg-slate-50 border border-gray-400   rounded-md outline-none"
                  />
                </div>
              </div>
              
              <div className=' w-1/2 '>
                <div className={`flex ${blogImagePreview?"flex":"hidden"}  border-l border-slate-500 items-center  h-40 overflow-hidden justify-center`}>
                  <img
                    src={blogImagePreview ? `${blogImagePreview}` : "/imgPL.webp"}
                    alt="Image"
                    className="w-40 md:w-52  lg:w-56  max-w-sm rounded-md object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="block text-lg">description</label>
              <textarea
                rows="4"
                placeholder="Write something description your blog"
                value={description}
                //required
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 focus:bg-slate-200 border border-gray-400  rounded-md outline-none"
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

export default CreateBlog
