import { useCallback, useEffect } from "react";
import { connect } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {useSearchParams} from 'react-router-dom'
import {searchExistedDeposit, handleDepositSuccess} from '../apis/'
import {toast} from 'react-toastify'

function Success({authReducer}) {
  const [searchParams] = useSearchParams();
  const totalDeposit = parseInt(searchParams.get('vnp_Amount')) / 100;
  const postId = searchParams.get('vnp_OrderInfo');
  const orderId = searchParams.get('vnp_TxnRef');
  const vnp_ResponseCode = searchParams.get('vnp_ResponseCode')
  const navigate = useNavigate();

  const checkAndCreateDeposit = useCallback(async () => {
    if(vnp_ResponseCode === '00') {
      const {status} = await searchExistedDeposit(authReducer.token, {postId, totalDeposit});
      if(status === 200) {
        await handleDepositSuccess(authReducer.token, {postId, totalDeposit, orderId})
      }
      else {
        toast.warning("This request had been processed")
        navigate('/home');
      }
    }
  }, [authReducer.token, postId, totalDeposit, vnp_ResponseCode, navigate, orderId])

  useEffect(() => {checkAndCreateDeposit()} , [checkAndCreateDeposit])

    return (
        <div
  class={`
    flex
    items-center
    justify-center
    w-screen
    h-screen
    ${vnp_ResponseCode === '00' ? "bg-gradient-to-r from-indigo-600 to-blue-400" : "bg-gradient-to-r from-red-600 to-red-300"}
  `}
>
  <div class="px-40 py-20 bg-white rounded-md shadow-xl">
    <div class="flex flex-col items-center">
      <h1 class={`font-bold ${vnp_ResponseCode === '00' ? "text-blue-600" : "text-red-600"} text-9xl`}>{vnp_ResponseCode === '00' ? "Success" : "Error"}</h1>


      <p class="mb-8 text-center text-gray-500 md:text-lg">
        Your deposit process had been {vnp_ResponseCode === '00' ? "done" : "cancelled"}
      </p>

      <Link
        to="/home"
        class="px-6 py-2 text-sm font-semibold text-blue-800 bg-blue-100"
        >Go home</Link>
    </div>
  </div>
</div>
    )
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer
  }
}

export default connect(mapStateToProps)(Success)