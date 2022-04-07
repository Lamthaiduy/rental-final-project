import { connect } from "react-redux";
import { handlePayment, getDetailPost } from "../apis";
import { useState, useCallback, useEffect } from "react";
import {  useParams } from "react-router-dom";
function DepositPage({ authReducer }) {
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

  const [url, setUrl] = useState();

  const { postId } = useParams();

  const loadDetail = useCallback(async () => {
    const { data } = await getDetailPost(authReducer.token, postId);
    setFormData((prev) => ({ ...prev, ...data.data }));
    const amount = Math.floor(parseInt(data.data.price) * 0.3);
    const response = await handlePayment(authReducer.token, {amount: amount, postId});
    setUrl(response.data.url);
  }, [authReducer.token, postId]);

  useEffect(() => {
    loadDetail();
  }, [loadDetail]);
  return (
    <>
      <h2 className="text-center text-3xl font-bold">
        Confirm Before Make Deposit
      </h2>
      <form className="max-w-lg mx-auto my-10">
        <label htmlFor="title" className="block">
          <span className="text-gray-700 font-bold">Title:</span>
          <input
            disabled
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
            disabled
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
            disabled
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
            disabled
            type="text"
            id="price"
            name="price"
            value={`${Math.floor(parseInt(formData.price) * 0.3).toLocaleString('en-US')} VND (30% Price)`}
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
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="petAllow"
                  value="Allow"
                  checked={formData.petAllow === "Allow"}
                />
                <span className="ml-2">Allow</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="petAllow"
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
                  disabled
                  type="radio"
                  className="border form-radio"
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
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="peopleAllow"
                  value="Female"
                  checked={formData.peopleAllow === "Female"}
                />
                <span className="ml-2">Female</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="peopleAllow"
                  value="Both"
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
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="interior"
                  value="Full Interior"
                  checked={formData.interior === "Full Interior"}
                />
                <span className="ml-2">Full Interior</span>
              </label>
            </div>
            <div>
              <label className="inline-flex items-center">
                <input
                  disabled
                  type="radio"
                  className="border form-radio"
                  name="interior"
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
            disabled
            className="form-select border rounded-md mt-1 block w-full"
          >
            <option value="1-2 people">1-2 people/room</option>
            <option value="2-4 people">2-4 people/room</option>
            <option value="4-6 people">4-6 people/room</option>
            <option value="Unlimit">Unlimit</option>
          </select>
        </label>
        <div className="mt-2 flex justify-center">
          <a href={url} className="px-4 py-2 bg-blue-500 hover:bg-blue-700 rounded-md text-white">
            Make Payment
          </a>
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

export default connect(mapStateToProps)(DepositPage);
