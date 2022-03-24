import { useEffect, useState, useCallback } from "react";
import { connect } from "react-redux";
import { getProfile, updateProfile } from "../apis";
import axios from 'axios'
import avatar from "../assets/avatar.png";
import uploadHolder from '../assets/upload-holder.png'
import { updateProfileSuccess } from "../reducers/action/authAction";

const ProfilePage = ({ authReducer, updateProfileAction }) => {
  const [profile, setProfile] = useState({});

  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [edit, setEdit] = useState(false);

  const [upload, setUpload] = useState(false)

  const loadProfile = useCallback(async () => {
    const response = await getProfile(authReducer.token);
    setProfile(response.data.user);
  }, [authReducer.token]);

  const toggleUploadAvt = () => {
      setFile(null);
      setPreview(null);
      setUpload(prev => !prev);
  }

  const toggleEdit = () => {
      setEdit(prev => !prev);
  }

  const handleUpload = (e) => {
    const file = e.target.files[0];
    const objUrl = URL.createObjectURL(file);
    setFile(file);
    setPreview(objUrl);
  }

  const saveAvt = async (e) => {
        e.preventDefault();
        const uploadUrl = `https://api.cloudinary.com/v1_1/dxmtknmum/upload`;
        const bodyData = new FormData();
        bodyData.append('file', file);
        bodyData.append('api_key', "684535498932256")
        bodyData.append('upload_preset', "image_upload")
        const request = await axios.post(uploadUrl, bodyData);
        const {status} = await updateProfile(authReducer.token, {avatar: request.data.url});
        if(status === 200) {
            updateProfileAction({avatar: request.data.url});
            setProfile({...profile, avatar: request.data.url});
        }
        toggleUploadAvt();

  }

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  return (
    <div className="container mx-auto my-5 p-5">
      <div className="md:flex no-wrap md:-mx-2 ">
        <div className="w-full md:w-3/12 md:mx-2">
          <div className="bg-white p-3 border-t-4 border-gray-400">
            <div className="flex justify-center flex-col gap-2 items-center">
            <div className="image overflow-hidden">
              {!upload ? <img
            className="h-auto w-full mx-auto border-gray-400"
            src={profile?.avatar || avatar}
            alt=""
          /> : (preview ?  <img
              className="h-auto w-full mx-auto border-gray-400"
              src={preview}
              alt=""
            /> : 
            <>
                <label htmlFor="upload">
                    <img
                    className="h-[300px] w-full mx-auto border-gray-400"
                    src={uploadHolder}
                    alt=""
                />
                <input type="file" id="upload" name="file" onChange={handleUpload} className="hidden" />
                </label>
              </> )}
            </div>
           {upload ? (<div className="flex gap-5">
            <button className="w-fit block bg-green-500 px-3 py-2 rounded-md text-white" onClick={saveAvt}>Save</button>
            <button className="w-fit block bg-red-500 px-3 py-2 rounded-md text-white" onClick={toggleUploadAvt}>Cancel</button>
           </div>):  <button className="w-fit block bg-blue-500 px-3 py-2 rounded-md text-white" onClick={toggleUploadAvt}>Edit Avatar</button>}
            </div>
            <h1 className="text-gray-900 font-bold text-xl leading-8 my-1">
              {profile.fullname}
            </h1>
            <h3 className="text-gray-600 font-lg text-semibold leading-6">
              {profile.username}
            </h3>
            <ul className="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
              <li className="flex items-center py-3">
                <span>Status</span>
                <span className="ml-auto">
                  <span className="bg-green-500 py-1 px-2 rounded text-white text-sm">
                    {profile.status === "approved" ? "Active" : "Pending"}
                  </span>
                </span>
              </li>
              <li className="flex items-center py-3">
                <span>Role</span>
                <span className="ml-auto">{profile.role}</span>
              </li>
            </ul>
          </div>
          <div className="my-4"></div>
        </div>
        <div className="w-full md:w-9/12 mx-2 h-64">
          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
              <span clas="text-green-500">
                <svg
                  className="h-5"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </span>
              <span className="tracking-wide">About</span>
            </div>
            <div className="text-gray-700">
              <div className="grid md:grid-cols-2 text-sm">
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Full Name</div>
                  <div className="px-4 py-2">{profile.fullname}</div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Gender</div>
                  <div className="px-4 py-2">
                    {profile?.gender || "Not Yet"}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Contact No.</div>
                  <div className="px-4 py-2">
                    {profile?.contact || "Not Yet"}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Address</div>
                  <div className="px-4 py-2">
                    {profile?.address || "Not Yet"}
                  </div>
                </div>
                <div className="grid grid-cols-2">
                  <div className="px-4 py-2 font-semibold">Birthday</div>
                  <div className="px-4 py-2">
                    {profile?.birthday || "Not Yet"}
                  </div>
                </div>
              </div>
            </div>
            <button className="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">
              Edit
            </button>
          </div>

          <div className="my-4"></div>

          <div className="bg-white p-3 shadow-sm rounded-sm">
            <div className="grid grid-cols-2">
              <div>
                <div className="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3">
                  <span clas="text-green-500">
                    <svg
                      className="h-5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path
                        fill="#fff"
                        d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </span>
                  <span className="tracking-wide">Bank Connected</span>
                </div>
                <ul className="list-inside space-y-2">
                  {profile?.wallets?.map((item, index) => (
                    <li key={index}>
                      <div className="text-teal-600">
                        Masters Degree in Oxford
                      </div>
                      <div className="text-gray-500 text-xs">
                        March 2020 - Now
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

const mapDispatchToProps = (dispatch) => {
    return {
        updateProfileAction: (data) => dispatch(updateProfileSuccess(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
