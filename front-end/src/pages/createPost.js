import { useEffect, useState } from "react";
import {createPost, getAllCategories} from '../apis'
import { connect } from "react-redux";

function CreatePost({authReducer}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    address: "",
    price: "",
    petAllow: "Not Allow",
    peopleAllow: "Both",
    interior: "No Interior",
    personLimit: "Unlimit",
    categories: [],
  });
  const [categories, setCategories]= useState([]);

  const loadCategories = async () => {
      const {data, status} = await getAllCategories(authReducer.token);
      if(status === 200) {
          setCategories(data.data)
      }
  }

  useEffect(() => {
    loadCategories()
  }, [])
  return (
    <>
      <h2 className="text-center text-3xl font-bold">Create Your Post</h2>
      <form className="max-w-lg mx-auto my-10">
        <label htmlFor="title" className="block">
          <span className="text-gray-700 font-bold">Title:</span>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            className="form-input border rounded-md mt-1 block w-full"
            placeholder="Post Tittle"
          />
        </label>
        <label htmlFor="description" className="block">
          <span className="text-gray-700 font-bold">Description:</span>
          <textarea
            type="text"
            id="description"
            name="description"
            value={formData.description}
            rows={4}
            className="form-textarea border rounded-md mt-1 block w-full"
            placeholder="Description"
          ></textarea>
        </label>
        <label htmlFor="address" className="block">
          <span className="text-gray-700 font-bold">Address:</span>
          <input
            type="text"
            id="address"
            value={formData.address}
            name="address"
            className="form-input border rounded-md mt-1 block w-full"
            placeholder="Address"
          />
        </label>
        <label htmlFor="price" className="block">
          <span className="text-gray-700 font-bold">Price:</span>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            className="form-input border rounded-md mt-1 block w-full"
            placeholder="Price (VND)"
          />
        </label>
        <div className="block">
          <span className="text-gray-700 font-bold">Pet Allowment:</span>
          <div className="mt-2 flex justify-evenly">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="petAllow"
                  value="Allow"
                  defaultChecked={formData.petAllow === "Allow"}
                />
                <span className="ml-2">Allow</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="petAllow"
                  value="Not Allow"
                  defaultChecked={formData.petAllow === "Not Allow"}
                />
                <span className="ml-2">Not Allow</span>
              </label>
            </div>
          </div>
        </div>
        <div className="block">
          <span className="text-gray-700 font-bold">People Allowment:</span>
          <div className="mt-2 flex justify-evenly">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="peopleAllow"
                  value="Male"
                  defaultChecked={formData.peopleAllow === "Male"}
                />
                <span className="ml-2">Male</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="peopleAllow"
                  value="Female"
                  defaultChecked={formData.peopleAllow === "Female"}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="peopleAllow"
                  value="Both"
                  defaultChecked={formData.peopleAllow === "Both"}
                />
                <span className="ml-2">Both</span>
              </label>
            </div>
          </div>
        </div>
        <div className="block">
          <span className="text-gray-700 font-bold">Interior:</span>
          <div className="mt-2 flex justify-evenly">
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="interior"
                  value="Full Interior"
                  defaultChecked={formData.interior === "Full Interior"}
                />
                <span className="ml-2">Full Interior</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  type="radio"
                  className="border form-radio"
                  name="interior"
                  value="No Interior"
                  defaultChecked={formData.interior === "No Interior"}
                />
                <span className="ml-2">No Interior</span>
              </label>
            </div>
          </div>
        </div>
        <label htmlFor="personLimit" className="block">
          <span className="text-gray-700 font-bold">Person Limiting:</span>
          <select
            value={formData.personLimit}
            name="personLimit"
            id="personLimit"
            className="form-select border rounded-md mt-1 block w-full"
          >
            <option value="1-2 people">1-2 people/room</option>
            <option value="2-4 people">2-4 people/room</option>
            <option value="4-6 people">4-6 people/room</option>
            <option value="Unlimit">Unlimit</option>
          </select>
        </label>
        <label htmlFor="categories" className="block">
          <span className="text-gray-700 font-bold">Categories:</span>
          <select
            multiple
            name="categories"
            id="categories"
            className="form-multiselect border rounded-md mt-1 block w-full"
          >
            {categories.map((item, index) => <option key={index} value={item.name}>{item.name}</option>)}
          </select>
        </label>
        <div className="mt-2 flex justify-center">
          <button className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white">
            Create
          </button>
        </div>
      </form>
    </>
  );
}

const mapStateToProps = (state) => {
    return {
      authReducer: state.authReducer,
    };
  };

export default connect(mapStateToProps)(CreatePost);