import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { getAllSellerPayment } from "../apis";

function TransactionHistory({ authReducer }) {
  const { token } = authReducer;
  const [totalPage, setTotalPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [listItems, setListItems] = useState([]);


  const loadSelfItems = useCallback(async () => {
    const { data } = await getAllSellerPayment(token, currentPage);
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
                        Home
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
                        Paid By
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
                        Receive At
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
                        Total Receive
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
                            {item?.fromDeposit?.target?.title}
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
                            {item?.fromDeposit?.user?.fullname}
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
                              className={`font-medium py-1 px-3 rounded-md`}
                            >
                              {item?.createdAt.slice(0, 10)}
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
                            {parseInt(item?.totalReceive).toLocaleString('en-US')} VND
                          </td>
                        </tr>
                      ))}
                      <tr>
                          <td className="text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-[#E8E8E8]">
                          </td>
                          <td className="text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-[#E8E8E8]">
                                 Total:
                          </td>
                          <td className="text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-[#F3F6FF]
                             border-b border-[#E8E8E8]">
                          </td>
                          <td colSpa={3} className="text-center text-dark
                             font-medium
                             text-base
                             py-5
                             px-2
                             bg-white
                             border-b border-[#E8E8E8]">
                          {listItems.reduce((sum, item) => sum += parseInt(item?.totalReceive), 0).toLocaleString('en-US')} VND
                          </td>
                      </tr>
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

export default connect(mapStateToProps)(TransactionHistory);
