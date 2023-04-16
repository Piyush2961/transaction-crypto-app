import React, { useState, useEffect } from "react";
import Select from "react-select";
import { components } from "react-select";
import Head from "next/head";
import Image from "next/image";
import Router from "next/router";
import styles from "./../styles/Login.module.css";
import RocketLoader from "./components/Loader/RocketLoader";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authActions";
import { checkLocally } from "../redux/checkLocally";
import Loader from "./components/Loader/Loader";

const { SingleValue, Option } = components;

const IconSingleValue = (props) => {
  const myLoader = ({ src }) => {
    return `https://assets.coincap.io/assets/icons/${src}`;
  };

  return (
    <SingleValue {...props}>
      <div
        style={{
          marginRight: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Image
          loader={myLoader}
          src={props.data.image}
          alt="Image"
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          width="25"
          height="25"
        />
      </div>
      {props.data.label}
    </SingleValue>
  );
};

const IconOption = (props) => {
  const myLoader = ({ src }) => {
    return `https://assets.coincap.io/assets/icons/${src}`;
  };

  return (
    <Option {...props}>
      <div
        style={{
          marginRight: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          cursor: "pointer",
        }}
      >
        <Image
          loader={myLoader}
          src={props.data.image}
          alt="Image"
          style={{
            height: "30px",
            width: "30px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
          width="25"
          height="25"
        />
      </div>
      {props.data.label}
    </Option>
  );
};

const groupBadgeStyles = {
  backgroundColor: "#EBECF0",
  borderRadius: "2em",
  color: "#172B4D",
  display: "inline-block",
  fontSize: 12,
  fontWeight: "normal",
  lineHeight: "1",
  minWidth: 1,
  padding: "0.16666666666667em 0.5em",
  textAlign: "center",
};

const style = {
  control: (base) => ({
    ...base,
    border: 0,
    // This line disable the blue border
    boxShadow: "none",
    IndicatorSeparator: "none",
    fontWeight: "600",
    cursor: "pointer",
  }),
  option: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  }),
  singleValue: (provided) => ({
    ...provided,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    cursor: "pointer",
  }),
};

const formatGroupLabel = (data) => (
  <div className={styles.simple}>
    <span>{data.label}</span>
  </div>
);

const Login = () => {
  const [showLoader, setShowLoader] = useState(false);
  const [data, setData] = useState();
  const [exchangeData, setExchangeData] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [fromData, setFromData] = useState("BTC");
  const [toData, setToData] = useState("ETH");
  const [toDropDownData, setToDropDownData] = useState();

  const [amountFrom, setAmountFrom] = useState();
  const [amountTo, setAmountTo] = useState();
  const [isLoadingForToAmount, setIsLoadingForToAmount] = useState();

  const [oneBtcToLtc, setOneBtcToLtc] = useState();
  const [isLoadingForBtcToLtc, setIsLoadingForBtcToLtc] = useState();

  const [isRocketLoading, setIsRocketLoading] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const axios = require("axios");
  const isAuthenticated = useSelector((state) => state.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [isAuthenticated]);

  const dispatch = useDispatch();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (checkLocally(user)) {
      dispatch(loginSuccess());
    }
    if (isAuthenticated) {
      Router.push("/");
    }
  }, [dispatch, isAuthenticated]);

  const handleSubmit = () => {
    setShowLoader(true);
    // Perform login logic here
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://crypto-backend-jet.vercel.app/api/users/login",
      headers: {
        "Content-Type": "application/json",
      },
      data: JSON.stringify({
        email,
        password,
      }),
    };

    axios
      .request(config)
      .then((response) => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch(loginSuccess());
        setShowLoader(false);
      })
      .catch((error) => {
        setShowLoader(false);
        console.log(error);
        alert("Invalid Credentials");
      });
  };

  const getData = () => {
    const config = {
      method: "get",
      url: "https://api.coincap.io/v2/assets",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.data);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    const timer = setTimeout(() => {
      getData();
    }, 5000);

    return timer;
  };

  const setBtcToLtc = () => {
    setIsLoadingForBtcToLtc(true);
    const config = {
      method: "get",
      url: "https://vip-api.changenow.io/v1.2/exchange/estimate?fromCurrency=btc&fromNetwork=btc&fromAmount=1&toCurrency=ltc&toNetwork=ltc&type=direct",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.summary.estimatedAmount));
        setOneBtcToLtc(response.data.summary.estimatedAmount);
        setIsLoadingForBtcToLtc(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoadingForBtcToLtc(false);
        alert(error.message);
      });
  };

  const exchange = () => {
    setIsLoadingForToAmount(true);
    const config = {
      method: "get",
      // url: `https://vip-api.changenow.io/v1.2/exchange/estimate?fromCurrency=${fromData.toLowerCase}&fromNetwork=${fromData.toLowerCase}&fromAmount=2&toCurrency=eth&toNetwork=eth&type=direct`,
      url: `https://vip-api.changenow.io/v1.2/exchange/estimate?fromCurrency=${fromData.toLowerCase()}&fromNetwork=${fromData.toLowerCase()}&fromAmount=${amountFrom}&toCurrency=${toData.toLowerCase()}&toNetwork=${toData.toLowerCase()}&type=direct`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(JSON.stringify(response.data.summary.estimatedAmount));
        setAmountTo(response.data.summary.estimatedAmount);
        setIsLoadingForToAmount(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoadingForToAmount(false);
        alert(error.message);
      });
  };

  const getExchangeItems = () => {
    setIsLoading(true);
    setIsRocketLoading(true);

    const config = {
      method: "get",
      url: "https://api.coincap.io/v2/assets",
      headers: {},
    };

    axios(config)
      .then(function (response) {
        // console.log(response.data.data);
        setExchangeData(
          response.data.data.map((item) => {
            return {
              value: item.symbol,
              label: item.name,
              // image: `/${item.symbol}.png`,
              image: `/${item.symbol.toLowerCase()}@2x.png`,
            };
          })
        );

        setToDropDownData(
          response.data.data
            .map((item) => {
              return {
                value: item.symbol,
                label: item.name,
                // image: `/${item.symbol}.png`,
                image: `/${item.symbol.toLowerCase()}@2x.png`,
              };
            })
            .filter((ele) => ele.value != fromData)
        );

        setData(response.data.data);
        setIsLoading(false);
        setIsRocketLoading(false);
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setIsRocketLoading(false);
      });
  };

  const myLoader = ({ src, width, quality }) => {
    return `https://assets.coincap.io/assets/icons/${src}`;
  };

  useEffect(() => {
    getExchangeItems();
    getData();
    setBtcToLtc();
  }, []);

  // testing for onchange

  useEffect(() => {
    console.log(fromData);

    exchangeData &&
      setToDropDownData(
        exchangeData.filter((item) => {
          return item.value != fromData;
        })
      );
  }, [setFromData, fromData]);

  return (
    <>
      <Head>
        <title>Login Page</title>
      </Head>
      {showLoader ? <Loader /> : ""}
      <main className={styles.main}>
        <div className={styles.upper}>
          <div className={styles.left}>
            <div className={styles.brandname}>
              <h2>Crypto King</h2>
            </div>
            <div className={styles.login}>
              <div className={styles.tagline}>
                <h1>Hi, Welcome Back!</h1>
                <p>Eazy exchange like a pro!</p>
              </div>

              <div className={styles.credentials}>
                <div className={styles.email}>
                  <p>Email Address</p>
                  <div className={styles.emailWthIcon}>
                    <span>@</span>
                    <input
                      type="email"
                      placeholder="abcd@gmail.com"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.password}>
                  <p>Password</p>
                  <div className={styles.passwordWthIcon}>
                    <span>
                      <Image src="/lock.png" alt="me" width="25" height="25" />
                    </span>
                    <input
                      type="password"
                      placeholder="Password must be of length 8 or more"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                </div>

                <div className={styles.forgotPassword}>
                  <h5>Forgot Password ?</h5>
                </div>

                <button className={styles.loginButton} onClick={handleSubmit}>
                  Login
                </button>

                <div className={styles.createAccount}>
                  <h5>
                    Not registered yet?{" "}
                    <span
                      className={styles.create}
                      onClick={() => Router.push("/Signup")}
                    >
                      Create an account
                    </span>
                  </h5>
                </div>
              </div>
            </div>
            {/* Login Here */}
          </div>

          <div className={styles.right}>
            <div className={styles.upperNames}>
              <span>How it works</span>
              <span>Support</span>
            </div>

            <div className={styles.rightBoxes}>
              <div className={styles.rightBox1}>
                <div className={styles.innerRightBox1}>
                  <div className={styles.exchangesMain}>
                    <div className={styles.exchange}>
                      <p>Exchange</p>
                    </div>
                  </div>

                  <div className={styles.exchangeCurrencyMain}>
                    <div className={styles.exchangeCurrencyFirstDiv}>
                      <div className={styles.divInput}>
                        <input
                          type="number"
                          placeholder="From"
                          onChange={(e) => setAmountFrom(e.target.value)}
                        />
                      </div>

                      <div className={styles.divSelect}>
                        {isLoading ? (
                          <p style={{ fontWeight: "600" }}>Loading...</p>
                        ) : (
                          exchangeData && (
                            <div className={styles.simpleDiv}>
                              <Select
                                options={exchangeData}
                                defaultValue={exchangeData[0]}
                                formatGroupLabel={formatGroupLabel}
                                onChange={(e) => setFromData(e.value)}
                                styles={style}
                                components={{
                                  IndicatorSeparator: () => null,
                                  SingleValue: IconSingleValue,
                                  Option: IconOption,
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>

                    <div className={styles.middleDiv}>
                      <div
                        style={{
                          fontWeight: "700",
                          padding: "0",
                          lineHeight: "0",
                          margin: "0",
                        }}
                      >
                        <p>
                          1 BTC ~{" "}
                          {isLoadingForBtcToLtc ? (
                            <p
                              style={{
                                fontWeight: "600",
                                display: "inline-block",
                                backgroundColor: "blue",
                              }}
                            >
                              Loading...
                            </p>
                          ) : (
                            oneBtcToLtc
                          )}{" "}
                          LTC
                        </p>
                      </div>

                      <div style={{ marginRight: "2rem" }}>
                        <Image
                          src={`/arrows.png`}
                          alt="me"
                          width="25"
                          height="25"
                          style={{ marginLeft: "1rem" }}
                          className={styles.coinImage}
                        />
                      </div>
                    </div>

                    <div className={styles.exchangeCurrencySecondDiv}>
                      {isLoadingForToAmount ? (
                        <div
                          className={styles.divInput}
                          style={{ padding: "0px" }}
                        >
                          <p style={{ fontWeight: "600" }}>Loading...</p>
                        </div>
                      ) : (
                        <div className={styles.divInput}>
                          <input
                            type="number"
                            placeholder="To"
                            disabled
                            value={amountTo}
                          />
                        </div>
                      )}

                      <div className={styles.divSelect}>
                        {isLoading ? (
                          <p style={{ fontWeight: "600" }}>Loading...</p>
                        ) : (
                          toDropDownData && (
                            <div className={styles.simpleDiv}>
                              <Select
                                options={toDropDownData}
                                defaultValue={toDropDownData[0]}
                                formatGroupLabel={formatGroupLabel}
                                onChange={(e) => setToData(e.value)}
                                styles={style}
                                components={{
                                  IndicatorSeparator: () => null,
                                  SingleValue: IconSingleValue,
                                  Option: IconOption,
                                }}
                              />
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    className={styles.exchangeNowButton}
                    onClick={exchange}
                  >
                    Exchange Now
                  </button>
                </div>
              </div>

              <div className={styles.rightBox2}>
                {isRocketLoading ? (
                  <RocketLoader />
                ) : (
                  data &&
                  data.map((item) => {
                    return (
                      <>
                        <div
                          className={styles.coin}
                          onClick={() => Router.push(item.explorer)}
                        >
                          <div className={styles.coinNum}>{item.rank}</div>
                          <div className={styles.coinDetails}>
                            <Image
                              loader={myLoader}
                              src={`/${item.symbol.toLowerCase()}@2x.png`}
                              alt="me"
                              width="25"
                              height="25"
                              style={{ marginLeft: "1rem" }}
                              className={styles.coinImage}
                            />
                            <div className={styles.coinName}>{item.name}</div>
                            <div className={styles.coinSymbol}>
                              {item.symbol}
                            </div>
                          </div>

                          <div className={styles.coinUSD}>
                            <div className={styles.usdTag}>USD</div>
                            <div className={styles.usdvalue}>
                              {parseFloat(item.priceUsd).toFixed(4)}
                            </div>
                          </div>

                          <div
                            className={styles.coinPercentage}
                            style={{
                              color:
                                Math.sign(item.changePercent24Hr) < 0
                                  ? "red"
                                  : "#4ec085",
                            }}
                          >
                            {parseFloat(item.changePercent24Hr).toFixed(4)}%
                          </div>
                        </div>
                      </>
                    );
                  })
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Login;
