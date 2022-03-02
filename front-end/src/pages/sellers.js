import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllUserInRole } from "../apis";
import roles from "../constants/roles";

function Sellers({ authReducer }) {
  const [pages, setPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [sellers, setSellers] = useState([]);
  const { token } = authReducer;

  const loadSellers = useCallback(
    async function () {
      try {
        const { data, status } = await getAllUserInRole(
          token,
          roles.SELLER,
          currentPage
        );
        if (status === 200) {
          setPages(data.pages);
          setSellers(data.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [currentPage, token]
  );

  useEffect(() => {
    loadSellers();
  }, [loadSellers]);

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
                        Seller Id
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
                        Username
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
                        role
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
                        Full Name
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
                        Status
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
                    {sellers.map((seller, index) => (
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
                          {seller._id}
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
                          {seller.username}
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
                          {seller.role}
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
                          {seller.fullname}
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
                          {seller.status}
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
                          {seller.status === "pending" && (
                            <>
                              {" "}
                              <button className="bg-green-500 hover:bg-green-700 text-white px-5 py-3 mb-2 rounded-md">
                                Approve
                              </button>
                              <button className="bg-red-500 hover:bg-red-700 text-white px-5 py-3 rounded-md">
                                Reject
                              </button>
                            </>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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

export default connect(mapStateToProps)(Sellers);
