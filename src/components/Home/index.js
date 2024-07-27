import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

const Home = props => {
  const {history} = props
  if (Cookies.get('jwt_token') === undefined) {
    return <Redirect to="/ebank/login" />
  }
  return (
    <section className="bg-[#152850] h-screen px-24">
      <div className="flex items-center justify-between py-5">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          alt="website logo"
          className="h-12"
        />
        <button
          className="text-white border-white px-3 py-1 border-[1px] rounded-md"
          onClick={() => {
            Cookies.remove('jwt_token')
            history.replace('/ebank/login')
            console.log('CLikc')
          }}
        >
          Logout
        </button>
      </div>
      <div className="h-full flex items-center">
        <div>
          <h1 className="text-center text-2xl font-bold text-white">
            Your Flexibility, Our Excellence
          </h1>
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
            alt="digital card"
            className="mt-3"
          />
        </div>
      </div>
    </section>
  )
}

export default Home
