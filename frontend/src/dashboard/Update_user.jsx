import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const Update_user = () => {
  const { id } = useParams();

  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [education, setEducation] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [userImage, setUserImage] = useState("");
  const [userImagePreview, setUserImagePreview] = useState("");
  const [loading, setLoading] = useState(false);

  const changePhotoHandler = (e) => {
    try {
      const file = e.target.files[0];
      const fileReader = new FileReader();

      fileReader.readAsDataURL(file);
      fileReader.onload = () => {
        setUserImagePreview(fileReader.result);
        setUserImage(file);
      };
    } catch (error) {
      console.log(error);
    }
  };

  //fetch old data by id and put into fields automatically
  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(
        `http://localhost:4500/user/my-profile`,
        {
          withCredentials: true,
        }
      );
      setName(data?.user_data?.name);
      setRole(data?.user_data?.role);
      setEmail(data?.user_data?.email);
      setPhone(data?.user_data?.phone);
      setEducation(data?.user_data?.education);

      setUserImage(data?.user_data?.image?.url);
      setUserImagePreview(data?.user_data?.image?.url);
    };
    fetchData();
  }, []);

  //Submit new data to database
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const new_data = new FormData();

    new_data.append("name", name);
    new_data.append("role", role);
    new_data.append("phone", phone);
    new_data.append("email",email);
    new_data.append("image", userImage);
    new_data.append("education", education);

    try {
      const { data } = await axios.put(
        `http://localhost:4500/user/updateuser/${id}`,
        new_data,
        {
          withCredentials: true,
        }
      );
      toast.success("Details Saved Successfully");
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  return (
    <div>
      <div className="md:min-h-screen ">
        <div className="max-w-xl mx-auto  p-6 border mb-8  rounded-lg shadow-2xl">
          <h3 className="text-2xl font-semibold text-center mb-4">
            Update Profile
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="w-full  flex">
              <div
                className={`${
                  userImagePreview ? "w-1/2" : "w-full"
                } space-y-4  py-1 pr-4 pl-0`}
              >
                <div className="space-y-2">
                  <select
                    value={role}
                    required
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-1 py-1 border border-gray-400 rounded-md outline-none"
                  >
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="user">User</option>
                  </select>
                </div>

                <div className="space-y-2">
                
                  <select
                    value={education}
                    required
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full px-1 py-1 border border-gray-400 rounded-md outline-none"
                  >
                    <option value="">Your Education</option>
                    <option value="bca">BCA</option>
                    <option value="bsc">B.Sc.</option>
                    <option value="ba">BA</option>
                    <option value="mca"> MCA</option>
                    <option value="ma">MA</option>
                    <option value="msc">M.Sc.</option>
                  </select>
                </div>

                <div className="space-y-2 ">
                  {/* <label className="block text-lg">Upload Image </label> */}

                  <input
                    type="file" 
                    onChange={changePhotoHandler}
                    className="w-full px-1 py-1 border border-gray-400   rounded-md outline-none"
                  />
                </div>
              </div>

              <div className=" w-1/2 ">
                <div
                  className={`flex ${
                    userImagePreview ? "flex" : "hidden"
                  }  border-l items-start overflow-hidden justify-end md:justify-center`}
                >
                  <img
                    src={
                      userImagePreview ? `${userImagePreview}` : "/imgPL.webp"
                    }
                    alt="Image"
                    className="h-32 w-32 p-0.5  border-2 border-orange-700 overflow-hidden max-w-sm rounded-full object-cover"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {/* <label className="block text-lg">name</label> */}
              <input
                type="text"
                placeholder="Enter your user name"
                value={name}
                required
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <div className="space-y-2">
           
              <input
                type="text"
                readOnly
                placeholder="Enter your user name"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-400   rounded-md outline-none"
              />
            </div>
            <div className="space-y-2">
              
              <input
                type="text"
                placeholder="Enter your user name"
                value={phone}
                required
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-400   rounded-md outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-green-600 mt-2 text-white py-2 hover:tracking-widest duration-300 rounded-md tracking-wider hover:bg-green-700"
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-2">
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
                  <span>Applying...</span>
                </div>
              ) : (
                " Apply Changes"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update_user;
