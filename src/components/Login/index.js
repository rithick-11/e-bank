import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

class Login extends Component {
  state = {userId: '', pin: '', msg: ''}

  doLoginApiCall = async e => {
    e.preventDefault()
    const {userId, pin} = this.state
    const url = 'https://apis.ccbp.in/ebank/login'
    const option = {
      method: 'POST',
      // mode: 'no-cors',
      body: JSON.stringify({user_id: parseInt(userId), pin: parseInt(pin)}),
    }
    const res = await fetch(url, option)
    const data = await res.json()
    if (res.status === 200) {
      const {history} = this.props
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 7})
      this.setState({msg: '', userId: '', pin: ''})
      history.replace('/')
    } else {
      this.setState({msg: data.error_msg})
    }
  }

  render() {
    const {userId, pin, msg} = this.state

    if (Cookies.get('jwt_token') !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <section className="h-screen flex items-center justify-center bg-[#152850]">
        <div className="w-[80vw] h-[70vh] grid grid-cols-8">
          <div className="col-span-8 sm:col-span-5 flex items-center justify-center rounded-l-2xl bg-[#e0eefe]">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
              alt="website login"
              className="w-[60%]"
            />
          </div>
          <div className="col-span-8 sm:col-span-3 flex flex-col justify-center px-6 -mt-6 sm:-ml-6 sm:mt-0 rounded-2xl bg-white">
            <h1>Welcome Back!</h1>
            <form onSubmit={this.doLoginApiCall}>
              <div>
                <label
                  htmlFor="userID"
                  className="text-md font-bold text-[#5a7184]"
                >
                  USER ID
                </label>
                <br />
                <input
                  type="text"
                  id="userID"
                  placeholder="Enter User ID"
                  className="px-3 py-1 border-[#5a7184] border-[1px] rounded-md mt-1"
                  required
                  value={userId}
                  onChange={e => {
                    this.setState({userId: e.target.value})
                  }}
                />
              </div>
              <div className="mt-2">
                <label
                  htmlFor="userPin"
                  className="text-md font-bold text-[#5a7184]"
                >
                  PIN
                </label>
                <br />
                <input
                  type="password"
                  id="userPin"
                  placeholder="Enter PIN"
                  className="px-3 py-1 border-[#5a7184] border-[1px] rounded-md mt-1"
                  required
                  value={pin}
                  onChange={e => {
                    this.setState({pin: e.target.value})
                  }}
                />
              </div>
              <button
                type="submit"
                className="bg-[#1565d8] px-3 py-1 rounded-md font-bold text-white w-full mt-4"
              >
                Login
              </button>
              <p className="mt-4 text-[#ff0b37]">{msg}</p>
            </form>
          </div>
        </div>
      </section>
    )
  }
}

export default Login
