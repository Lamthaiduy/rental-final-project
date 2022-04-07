import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getPersonalDeposit, updateDepositStatus } from "../apis";

function DepositHistory({ authReducer }) {
  const { token } = authReducer;
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listItems, setListItems] = useState([]);

  const handleUpdateStatus = async (id, status) => {
    await updateDepositStatus(token, id, status)
    loadSelfItems();
  };

  const loadSelfItems = useCallback(async () => {
    const { data } = await getPersonalDeposit(token, currentPage);
    setListItems(data.data);
    setTotalPage(data.totalPage);
  }, [token, currentPage]);

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
                        Transaction ID
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
                        Total Deposit
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
                        Deposit Status
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
                        Home Title
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
                        Seller
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
                        Total Price
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
                            {item.orderId}
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
                            {parseInt(item.totalDeposit).toLocaleString('en-US')} VND
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
                            <span
                              className={`${
                                item.status === "In Deposit"
                                  ? "bg-violet-500"
                                  : item.status === "Refund Request"
                                  ? "bg-gray-500"
                                  : "bg-green-500"
                              } text-white font-medium py-1 px-3 rounded-md`}
                            >
                              {item.status}
                            </span>
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
                            {item.target.title}
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
                            {item.target.seller.fullname}
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
                            {parseInt(item.target.price).toLocaleString("en-US")} VND
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
                             flex
                             justify-center
                             gap-2
                             "
                          >
                            <button
                              onClick={() => handleUpdateStatus(item._id, 'Refund Request')}
                              className={`bg-blue-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md`}
                              disabled={item.status !== 'In Deposit'}
                            >
                              Refund Request
                            </button>
                            <button
                              onClick={() => handleUpdateStatus(item._id, 'Paid')}
                              className="bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed text-white px-3 py-1 rounded-md"
                              disabled={item.status !== 'In Deposit'}
                            >
                                Rented
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

export default connect(mapStateToProps)(DepositHistory);
