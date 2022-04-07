import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import {getAllWaitingPosts, handleUpdatePostRequest } from "../apis";

function WaitingPost({ authReducer }) {
  const { token } = authReducer;
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listItems, setListItems] = useState([]);

  const loadSelfItems = useCallback(async () => {
    const { data } = await getAllWaitingPosts(token, currentPage);
    setListItems(data.data);
    setTotalPage(data.totalPage);
  }, [token, currentPage]);

  const handleProcess = async (id, status) => {
    await handleUpdatePostRequest(token, id, status)
    loadSelfItems();
  }

  useEffect(() => {
    loadSelfItems();
  }, [loadSelfItems]);

  return (
    <div className="w-full flex justify-center">
      <section className="bg-white py-20 lg:py-[120px]">
        <div className="container">
          <div className="flex flex-wrap -mx-4">
            <div className="w-full px-4">
              <div className="max-w-full overflow-x-auto">
                <table className="table-auto w-full">
                  <thead>
                    <tr className="bg-gray-500 text-center">
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             border-l border-transparent
                             "
                      >
                        Title
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             "
                      >
                        Address
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             "
                      >
                        Price
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             "
                      >
                        Pet Allow
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             "
                      >
                        People Allow
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             border-r border-transparent
                             "
                      >
                        People Limit
                      </th>
                      <th
                        className="
                             w-1/6
                             min-w-[160px]
                             text-lg
                             font-semibold
                             text-white
                             py-4
                             lg:py-7
                             px-3
                             lg:px-4
                             border-r border-transparent
                             "
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {listItems?.length > 0 &&
                      listItems.map((item, index) => (
                        <tr key={index}>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-l border-[#E8E8E8]
                             "
                          >
                            {item.title}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-white
                             border-b border-[#E8E8E8]
                             "
                          >
                            {item.address}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-[#E8E8E8]
                             "
                          >
                            {parseInt(item.price).toLocaleString("en-US")}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-white
                             border-b border-[#E8E8E8]
                             "
                          >
                            {item.petAllow}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-[#E8E8E8]
                             "
                          >
                            {item.peopleAllow}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-white
                             border-b border-r border-[#E8E8E8]
                             "
                          >
                            {item.personLimit}
                          </td>
                          <td
                            className="
                             text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-white
                             border-b border-r border-[#E8E8E8]
                             "
                          >
                            <button
                              onClick={() =>
                                handleProcess(item._id, "approved")
                              }
                              className={`bg-green-500 mb-2 text-white px-3 py-1 rounded-md`}
                            >
                              Approved
                            </button>
                            <button
                              onClick={() =>
                                handleProcess(item._id, "denied")
                              }
                              className="bg-red-500 text-white px-3 py-1 rounded-md"
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex w-full justify-center gap-2 my-3">
                  {[...Array(totalPage).keys()].map((number) => (
                    <span
                      key={number + 1}
                      className="font-medium px-2 py-1 border rounded-sm cursor-pointer"
                      onClick={() => setCurrentPage(number + 1)}
                    >
                      {number + 1}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(WaitingPost);
