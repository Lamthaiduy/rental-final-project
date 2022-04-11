import { useCallback, useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllPosts, getAllCategories } from "../apis/";

function Home({ authReducer }) {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [totalPage, setTotalPage] = useState(0);
  const [filter, setFilter] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");

  const { token } = authReducer;

  const loadCategories = useCallback(async () => {
    const { data } = await getAllCategories(token);
    setCategories(data.data);
  }, [token]);

  const navigate = useNavigate();

  const handleCheckedFilter = (e) => {
    setCurrentPage(1);
    if (filter.includes(e.target.value)) {
      const newState = filter.filter((item) => item !== e.target.value);
      setFilter(newState);
    } else {
      setFilter((prevState) => [...prevState, e.target.value]);
    }
  };

  const handleSearch = async () => {
    const { data } = await getAllPosts(token, currentPage, filter, search);
    setPosts(data.data);
    setTotalPage(data.totalPage);
  };

  const loadPost = useCallback(async () => {
    const { data } = await getAllPosts(token, currentPage, filter, search);
    setPosts(data.data);
    setTotalPage(data.totalPage);
  }, [token, currentPage, filter]);

  useEffect(() => {
    loadCategories();
    loadPost();
  }, [loadCategories, loadPost]);

  

  return (
    <div className="bg-white">
      <div>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              All Home
            </h1>
            <div className="flex gap-2">
              <input
                type="text"
                name="search"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                placeholder="Search by Address"
                className="outline-none border px-2 py-1 border-gray-400 rounded-sm"
              />
              <button
                onClick={handleSearch}
                className="px-3 py-1 rounded-sm bg-blue-500 text-white"
              >
                Search
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pt-6 pb-24">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
              {/* <!-- Filters --> */}
              <form className="hidden lg:block">
                <div className="border-b border-gray-200 py-6">
                  <h3 className="-my-3 flow-root">
                    {/* <!-- Expand/collapse section button --> */}
                    <button
                      type="button"
                      className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                      aria-controls="filter-section-0"
                      aria-expanded="false"
                    >
                      <span className="font-medium text-gray-900">
                        {" "}
                        Categories{" "}
                      </span>
                    </button>
                  </h3>
                  {categories?.length > 0 &&
                    categories.map((category, index) => (
                      <div key={index} className="pt-6" id="filter-section-0">
                        <div className="space-y-4">
                          <div className="flex items-center">
                            <input
                              id="filter-color-0"
                              name="categories"
                              type="checkbox"
                              value={category._id}
                              onChange={handleCheckedFilter}
                              className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor="filter-color-0"
                              className="ml-3 text-sm text-gray-600"
                            >
                              {category.name}
                            </label>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </form>

              <div className="lg:col-span-3">
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
                <div className="w-full h-[700px] overflow-auto p-10">
                  {posts.map((item) => (
                    <div
                      className="bg-gray-200 p-10 rounded-md relative mb-4"
                      key={item._id}
                    >
                      <h5 className="font-bold my-2 text-2xl">{item.title}</h5>
                      <p className="w-full my-2">
                        <span className="font-medium">Short Description:</span>{" "}
                        {item.description}
                      </p>
                      <span className="font-medium">Categories:</span>
                      <div className="my-2 flex gap-3">
                        {item.categories.map((item) => (
                          <span
                            className="rounded-md border bg-violet-500 text-white font-medium py-1 px-3"
                            key={item._id}
                          >
                            {item.name}
                          </span>
                        ))}
                      </div>
                      <span>
                        <span className="font-medium">Price:</span>{" "}
                        {parseInt(item.price).toLocaleString("en-US")} VND
                      </span>
                      <div>
                        <span className="font-medium">Address:</span>{" "}
                        {item.address}
                      </div>
                      <div className="my-2">
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`${
                            item.status === "Rented"
                              ? "bg-red-500"
                              : item.status === "Deposited"
                              ? "bg-yellow-500"
                              : "bg-green-500"
                          } text-white font-medium py-1 px-3 rounded-md`}
                        >
                          {item.status}
                        </span>
                      </div>
                      <div className="my-2">
                        <span className="font-medium">Pet Allow:</span>{" "}
                        <span>{item.petAllow}</span>
                      </div>
                      <div className="my-2">
                        <span className="font-medium">People Allow:</span>{" "}
                        <span>{item.peopleAllow}</span>
                      </div>
                      <div className="my-2">
                        <span className="font-medium">Interior Status:</span>{" "}
                        <span>{item.interior}</span>
                      </div>
                      <div className="my-2">
                        <span className="font-medium">Person Limit:</span>{" "}
                        <span>{item.personLimit}</span>
                      </div>
                      <div className="my-2">
                        <span className="font-medium">Posted By:</span>{" "}
                        <span>{item.seller.fullname}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 my-2">
                        {item.imageLink.map((image, index) => (
                          <img
                            className="w-auto h-auto"
                            key={index}
                            alt={index}
                            src={image}
                          />
                        ))}
                      </div>
                      {item.status === "Unrented" && (
                        <button onClick={() => navigate(`/deposit/${item._id}`)} className="my-2 font-medium bg-blue-400 rounded-sm px-3 py-1 text-white absolute right-2 bottom-0">
                          Rent This
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
  };
};

export default connect(mapStateToProps)(Home);
