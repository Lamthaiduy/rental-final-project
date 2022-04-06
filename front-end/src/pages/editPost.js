import { connect } from "react-redux"
import {useState, useCallback, useEffect} from 'react'
import {updatePost, getDetailPost} from '../apis'
import {toast} from 'react-toastify'
import {useNavigate, useParams} from 'react-router-dom'

const EditPost = ({authReducer}) => {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        price: "",
        petAllow: "Not Allow",
        peopleAllow: "Both",
        interior: "No Interior",
        personLimit: "Unlimit",
      });

      const navigate = useNavigate();
      const {postId} = useParams();
    
      const [errors, setErrors] = useState({
        title: "",
        description: "",
        address: "",
        price: "",
        categories: "",
        imageLink: ""
      })
    
      const handleTextChange = (e) => {
        if(e.target.value === '') {
          setErrors({...errors, [e.target.name]: `${e.target.name} cannot be empty!`})
        }
        else {
          setErrors({...errors, [e.target.name]: ''})
        }
        setFormData({...formData, [e.target.name]: e.target.value})
    
      }
    
      const handlePrice = (e) => {
        if(e.target.value < 0) {
          setErrors({...errors, price: `Price must me greater than 0!`})
        }
        else {
          setErrors({...errors, price: ""})
        }
        setFormData({...formData, price: e.target.value})
      }
      
    const loadDetail = useCallback(async () => {
        const {data} = await getDetailPost(authReducer.token, postId);
        setFormData(prev => ({...prev, ...data.data}));
    }, [authReducer.token, postId])

      useEffect(() => {
        loadDetail()
      }, [loadDetail])
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.title === '') {
          setErrors({...errors, title: 'Title cannot be empty!'});
          return;
        }
        if(formData.description === '') {
          setErrors({...errors, description: 'Description cannot be empty!'});
          return;
        }
        if(formData.address === '') {
          setErrors({...errors, address: 'Address cannot be empty!'});
          return;
        }
        if(formData.price === '') {
          setErrors({...errors, price: 'Price cannot be empty!'});
          return;
        }
        if(formData.categories.length === 0) {
          setErrors({...errors, categories: 'Categories must be choose!'});
          return;
        }
        const {data, status} = await updatePost(authReducer.token,postId, formData);
        if(status === 202) {
          toast.success("Update Success")
            navigate('/list')
        }
      }
      return (
        <>
          <h2 className="text-center text-3xl font-bold">Edit Post: {formData.title}</h2>
          <form className="max-w-lg mx-auto my-10">
            <label htmlFor="title" className="block">
              <span className="text-gray-700 font-bold">Title:</span>
              <input
                type="text"
                id="title"
                name="title"
                onChange={handleTextChange}
                value={formData.title}
                className="form-input border rounded-md mt-1 block w-full"
                placeholder="Post Tittle"
              />
            </label>
            {errors.title && <span className="text-red-500 font-semibold block my-2">{errors.title}</span>}
            <label htmlFor="description" className="block">
              <span className="text-gray-700 font-bold">Description:</span>
              <textarea
                type="text"
                id="description"
                name="description"
                value={formData.description}
                rows={4}
                onChange={handleTextChange}
                className="form-textarea border rounded-md mt-1 block w-full"
                placeholder="Description"
              ></textarea>
            </label>
            {errors.description && <span className="text-red-500 font-semibold block my-2">{errors.description}</span>}
            <label htmlFor="address" className="block">
              <span className="text-gray-700 font-bold">Address:</span>
              <input
                type="text"
                id="address"
                value={formData.address}
                onChange={handleTextChange}
                name="address"
                className="form-input border rounded-md mt-1 block w-full"
                placeholder="Address"
              />
            </label>
            {errors.address && <span className="text-red-500 font-semibold block my-2">{errors.address}</span>}
            <label htmlFor="price" className="block">
              <span className="text-gray-700 font-bold">Price:</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handlePrice}
                className="form-input border rounded-md mt-1 block w-full"
                placeholder="Price (VND)"
              />
            </label>
            {errors.price && <span className="text-red-500 font-semibold block my-2">{errors.price}</span>}
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
                      onChange={handleTextChange}
                      checked={formData.petAllow === "Allow"}
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
                      onChange={handleTextChange}
                      value="Not Allow"
                      checked={formData.petAllow === "Not Allow"}
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
                      onChange={handleTextChange}
                      name="peopleAllow"
                      value="Male"
                      checked={formData.peopleAllow === "Male"}
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
                      onChange={handleTextChange}
                      checked={formData.peopleAllow === "Female"}
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
                      onChange={handleTextChange}
    
                      checked={formData.peopleAllow === "Both"}
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
                      onChange={handleTextChange}
    
                      value="Full Interior"
                      checked={formData.interior === "Full Interior"}
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
                      onChange={handleTextChange}
    
                      value="No Interior"
                      checked={formData.interior === "No Interior"}
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
                onChange={handleTextChange}
                className="form-select border rounded-md mt-1 block w-full"
              >
                <option value="1-2 people">1-2 people/room</option>
                <option value="2-4 people">2-4 people/room</option>
                <option value="4-6 people">4-6 people/room</option>
                <option value="Unlimit">Unlimit</option>
              </select>
            </label>
            <div className="mt-2 flex justify-center">
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white">
            Save Changes
          </button>
        </div>
          </form>
        </>
      );
}

const mapStateToProps = (state) => {
    return {
        authReducer: state.authReducer
    }
}


export default connect(mapStateToProps)(EditPost);